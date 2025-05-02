
export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  rating: number;
  category: string;
  brand: string;
  color?: string;
  isNew?: boolean;
  isFeatured?: boolean;
  description?: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Crystal Blue Contact Lenses',
    price: 49.99,
    imageUrl: '/lovable-uploads/f35bc998-9649-48f8-b0c4-75b86c3cb69e.png',
    rating: 4.5,
    category: 'colour-lenses',
    brand: 'Lensyz Premium',
    color: 'blue',
    isFeatured: true,
    description: 'Transform your look with our Crystal Blue lenses that provide natural-looking color enhancement.'
  },
  {
    id: '2',
    name: 'Emerald Green Lenses',
    price: 59.99,
    imageUrl: '/lovable-uploads/f8dad3d4-214c-471a-bdea-3959d13b1743.png',
    rating: 5,
    category: 'colour-lenses',
    brand: 'Lensyz Premium',
    color: 'green',
    isNew: true,
    description: 'Our Emerald Green lenses offer a striking, vibrant color that\'s perfect for any occasion.'
  },
  {
    id: '3',
    name: 'Hazel Brown Lenses',
    price: 44.99,
    imageUrl: '/lovable-uploads/7fca9bc4-c1db-45ba-9247-77a15dbe8b1d.png',
    rating: 4,
    category: 'colour-lenses',
    brand: 'Lensyz Classic',
    color: 'brown',
    isFeatured: true,
    description: 'Enhance your natural eye color with our subtle Hazel Brown lenses for a warm, inviting look.'
  },
  {
    id: '4',
    name: 'Honey Amber Lenses',
    price: 54.99,
    imageUrl: '/lovable-uploads/6c27d112-8b53-4476-8975-d60811e25c46.png',
    rating: 4.5,
    category: 'colour-lenses',
    brand: 'Lensyz Premium',
    color: 'amber',
    description: 'Our Honey Amber lenses provide a warm, golden tone that blends beautifully with any eye color.'
  },
  {
    id: '5',
    name: 'Travel Solution Kit',
    price: 29.99,
    imageUrl: '/lovable-uploads/3a97c9b9-0f8c-496b-9c5a-30825a795c3a.png',
    rating: 4.5,
    category: 'travel-kits',
    brand: 'Lensyz Essentials',
    isFeatured: true,
    description: 'Our complete Travel Solution Kit has everything you need to care for your lenses on the go.'
  },
  {
    id: '6',
    name: 'Daily Clear Lenses -0.5',
    price: 34.99,
    imageUrl: '/lovable-uploads/5dc838c5-d739-47cf-844e-5919a7f55070.png',
    rating: 4,
    category: 'eyesight-lens',
    brand: 'Lensyz Vision',
    description: 'These daily clear lenses with -0.5 correction provide crisp, comfortable vision all day long.'
  },
  {
    id: '7',
    name: 'Monthly Clear Lenses -1.0',
    price: 39.99,
    imageUrl: '/lovable-uploads/fea27007-7451-4d78-9624-77796c6f6ce2.png',
    rating: 4.5,
    category: 'eyesight-lens',
    brand: 'Lensyz Vision',
    isNew: true,
    description: 'Our monthly clear lenses with -1.0 correction offer excellent value and long-lasting comfort.'
  },
  {
    id: '8',
    name: 'Ocean Blue Daily Lenses',
    price: 64.99,
    imageUrl: '/lovable-uploads/f35bc998-9649-48f8-b0c4-75b86c3cb69e.png',
    rating: 5,
    category: 'colour-lenses',
    brand: 'Lensyz Premium',
    color: 'blue',
    isNew: true,
    description: 'Experience the deep blue color of our Ocean Blue lenses, designed for comfort and stunning looks.'
  },
  {
    id: '9',
    name: 'Arctic Gray Lenses',
    price: 62.99,
    imageUrl: '/lovable-uploads/f8dad3d4-214c-471a-bdea-3959d13b1743.png',
    rating: 4.5,
    category: 'colour-lenses',
    brand: 'Lensyz Premium',
    color: 'gray',
    description: 'Our Arctic Gray lenses provide a cool, mysterious look with exceptional comfort.'
  },
  {
    id: '10',
    name: 'Deluxe Lens Care Kit',
    price: 42.99,
    imageUrl: '/lovable-uploads/3a97c9b9-0f8c-496b-9c5a-30825a795c3a.png',
    rating: 5,
    category: 'travel-kits',
    brand: 'Lensyz Essentials',
    isFeatured: true,
    description: 'Our Deluxe Lens Care Kit includes premium solution, cases, and all accessories for perfect lens maintenance.'
  },
  {
    id: '11',
    name: 'Monthly Clear Lenses -2.0',
    price: 39.99,
    imageUrl: '/lovable-uploads/fea27007-7451-4d78-9624-77796c6f6ce2.png',
    rating: 4,
    category: 'eyesight-lens',
    brand: 'Lensyz Vision',
    description: 'These monthly clear lenses with -2.0 correction provide crystal-clear vision with all-day comfort.'
  },
  {
    id: '12',
    name: 'Violet Dream Lenses',
    price: 69.99,
    imageUrl: '/lovable-uploads/7fca9bc4-c1db-45ba-9247-77a15dbe8b1d.png',
    rating: 4.5,
    category: 'colour-lenses',
    brand: 'Lensyz Premium',
    color: 'violet',
    isNew: true,
    description: 'Make a statement with our vibrant Violet Dream lenses for a truly unique and enchanting look.'
  },
  {
    id: '13',
    name: 'Daily Clear Lenses -1.5',
    price: 34.99,
    imageUrl: '/lovable-uploads/5dc838c5-d739-47cf-844e-5919a7f55070.png',
    rating: 4,
    category: 'eyesight-lens',
    brand: 'Lensyz Vision',
    description: 'These daily clear lenses with -1.5 correction are perfect for those who need reliable vision correction.'
  },
  {
    id: '14',
    name: 'Mini Travel Kit',
    price: 19.99,
    imageUrl: '/lovable-uploads/3a97c9b9-0f8c-496b-9c5a-30825a795c3a.png',
    rating: 4,
    category: 'travel-kits',
    brand: 'Lensyz Essentials',
    description: 'Our compact Mini Travel Kit is perfect for weekend trips, with everything you need in a convenient size.'
  },
  {
    id: '15',
    name: 'Honey Gold Lenses',
    price: 59.99,
    imageUrl: '/lovable-uploads/6c27d112-8b53-4476-8975-d60811e25c46.png',
    rating: 4.5,
    category: 'colour-lenses',
    brand: 'Lensyz Premium',
    color: 'gold',
    isFeatured: true,
    description: 'Our Honey Gold lenses create a warm, subtle enhancement that brightens your natural eye color.'
  }
];

export const featuredProducts = products.filter(product => product.isFeatured);
export const newProducts = products.filter(product => product.isNew);
export const colorLenses = products.filter(product => product.category === 'colour-lenses');
export const eyesightLenses = products.filter(product => product.category === 'eyesight-lens');
export const travelKits = products.filter(product => product.category === 'travel-kits');

export const filterOptions = {
  categories: [
    { id: 'colour-lenses', label: 'Color Lenses' },
    { id: 'eyesight-lens', label: 'Eyesight Lenses' },
    { id: 'travel-kits', label: 'Travel Kits' }
  ],
  brands: [
    { id: 'lensyz-premium', label: 'Lensyz Premium' },
    { id: 'lensyz-classic', label: 'Lensyz Classic' },
    { id: 'lensyz-vision', label: 'Lensyz Vision' },
    { id: 'lensyz-essentials', label: 'Lensyz Essentials' }
  ],
  colors: [
    { id: 'blue', label: 'Blue' },
    { id: 'green', label: 'Green' },
    { id: 'brown', label: 'Brown' },
    { id: 'amber', label: 'Amber' },
    { id: 'gray', label: 'Gray' },
    { id: 'violet', label: 'Violet' },
    { id: 'gold', label: 'Gold' }
  ]
};
