import React from 'react';
import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Heart, Minus, Plus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { products } from '../data';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

// Helper function to format numbers into Pakistani Rupees (PKR) currency format
const money = n => new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', maximumFractionDigits: 0 }).format(n);

export default function Product() {
  // Extract product ID from URL parameters
  const { id } = useParams();
  
  // Find the specific product matching the ID
  const p = products.find(x => x.id === id);
  
  // Destructure store actions and state for cart and wishlist management
  const { addToCart, wishlist, toggleWishlist } = useStore();
  
  // Local states for selected size, selected color, and purchase quantity
  const [sz, setSz] = useState(p?.sizes[0] || '');
  const [col, setCol] = useState(p?.colors[0].name || '');
  const [qty, setQty] = useState(1);
  
  const nav = useNavigate();

  // Return a fallback view if the product cannot be found
  if (!p) return (
    <div className="wrap empty-state">
      <h2>We couldn't find that little thing.</h2>
      <Link className="btn-dark" to="/shop">Back to shop</Link>
    </div>
  );

  return (
    <div className="wrap product-page">
      {/* Breadcrumb navigation trail */}
      <div className="breadcrumbs">
        <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / {p.name}
      </div>

      {/* Main product detail section */}
      <div className="product-detail">
        
        {/* Product image display */}
        <div className="detail-image">
          <img src={p.image} alt={p.name} />
          <span className="image-note">A little comfort, a lot of love ♡</span>
        </div>

        {/* Product information, options, and actions */}
        <div className="detail-copy">
          <span className="eyebrow">{p.category.toUpperCase()} · HUDIE LITTLE FAVOURITES</span>
          <h1>{p.name}</h1>
          <p className="detail-descriptor">{p.descriptor}</p>
          
          {/* Price display with optional discount price (old price) */}
          <div className="detail-price">
            {money(p.price)} {p.oldPrice && <del>{money(p.oldPrice)}</del>}
          </div>
          
          <p className="detail-description">{p.description}</p>

          {/* Color selection options */}
          <div className="selector-block">
            <div className="selector-heading">
              <b>Colour</b><span>{col}</span>
            </div>
            <div className="color-options">
              {p.colors.map(c => (
                <button
                  key={c.name}
                  aria-label={c.name}
                  title={c.name}
                  className={col === c.name ? 'selected' : ''}
                  style={{ background: c.hex }}
                  onClick={() => setCol(c.name)}
                />
              ))}
            </div>
          </div>

          {/* Size selection options */}
          <div className="selector-block">
            <div className="selector-heading">
              <b>Size</b>
              <Link to="/size-guide">Size guide</Link>
            </div>
            <div className="size-options">
              {p.sizes.map(s => (
                <button
                  key={s}
                  className={sz === s ? 'selected' : ''}
                  onClick={() => setSz(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity selector, Add to Bag, and Wishlist buttons */}
          <div className="buy-row">
            <div className="qty-control">
              <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity">
                <Minus size={15} />
              </button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)} aria-label="Increase quantity">
                <Plus size={15} />
              </button>
            </div>

            <button className="btn-dark add-cart" onClick={() => addToCart(p, sz, col, qty)}>
              <ShoppingBag size={17} /> Add to bag
            </button>

            <button
              className={`icon-btn detail-wish ${wishlist.includes(p.id) ? 'liked' : ''}`}
              onClick={() => toggleWishlist(p.id)}
              aria-label="Toggle wishlist"
            >
              <Heart fill={wishlist.includes(p.id) ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Direct Buy Now button */}
          <button
            className="btn-outline full-width"
            onClick={() => { addToCart(p, sz, col, qty); nav('/checkout'); }}
          >
            Buy it now
          </button>

          {/* Delivery & summary note */}
          <div className="delivery-note">
            <span>♡</span>
            <div>
              <b>Made for everyday magic</b>
              <p>{p.age} · {p.sizes.length} size options · {p.colors.length} colours</p>
            </div>
          </div>

          {/* Expandable accordion tabs for details, care fit, and delivery */}
          <details className="info-accordion">
            <summary>Product details</summary>
            <p>Comfortable everyday styling. Please check the size guide and product details before ordering. Product photography is illustrative placeholder content in this demo.</p>
          </details>

          <details className="info-accordion">
            <summary>Care & fit</summary>
            <p>Follow the care label supplied with the actual garment. Measurements and fabric composition should be confirmed before launch.</p>
          </details>

          <details className="info-accordion">
            <summary>Delivery & returns</summary>
            <p>Delivery fees, timelines and return eligibility will be shown at checkout once store policies are configured.</p>
          </details>
        </div>
      </div>

      {/* Recommended products section ("You might also like") */}
      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">MORE TO LOVE</span>
            <h2>You might also <em>like</em></h2>
          </div>
          <Link to="/shop" className="text-link">Shop all</Link>
        </div>
        <div className="product-grid">
          {products.filter(x => x.id !== p.id).slice(0, 4).map(x => (
            <ProductCard key={x.id} product={x} />
          ))}
        </div>
      </section>

      {/* Back to shop footer link */}
      <Link to="/shop" className="back-link">
        <ArrowLeft size={16} /> Back to shop
      </Link>
    </div>
  );
}