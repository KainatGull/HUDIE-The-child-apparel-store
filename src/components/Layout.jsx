
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  UserRound,
} from 'lucide-react';

import { storeConfig } from '../config/storeConfig';
import { useStore } from '../context/StoreContext';

// Logo stored in the public folder
const logo = 'public/hudie-logo.jpg';

// =====================================================
// HEADER COMPONENT
// =====================================================

export function Header() {
  const { cartCount, wishlist } = useStore();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    const query = search.trim();

    if (query) {
      navigate(`/shop?q=${encodeURIComponent(query)}`);
      setOpen(false);
    }
  };

  return (
    <>
      {/* Announcement banner */}
      <div className="announcement">
        {storeConfig.announcement}
      </div>

      {/* Main site header */}
      <header className="site-header">
        <div className="header-inner wrap">

          {/* Mobile menu button */}
          <button
            type="button"
            className="icon-btn mobile-menu"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
          >
            {open ? <X /> : <Menu />}
          </button>

          {/* HUDIE image logo */}
          <Link
            className="brand"
            to="/"
            aria-label="HUDIE home"
            onClick={() => setOpen(false)}
          >
            <img
              src="/hudie-logo.jpg"
              alt="HUDIE"
              className="brand-logo"
            />
          </Link>

          {/* Main navigation */}
          <nav
            className={`main-nav ${open ? 'is-open' : ''}`}
            aria-label="Main navigation"
          >
            {storeConfig.navigation.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Product search */}
          <form className="search-box" onSubmit={handleSearch}>
            <Search size={17} />

            <input
              type="search"
              aria-label="Search products"
              placeholder="Search little things…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>

          {/* Account, wishlist, and shopping bag */}
          <div className="header-actions">

            <Link
              to="/account"
              className="icon-btn"
              aria-label="Account"
            >
              <UserRound />
            </Link>

            <Link
              to="/wishlist"
              className="icon-btn count-wrap"
              aria-label="Wishlist"
            >
              <Heart />

              {wishlist.length > 0 && (
                <span className="count">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="icon-btn count-wrap"
              aria-label="Shopping bag"
            >
              <ShoppingBag />

              {cartCount > 0 && (
                <span className="count">
                  {cartCount}
                </span>
              )}
            </Link>

          </div>
        </div>
      </header>
    </>
  );
}

// =====================================================
// FOOTER COMPONENT
// =====================================================

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">

        {/* Brand information and image logo */}
        <div>
          <Link
            className="brand footer-brand"
            to="/"
            aria-label="HUDIE home"
          >
            <img
              src="/hudie-logo.jpg"
              alt="HUDIE"
              className="brand-logo"
            />
          </Link>

          <p className="muted">
            Little clothes, big adventures.
          </p>

          <p className="muted">
            Made for the little moments that become big memories.
          </p>
        </div>

        {/* Explore links */}
        <div>
          <h4>Explore</h4>
          <Link to="/shop">Shop all</Link>
          <Link to="/shop?sort=new">New arrivals</Link>
          <Link to="/size-guide">Size guide</Link>
          <Link to="/about">About HUDIE</Link>
        </div>

        {/* Customer support */}
        <div>
          <h4>Here to help</h4>
          <Link to="/faq">FAQs</Link>
          <Link to="/shipping">Shipping &amp; delivery</Link>
          <Link to="/returns">Returns &amp; exchanges</Link>
          <Link to="/contact">Contact us</Link>
        </div>

        {/* Newsletter signup */}
        <div>
          <h4>A little love in your inbox</h4>

          <p className="muted">
            New drops, tiny surprises and thoughtful notes.
          </p>

          <form
            className="newsletter"
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thanks for joining the HUDIE list!');
            }}
          >
            <input
              type="email"
              required
              placeholder="Your email address"
              aria-label="Email address"
            />

            <button type="submit" className="btn-dark">
              Join us
            </button>
          </form>
        </div>

      </div>

      {/* Footer bottom */}
      <div className="wrap footer-bottom">
        <span>
          © {new Date().getFullYear()} HUDIE. Made for little people.
        </span>

        <span>
          Privacy · Terms · Instagram
        </span>
      </div>
    </footer>
  );
}

// =====================================================
// SHARED LAYOUT
// =====================================================

export default function Layout({ children }) {
  return (
    <>
      <Header />

      <main>
        {children}
      </main>

      <Footer />
    </>
  );
}
