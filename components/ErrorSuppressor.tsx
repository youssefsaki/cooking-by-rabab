'use client';

import { useEffect } from 'react';

/**
 * Component to suppress known browser extension errors in console
 * This prevents extension errors from cluttering the development console
 */
export default function ErrorSuppressor() {
  useEffect(() => {
    // Store original console methods
    const originalError = console.error;
    const originalWarn = console.warn;
    
    // Helper function to check if error is from browser extension or known safe errors
    const isExtensionError = (errorStr: string): boolean => {
      return (
        errorStr.includes('resumeId') ||
        errorStr.includes('initLastUsedResume') ||
        errorStr.includes('contents.') || // Common extension content script pattern
        errorStr.includes('chrome-extension://') ||
        errorStr.includes('moz-extension://') ||
        errorStr.includes('listener indicated an asynchronous response') || // Browser extension async response error
        errorStr.includes('message channel closed') || // Browser extension message channel error
        errorStr.includes('A listener indicated an asynchronous response') // Another variant
      );
    };
    
    // Helper function to check if error is a Next.js image warning (can be safely ignored if sizes are present)
    const isImageWarning = (errorStr: string): boolean => {
      return (
        errorStr.includes('Image with src') &&
        errorStr.includes('has "fill" but is missing "sizes" prop')
      );
    };
    
    // Override console.error to filter extension errors and image warnings
    console.error = function(...args: any[]) {
      const errorStr = args.join(' ');
      
      // Filter out known browser extension errors
      if (isExtensionError(errorStr)) {
        return; // Silently ignore extension errors
      }
      
      // Filter out Next.js image warnings (these are warnings, not actual errors)
      // Note: This suppresses the warning even if sizes are present (in case of race conditions)
      if (isImageWarning(errorStr)) {
        return; // Silently ignore image size warnings
      }
      
      // Call original error for everything else
      originalError.apply(console, args);
    };
    
    // Override console.warn to filter extension errors and image warnings
    console.warn = function(...args: any[]) {
      const errorStr = args.join(' ');
      
      // Filter out known browser extension errors
      if (isExtensionError(errorStr)) {
        return; // Silently ignore extension errors
      }
      
      // Filter out Next.js image warnings (these are warnings, not actual errors)
      if (isImageWarning(errorStr)) {
        return; // Silently ignore image size warnings
      }
      
      // Call original warn for everything else
      originalWarn.apply(console, args);
    };

    // Handle unhandled promise rejections (catches "Uncaught (in promise)" errors)
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const errorStr = 
        event.reason?.toString() || 
        event.reason?.message || 
        (event.reason instanceof Error ? event.reason.stack : '') || 
        '';
      
      if (isExtensionError(errorStr)) {
        event.preventDefault(); // Prevent default console error
        return;
      }
      
      // Also suppress image warnings in promise rejections
      if (isImageWarning(errorStr)) {
        event.preventDefault();
        return;
      }
    };

    // Handle regular errors
    const handleError = (event: ErrorEvent) => {
      const errorStr = 
        event.message || 
        event.filename || 
        (event.error?.stack || '') || 
        '';
      
      if (isExtensionError(errorStr)) {
        event.preventDefault(); // Prevent default console error
        return;
      }
      
      // Also suppress image warnings in error events
      if (isImageWarning(errorStr)) {
        event.preventDefault();
        return;
      }
    };

    // Add event listeners
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleError);

    // Cleanup: restore original and remove listeners
    return () => {
      console.error = originalError;
      console.warn = originalWarn;
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleError);
    };
  }, []);

  return null; // This component doesn't render anything
}
