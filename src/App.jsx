import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Admin from './pages/Admin';
import Layout from './components/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Info, { Account, Wishlist, NotFound } from './pages/Info';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/account" element={<Account />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/about" element={<Info slug="about" />} />
        <Route path="/contact" element={<Info slug="contact" />} />
        <Route path="/faq" element={<Info slug="faq" />} />
        <Route path="/shipping" element={<Info slug="shipping" />} />
        <Route path="/returns" element={<Info slug="returns" />} />
        <Route path="/size-guide" element={<Info slug="size-guide" />} />
        <Route path="/privacy" element={<Info slug="privacy" />} />
        <Route path="/terms" element={<Info slug="terms" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
