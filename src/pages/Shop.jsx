import React, { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';

import { products } from '../data';
import ProductCard from '../components/ProductCard';

export default function Shop() {
  // Read query parameters from the current URL.
  const [params] = useSearchParams();

  // Shop filters and search state.
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('featured');
  const [q, setQ] = useState('');
  const [onlySale, setOnlySale] = useState(false);

  // Keep the Shop filters in sync with navbar links and URL changes.
  useEffect(() => {
    setCategory(params.get('category') || 'All');
    setSort(params.get('sort') === 'new' ? 'new' : 'featured');
    setQ(params.get('q') || '');
    setOnlySale(params.get('sale') === 'true');
  }, [params]);

  // Filter and sort products based on the current selections.
  const filtered = useMemo(() => {
    return products
      .filter((product) => {
        // Match the selected category.
        const matchesCategory =
          category === 'All' || product.category === category;

        // Sale products have an oldPrice.
        const matchesSale =
          !onlySale || Boolean(product.oldPrice);

        // Search product names, ignoring letter case and extra spaces.
        const matchesSearch = product.name
          .toLowerCase()
          .includes(q.trim().toLowerCase());

        return matchesCategory && matchesSale && matchesSearch;
      })
      .sort((a, b) => {
        // Sort by price, lowest first.
        if (sort === 'low') {
          return a.price - b.price;
        }

        // Sort by price, highest first.
        if (sort === 'high') {
          return b.price - a.price;
        }

        // Show products labelled "New" first.
        if (sort === 'new') {
          return Number(b.badge === 'New') -
            Number(a.badge === 'New');
        }

        // Featured keeps the original product order.
        return 0;
      });
  }, [category, sort, q, onlySale]);

  // Clear the filters and search input.
  const clearFilters = () => {
    setCategory('All');
    setSort('featured');
    setQ('');
    setOnlySale(false);
  };

  return (
    <div className="wrap shop-page">

      {/* Shop introduction */}
      <div className="page-intro">
        <span className="eyebrow">THE HUDIE COLLECTION</span>

        <h1>
          Little things, <em>lovingly picked.</em>
        </h1>

        <p>Easy favourites for every tiny adventure.</p>
      </div>

      {/* Category and sale filters */}
      <div className="shop-toolbar">
        <div className="filter-chips">
          <SlidersHorizontal size={17} />

          {['All', 'Clothing', 'Sets', 'Essentials'].map((item) => (
            <button
              key={item}
              type="button"
              className={category === item ? 'active' : ''}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}

          <button
            type="button"
            className={onlySale ? 'active' : ''}
            onClick={() => setOnlySale((current) => !current)}
          >
            On sale
          </button>
        </div>

        {/* Result count and sorting menu */}
        <div className="sort-control">
          <span>{filtered.length} little finds</span>

          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            aria-label="Sort products"
          >
            <option value="featured">Featured</option>
            <option value="new">Newest</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
        </div>
      </div>

      {/* Search products by name */}
      <div className="shop-search">
        <input
          type="search"
          value={q}
          onChange={(event) => setQ(event.target.value)}
          placeholder="Find something lovely…"
          aria-label="Search products"
        />
      </div>

      {/* Display matching products */}
      {filtered.length > 0 ? (
        <div className="product-grid">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        // Empty state when no products match the filters.
        <div className="empty-state">
          <span>♡</span>

          <h2>No little finds just yet</h2>

          <p>Try another search or clear your filters.</p>

          <button
            type="button"
            className="btn-dark"
            onClick={clearFilters}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}