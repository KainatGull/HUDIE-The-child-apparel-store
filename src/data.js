const photo = (filename) => `/${filename}`;

export const products = [
  {
    id: 'puff-sweatshirt',
    name: 'The Little Cloud Sweatshirt',
    descriptor: 'Soft brushed cotton',
    price: 2450,
    oldPrice: 2900,
    category: 'Clothing',
    age: '1–3 years',
    sizes: ['12–18M', '18–24M', '2Y', '3Y'],
    colors: [
      { name: 'Oat Milk', hex: '#e9dfcf' },
      { name: 'Powder Pink', hex: '#eecbd7' }
    ],
    badge: 'Bestseller',
    image: photo('product1.jfif'),
    image2: photo('product2.jfif'),
    description:
      'A cozy everyday layer made for tiny adventures and slow mornings.'
  },
  {
    id: 'sunny-set',
    name: 'Sunny Day Two-Piece Set',
    descriptor: 'Easy, breezy matching set',
    price: 3200,
    category: 'Sets',
    age: '1–4 years',
    sizes: ['12–18M', '18–24M', '2Y', '3Y', '4Y'],
    colors: [
      { name: 'Butter', hex: '#f5e4a8' },
      { name: 'Pistachio', hex: '#cfdfbd' }
    ],
    badge: 'New',
    image: photo('product2.jfif'),
    description:
      'A ready-to-go outfit for play dates, park days and everything between.'
  },
  {
    id: 'tiny-tee',
    name: 'Everyday Tiny Tee',
    descriptor: 'A wardrobe essential',
    price: 1250,
    category: 'Essentials',
    age: '6M–4Y',
    sizes: ['6–12M', '12–18M', '2Y', '3Y', '4Y'],
    colors: [
      { name: 'Cloud', hex: '#ffffff' },
      { name: 'Sky', hex: '#c9e2f3' },
      { name: 'Rose', hex: '#f1d4df' }
    ],
    image: photo('product3.jfif'),
    description:
      'An easy, soft tee that plays nicely with absolutely everything.'
  },
  {
    id: 'garden-dress',
    name: 'Little Garden Dress',
    descriptor: 'A twirl-worthy favourite',
    price: 2850,
    oldPrice: 3400,
    category: 'Clothing',
    age: '1–4 years',
    sizes: ['12–18M', '18–24M', '2Y', '3Y', '4Y'],
    colors: [
      { name: 'Blush', hex: '#f2d5df' },
      { name: 'Ivory', hex: '#f7f2e7' }
    ],
    badge: 'Sale',
    image: photo('product4.jpg'),
    description:
      'A playful, comfortable dress designed for little spins and big smiles.'
  },
  {
    id: 'comfy-joggers',
    name: 'Cloud Nine Joggers',
    descriptor: 'Room to wiggle',
    price: 1850,
    category: 'Essentials',
    age: '6M–4Y',
    sizes: ['6–12M', '12–18M', '2Y', '3Y', '4Y'],
    colors: [
      { name: 'Oat', hex: '#e8dfd0' },
      { name: 'Sage', hex: '#cddcc2' }
    ],
    image: photo('product5.jfif'),
    description:
      'Comfy pull-on joggers with a relaxed fit for all-day exploring.'
  },
  {
    id: 'weekend-set',
    name: 'Weekend Mini Set',
    descriptor: 'Two pieces, endless play',
    price: 3500,
    category: 'Sets',
    age: '1–4 years',
    sizes: ['12–18M', '18–24M', '2Y', '3Y', '4Y'],
    colors: [
      { name: 'Bluebell', hex: '#d7e7f3' },
      { name: 'Butter', hex: '#f5e4a8' }
    ],
    badge: 'New',
    image: photo('product1.jfif'),
    description:
      'A thoughtfully paired set that makes getting dressed a little easier.'
  }
];
