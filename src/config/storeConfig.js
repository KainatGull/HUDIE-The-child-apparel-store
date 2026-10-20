
export const storeConfig = {
  brandName: 'HUDIE',
  tagline: 'Little clothes, big adventures.',
  currency: 'PKR',

  announcement: 'Worldwide Shipping Available',
  shippingNote: 'Shipping calculated at checkout',

  navigation: [
    { label: 'Shop all', to: '/shop' },
    { label: 'New arrivals', to: '/shop?sort=new' },
    { label: 'Clothing', to: '/shop?category=Clothing' },
    { label: 'Sets & outfits', to: '/shop?category=Sets' },
    { label: 'Essentials', to: '/shop?category=Essentials' },
    { label: 'Sale', to: '/shop?sale=true' }
  ],

  contactEmail: 'hello@hudie.example',
  instagram: 'https://instagram.com/'
};
