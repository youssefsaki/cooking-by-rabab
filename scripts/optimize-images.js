#!/usr/bin/env node
/**
 * Image Optimization Script
 * Compresses all images in the public folder using sharp
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../public');
const QUALITY = 80; // Quality setting for compression
const MAX_WIDTH = 1920; // Maximum width for images

// File extensions to process
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

// Directories to process
const DIRS_TO_PROCESS = [
  'activities',
  'community',
  'experiences',
  'gallery',
  'houseandrooms',
  'journey',
  'packages',
];

let totalOriginalSize = 0;
let totalCompressedSize = 0;
let processedCount = 0;

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  
  if (!IMAGE_EXTENSIONS.includes(ext)) {
    return;
  }

  try {
    const originalStats = fs.statSync(filePath);
    totalOriginalSize += originalStats.size;

    const image = sharp(filePath);
    const metadata = await image.metadata();

    // Skip if already small
    if (originalStats.size < 50000) {
      totalCompressedSize += originalStats.size;
      return;
    }

    // Determine output format and options
    let output;
    
    // Resize if too large
    const needsResize = metadata.width > MAX_WIDTH;
    
    if (ext === '.png') {
      output = image
        .resize(needsResize ? { width: MAX_WIDTH, withoutEnlargement: true } : null)
        .png({ quality: QUALITY, compressionLevel: 9 });
    } else if (ext === '.webp') {
      output = image
        .resize(needsResize ? { width: MAX_WIDTH, withoutEnlargement: true } : null)
        .webp({ quality: QUALITY });
    } else {
      // jpg/jpeg
      output = image
        .resize(needsResize ? { width: MAX_WIDTH, withoutEnlargement: true } : null)
        .jpeg({ quality: QUALITY, mozjpeg: true });
    }

    const buffer = await output.toBuffer();
    
    // Only save if smaller
    if (buffer.length < originalStats.size) {
      fs.writeFileSync(filePath, buffer);
      totalCompressedSize += buffer.length;
      const savings = ((originalStats.size - buffer.length) / originalStats.size * 100).toFixed(1);
      console.log(`✅ ${path.basename(filePath)}: ${formatBytes(originalStats.size)} → ${formatBytes(buffer.length)} (${savings}% saved)`);
      processedCount++;
    } else {
      totalCompressedSize += originalStats.size;
      console.log(`⏭️  ${path.basename(filePath)}: Already optimized`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    const stats = fs.statSync(filePath);
    totalCompressedSize += stats.size;
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function processDirectory(dir) {
  const fullPath = path.join(PUBLIC_DIR, dir);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  Directory not found: ${dir}`);
    return;
  }

  console.log(`\n📁 Processing ${dir}/...`);
  
  const files = fs.readdirSync(fullPath);
  
  for (const file of files) {
    const filePath = path.join(fullPath, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isFile()) {
      await optimizeImage(filePath);
    }
  }
}

async function processRootImages() {
  console.log(`\n📁 Processing root images...`);
  
  const files = fs.readdirSync(PUBLIC_DIR);
  
  for (const file of files) {
    const filePath = path.join(PUBLIC_DIR, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isFile() && IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase())) {
      await optimizeImage(filePath);
    }
  }
}

async function main() {
  console.log('🖼️  Image Optimization Script\n');
  console.log('Settings:');
  console.log(`  Quality: ${QUALITY}%`);
  console.log(`  Max Width: ${MAX_WIDTH}px`);
  
  // Process root images
  await processRootImages();
  
  // Process each directory
  for (const dir of DIRS_TO_PROCESS) {
    await processDirectory(dir);
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 Summary:');
  console.log(`  Files processed: ${processedCount}`);
  console.log(`  Original size: ${formatBytes(totalOriginalSize)}`);
  console.log(`  Compressed size: ${formatBytes(totalCompressedSize)}`);
  console.log(`  Total savings: ${formatBytes(totalOriginalSize - totalCompressedSize)} (${((totalOriginalSize - totalCompressedSize) / totalOriginalSize * 100).toFixed(1)}%)`);
  console.log('='.repeat(50));
}

main().catch(console.error);
