import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Heart,
  Leaf,
  PackageCheck,
  Smile,
} from 'lucide-react';
import { products } from '../data';
import ProductCard from '../components/ProductCard';

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="hero wrap hudie-hero">
    <img
      className="hudie-hero-bg"
      src="public/hudie-hero.jfif"
      alt="HUDIE baby clothes, plush toys and soft essentials"
    />
        <div className="hero-copy hudie-hero-copy">
          <span className="eyebrow">
            A LITTLE JOY, EVERY DAY
          </span>

          <h1>
            Little clothes.
            <br />
            <em>Big Adventures.</em>
          </h1>

          <p>
            Thoughtfully chosen pieces for tiny explorers,
            big cuddles and all the lovely in-between.
          </p>

          <Link className="btn-dark hudie-hero-btn" to="/shop">
            Shop the collection
            <ArrowRight size={17} />
          </Link>

          <div className="hero-note">
            <span>♡</span> Made for their little world
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="wrap section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              FIND THEIR FAVOURITES
            </span>
            <h2>
              A little something for <em>every day</em>
            </h2>
          </div>

          <Link className="text-link" to="/shop">
            Shop all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="category-grid">
          <Link
            to="/shop?category=Clothing"
            className="category-tile cat-pink"
          >
            <div>
              <span>01 / EVERYDAY WEAR</span>
              <h3>Little outfits</h3>
              <b>
                Explore <ArrowRight size={15} />
              </b>
            </div>
            <span className="category-illustration">✿</span>
          </Link>

          <Link
            to="/shop?category=Sets"
            className="category-tile cat-blue"
          >
            <div>
              <span>02 / MATCHING MAGIC</span>
              <h3>Sets &amp; outfits</h3>
              <b>
                Explore <ArrowRight size={15} />
              </b>
            </div>
            <span className="category-illustration">☁</span>
          </Link>

          <Link
            to="/shop?category=Essentials"
            className="category-tile cat-yellow"
          >
            <div>
              <span>03 / SOFT STAPLES</span>
              <h3>Everyday essentials</h3>
              <b>
                Explore <ArrowRight size={15} />
              </b>
            </div>
            <span className="category-illustration">♡</span>
          </Link>
        </div>
      </section>

      {/* NEW ARRIVALS SECTION */}
      <section className="section soft-section">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                FRESH FROM OUR LITTLE WORLD
              </span>
              <h2>
                New &amp; <em>noteworthy</em>
              </h2>
            </div>

            <Link className="text-link" to="/shop?sort=new">
              Meet the collection <ArrowRight size={16} />
            </Link>
          </div>

          <div className="product-grid">
            {products.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* COMFORT FEATURE SECTION */}
      <section className="wrap feature-band">
        <div className="feature-art">
          ☁
          <span>♡</span>
        </div>

        <div>
          <span className="eyebrow">
            COMFORT COMES FIRST
          </span>

          <h2>
            For all their <em>little big days.</em>
          </h2>

          <p>
            From breakfast spills to bedtime stories, our picks
            are made for movement, comfort and a whole lot of
            personality.
          </p>

          <Link className="btn-dark" to="/shop">
            Find their favourites <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* BRAND PROMISES SECTION */}
      <section className="wrap promise-grid">
        <div>
          <span className="promise-icon pink">
            <Heart />
          </span>
          <h3>Picked with love</h3>
          <p>
            Thoughtful styles for their one-of-a-kind little selves.
          </p>
        </div>

        <div>
          <span className="promise-icon blue">
            <Leaf />
          </span>
          <h3>Comfort all day</h3>
          <p>
            Easy-to-wear pieces for wiggles, cuddles and play.
          </p>
        </div>

        <div>
          <span className="promise-icon yellow">
            <PackageCheck />
          </span>
          <h3>Little details matter</h3>
          <p>
            Simple shopping, clear information, happy surprises.
          </p>
        </div>

        <div>
          <span className="promise-icon green">
            <Smile />
          </span>
          <h3>Made for memories</h3>
          <p>
            Clothes for the everyday moments you'll remember.
          </p>
        </div>
      </section>

      {/* NEWSLETTER SECTION */}
      <section className="newsletter-banner">
        <div>
          <span className="eyebrow">
            LET'S BE LITTLE TOGETHER
          </span>

          <h2>A tiny note from HUDIE?</h2>

          <p>
            Sign up for new arrivals and little bits of joy.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('You’re on the list — thank you!');
            }}
          >
            <input
              type="email"
              required
              placeholder="Your email address"
            />

            <button className="btn-dark" type="submit">
              Count me in
            </button>
          </form>
        </div>
      </section>
    </>
  );
}