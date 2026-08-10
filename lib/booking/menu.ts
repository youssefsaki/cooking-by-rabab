/** Order-level dish menu — the whole group cooks ONE shared dish. */

export type DishCategory = 'tagine' | 'msemen' | 'couscous' | 'rfissa';

export interface MenuDish {
  id: string;
  category: DishCategory;
  name: string;
  shortName: string;
  subtitle: string;
  description: string;
  ingredients: string[];
  inclusions: string[];
  image: string;
  priceEur: number;
  priceMad: number;
}

const TAGINE_BOOKING_INCLUSIONS = [
  'Free Transport: Round-trip pick-up by Van from Taghazout Mosque at 1:30 PM',
  'Welcoming Ceremony: Warm Moroccan mint tea with traditional Moroccan biscuits',
  'Hands-on Clay-Oven Baking: Learn to make and bake traditional bread in our outdoor clay oven',
  'Amlou Demonstration: Learn how authentic Amlou is made using our traditional stone mill',
  'Moroccan Appetizers: Learn to prepare traditional Zaalouk (smoky eggplant dip)',
  'Your Main Feast: The delicious Tagine you selected, freshly prepared by you during the workshop',
  'Sweet Finish: Fresh seasonal fruits or a traditional Moroccan dessert',
  'Refreshments: Chilled mineral water and soft drinks served throughout the experience',
];

/**
 * Full Basic booking menu (single-select at booking time).
 * Prices are per guest; children use age multipliers against this price.
 */
export const BOOKING_MENU: MenuDish[] = [
  {
    id: 'royal-chicken-tagine',
    category: 'tagine',
    name: 'The Royal Chicken Tagine',
    shortName: 'Royal Chicken Tagine',
    subtitle: 'With sweet prunes, raisins and crunchy grilled almonds',
    description:
      'A sweet and savory masterpiece of tender, slow-cooked chicken, crowned with soft caramelized prunes and crunchy toasted almonds. Hand-crafted with seasonal ingredients freshly sourced from our local markets, this is the ultimate taste of traditional Amazigh hospitality.',
    ingredients: [
      'Chicken',
      'Caramelized Onions',
      'Authentic Moroccan Spice Mix (Mrouzia)',
      'Sweet Prunes and Black Raisins',
      'Grilled Almonds and Sesame',
      'Cinnamon, Honey and Olive Oil',
      'Fresh Coriander',
    ],
    inclusions: TAGINE_BOOKING_INCLUSIONS,
    image: '/packages/tajines/royal.webp',
    priceEur: 65,
    priceMad: 700,
  },
  {
    id: 'lemon-raisin-chicken-tagine',
    category: 'tagine',
    name: 'Traditional Lemon and Raisin Chicken Tagine',
    shortName: 'Lemon & Raisin Chicken Tagine',
    subtitle: 'With preserved lemons, red olives, golden raisins and crunchy grilled almonds',
    description:
      'Experience the beautiful art of authentic Moroccan cooking. In this hands-on class, you will learn how to slow-cook tender chicken infused with saffron, aromatic bay leaves, and traditional spices. Layered with lots of caramelized onions, sweet raisins, red olives, and crunchy grilled almonds, it’s a comforting, deeply local recipe straight from a Moroccan home kitchen.',
    ingredients: [
      'Chicken',
      'Lots of Onions',
      'Garlic',
      'Saffron',
      'Bay Leaves',
      'Moroccan Spices',
      'Red Olives',
      'Raisins',
      'Preserved Lemons (Citron Confit)',
      'Grilled Almonds',
    ],
    inclusions: TAGINE_BOOKING_INCLUSIONS,
    image: '/packages/tajines/lemon.webp',
    priceEur: 65,
    priceMad: 700,
  },
  {
    id: 'vegetable-tagine',
    category: 'tagine',
    name: 'The Farm-Fresh Moroccan Sweet and Savory Vegetable Tagine',
    shortName: 'Sweet & Savory Vegetable Tagine',
    subtitle: 'A beautiful blend of fresh garden vegetables, sweet prunes, and golden raisins',
    description:
      'Discover how you can experience and enjoy the rich world of Moroccan culinary arts fully without meat. In this hands-on class, you will learn the art of perfectly balancing sweet and savory flavors by slow-cooking farm-fresh seasonal vegetables alongside sweet prunes, dried apricots, and golden raisins. Infused with aromatic local herbs and rich spices, this unique plant-based dish delivers a deeply satisfying, royal taste of Morocco.',
    ingredients: [
      'Fresh Garden Vegetables',
      'Sweet Prunes',
      'Dried Apricots',
      'Golden Raisins',
      'Moroccan Spices & Herbs',
      'Garlic & Onions',
      'Olive Oil',
      'Traditional Regional Bread',
    ],
    inclusions: TAGINE_BOOKING_INCLUSIONS,
    image: '/packages/tajines/vegetable.webp',
    priceEur: 65,
    priceMad: 700,
  },
  {
    id: 'classic-chicken-vegetable-tagine',
    category: 'tagine',
    name: 'The Classic Moroccan Chicken and Garden Vegetable Tagine',
    shortName: 'Classic Chicken & Garden Vegetable Tagine',
    subtitle:
      'A beautiful comforting blend of tender chicken, hand-picked seasonal vegetables, and aromatic spices',
    description:
      'Master the absolute heart of Moroccan home cooking with a beautiful contrast of flavors. In this hands-on class, you will learn how to perfectly slow-cook a rich mix of different tender chicken cuts under a colorful pyramid of farm-fresh, seasonal market vegetables. To elevate this authentic dish, you will add a traditional sweet touch of golden raisins and dried apricots, letting them caramelize naturally inside the clay pot. Infused with aromatic ginger, saffron, and premium olive oil, this tagine offers the ultimate, deeply satisfying savory-and-sweet experience.',
    ingredients: [
      'Chicken',
      'Fresh Seasonal Vegetables',
      'Moroccan Spices (Mroziya)',
      'Saffron',
      'Dried Apricots',
      'Raisins',
      'Onions',
      'Garlic',
      'Fresh Herbs',
    ],
    inclusions: TAGINE_BOOKING_INCLUSIONS,
    image: '/packages/tajines/classic.webp',
    priceEur: 65,
    priceMad: 700,
  },
  {
    id: 'fish-tagine',
    category: 'tagine',
    name: 'Fish Tagine',
    shortName: 'Fish Tagine',
    subtitle:
      'A fresh coastal twist — tender fish with raisins, garden vegetables, and bold Chermoula',
    description:
      'A fresh coastal twist on the classic Moroccan tagine: tender fish slow-cooked with sweet raisins, garden vegetables, and a bold blend of Moroccan spices, all infused with the bright flavors of Chermoula.',
    ingredients: [
      'Fresh fish (local catch, depending on market availability)',
      'Chermoula marinade (garlic, cilantro, parsley, cumin, paprika, olive oil, lemon juice)',
      'Fresh tomatoes',
      'Bell peppers (green/red)',
      'Onions',
      'Raisins',
      'Preserved lemon',
      'Lemon (fresh, sliced)',
      'Olives',
      'Moroccan fish spice',
      'Potatoes (optional, traditional addition)',
    ],
    inclusions: TAGINE_BOOKING_INCLUSIONS,
    image: '/packages/tajines/fish.webp',
    priceEur: 70,
    priceMad: 750,
  },
  {
    id: 'msemen',
    category: 'msemen',
    name: 'The Traditional Msemen Wrap Experience and Moroccan Tea Culture',
    shortName: 'Msemen Wrap Experience',
    subtitle: 'Roll, Fold, and Cook Over the Wood Fire',
    description:
      'Discover Morocco’s ultimate comfort food! Msemen is a famous, traditional layered flatbread known for its crisp, golden exterior and beautifully flaky layers inside. In this hands-on class, you will learn to stretch the dough and cook it over a live wood fire. You will make both types: The Sweet Classic — served warm with premium orange honey, plus fresh Amlou that you will prepare yourself on a traditional stone mill; and The Stuffed Wrap — packed full of slow-cooked Moroccan spiced kefta, vegetables, green olives, and vermicelli noodles, then crisped over the fire.',
    ingredients: [
      'Base dough: white flour, fine semolina, salt, and water',
      'Folding: butter, semolina, and a touch of baking powder',
      'Sweet Classic: premium orange honey',
      'Fresh almonds, argan oil, and honey for Amlou',
      'Stuffed Wrap: Moroccan spiced kefta (minced meat)',
      'Slow-cooked vegetables, garlic, and rich tomato sauce',
      'Green olives and rice vermicelli noodles',
      'Authentic Moroccan spices',
    ],
    inclusions: [
      'Round-Trip Transport: Round-trip pick-up by Van from Taghazout Mosque',
      'Welcome Ritual: A traditional welcome experience featuring refreshments to start the day',
      'Moroccan Tea Masterclass: Learn the authentic art of brewing and pouring traditional Moroccan mint tea',
      'Moroccan Marinade Masterclass: Learn the secrets of blending authentic spices, herbs, and aromatics',
      'Slow Open-Fire Cooking: Cook the marinated chicken slowly over woodfire',
      'Hands-on Msemen Dough & Kneading',
      'Lamination & Folding Techniques',
      'Traditional Pan-Frying on a flat griddle',
      'Artisanal Amlou Making',
      'Fresh Drinks throughout the experience',
      'Full Culinary Feast with warm Msemen, Amlou, honey, and butter',
      'Sweet Finish with handmade traditional sweets',
    ],
    image: '/packages/msemen/msemen.webp',
    priceEur: 65,
    priceMad: 700,
  },
  {
    id: 'couscous',
    category: 'couscous',
    name: "The Holy Day Couscous Feast: Discover Morocco's Ultimate Tradition",
    shortName: 'Holy Day Couscous Feast',
    subtitle: "Morocco's ultimate Friday tradition — steamed by hand",
    description:
      'Step into our traditional workshop and create the ultimate authentic Moroccan couscous feast — rolling and steaming semolina by hand with a classic seven-vegetable broth and aromatic spices.',
    ingredients: [
      'Fine Grain Semolina',
      'Clarified Butter (Smen)',
      'Olive Oil',
      'Chicken (vegetarian option available)',
      'Onions, Tomatoes, Carrots, Zucchini',
      'Pumpkin / Red Squash, White Turnips, White Cabbage',
      'Chickpeas, Yam / Root Vegetable',
      'Fresh Cilantro & Parsley',
      'Ginger, Turmeric, Black Pepper, Saffron',
      'Ras El Hanout, Paprika, Cumin, Salt',
      'Moroccan Yogurt (Laban) to serve',
    ],
    inclusions: [
      'Round-Trip Transport: Round-trip pick-up by Van from Taghazout Mosque',
      'Welcome Ritual with refreshments',
      'Moroccan Tea Masterclass',
      'Hands-on Couscous Rolling',
      'Traditional Steaming Workshop with a kesskes',
      'The Seven-Vegetable Broth workshop',
      'Artisanal Amlou Making',
      'Fresh Drinks throughout the experience',
      'Platter Assembly & Layering',
      'Full Culinary Meal with the group',
      'Sweet Finish with handmade traditional sweets',
      'Recipe Guide (digital copy)',
    ],
    image: '/packages/couscous/couscous.webp',
    priceEur: 65,
    priceMad: 700,
  },
  {
    id: 'rfissa',
    category: 'rfissa',
    name: "Rfissa: Morocco’s Ultimate Celebration Dish and Symbol of Community",
    shortName: 'Rfissa Celebration',
    subtitle:
      'Shredded msemen pastry soaked in a rich, spiced broth and topped with tender chicken',
    description:
      'A deeply comforting, aromatic Moroccan classic of shredded msemen pastry soaked in a rich, spiced broth and topped with tender chicken.',
    ingredients: [
      'Pastry base: fine semolina, all-purpose flour, salt, warm water, oil & melted butter',
      'Whole chicken, onions, garlic, lentils',
      'Fresh cilantro & parsley',
      'Ras el Hanout, ginger, turmeric, saffron, black pepper, salt',
      'Smen (Moroccan preserved butter) and olive oil',
      'Moroccan spices (Mroziya)',
      'Hard-boiled eggs',
      'Blanched and fried almonds',
    ],
    inclusions: [
      'Round-Trip Transport: Round-trip pick-up by Van from Taghazout Mosque at 1:30 PM',
      'Welcome Ritual with refreshments',
      'Moroccan Tea Masterclass',
      'Hands-on Cooking Masterclass — paper-thin trid pastry sheets by hand',
      'The Aromatic Broth Workshop',
      'Artisanal Amlou Making',
      'Fresh Drinks throughout the experience',
      'Platter Assembly & Garnish Techniques',
      'Full Culinary Meal with the group',
      'Sweet Finish with handmade traditional sweets',
      'Recipe Guide (digital copy)',
    ],
    image: '/packages/rfissa/rfissa.webp',
    priceEur: 70,
    priceMad: 750,
  },
];

export const BOOKING_MENU_IDS = BOOKING_MENU.map((d) => d.id);

export function getDishById(id: string | undefined | null): MenuDish | undefined {
  if (!id) return undefined;
  return BOOKING_MENU.find((d) => d.id === id);
}

export function getDishesByCategory(category: DishCategory): MenuDish[] {
  return BOOKING_MENU.filter((d) => d.category === category);
}

/** Dishes available for a calendar slot’s menu category. */
export function getDishesForSlotCategory(category: DishCategory | null | undefined): MenuDish[] {
  if (!category) return [];
  return getDishesByCategory(category);
}
