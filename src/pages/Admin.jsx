
import React, { useMemo, useState } from 'react';

const initialOrders = [
  { id: 'HUD-1042', name: 'Ayesha Khan', email: 'ayesha@example.com', date: 'Oct 15, 2026', payment: 'Paid', fulfillment: 'Processing', items: 2, total: 4850 },
  { id: 'HUD-1041', name: 'Sara Ahmed', email: 'sara@example.com', date: 'Oct 15, 2026', payment: 'Pending', fulfillment: 'Unfulfilled', items: 1, total: 2200 },
  { id: 'HUD-1040', name: 'Maham Ali', email: 'maham@example.com', date: 'Oct 14, 2026', payment: 'Paid', fulfillment: 'Unfulfilled', items: 3, total: 6700 },
  { id: 'HUD-1039', name: 'Noor Fatima', email: 'noor@example.com', date: 'Oct 14, 2026', payment: 'Refunded', fulfillment: 'Unfulfilled', items: 1, total: 1800 },
  { id: 'HUD-1038', name: 'Zara Malik', email: 'zara@example.com', date: 'Oct 13, 2026', payment: 'Paid', fulfillment: 'Shipped', items: 2, total: 3950 },
];

const initialProducts = [
  { id: 1, name: 'Bunny Plushie', sku: 'HUD-PL01', category: 'Toys', stock: 3, price: 1850, color: '#fce7f3', emoji: '🐰' },
  { id: 2, name: 'Cloud Blue Hoodie', sku: 'HUD-CL02', category: 'Clothing', stock: 12, price: 3200, color: '#dbeafe', emoji: '🧥' },
  { id: 3, name: 'Sunny Day Romper', sku: 'HUD-SR03', category: 'Clothing', stock: 0, price: 2450, color: '#fef3c7', emoji: '👕' },
  { id: 4, name: 'Little Daisy Dress', sku: 'HUD-DD04', category: 'Clothing', stock: 7, price: 2900, color: '#dcfce7', emoji: '👗' },
];

const initialArticles = [
  { id: 1, title: 'A Guide to Dressing Toddlers', author: 'HUDIE Team', category: 'Style Guide', status: 'Published', date: 'Oct 12, 2026' },
  { id: 2, title: 'Building a Little Capsule Wardrobe', author: 'Kainat', category: 'Parenting', status: 'Draft', date: 'Oct 10, 2026' },
  { id: 3, title: 'Comfort First: Choosing Fabrics', author: 'HUDIE Team', category: 'Materials', status: 'Published', date: 'Oct 08, 2026' },
];

const activities = [
  { icon: '＋', title: 'New order #HUD-1042', detail: 'Ayesha Khan placed an order', time: '8 min ago', color: '#d1fae5' },
  { icon: '↻', title: 'Inventory updated', detail: 'Bunny Plushie · Stock +15', time: '32 min ago', color: '#dbeafe' },
  { icon: '✎', title: 'Article published', detail: 'A Guide to Dressing Toddlers', time: '1 hour ago', color: '#fce7f3' },
  { icon: '✓', title: 'Order shipped', detail: 'Order #HUD-1038', time: '2 hours ago', color: '#fef3c7' },
];

const money = (amount) =>
  `PKR ${Number(amount).toLocaleString('en-PK')}`;

function Icon({ children }) {
  return <span className="hud-icon" aria-hidden="true">{children}</span>;
}

function Status({ children }) {
  const value = String(children).toLowerCase();
  let kind = 'neutral';

  if (['paid', 'published', 'in stock', 'shipped'].includes(value)) kind = 'success';
  if (['pending', 'draft'].includes(value)) kind = 'warning';
  if (['processing'].includes(value)) kind = 'info';
  if (['refunded', 'out of stock'].includes(value)) kind = 'danger';
  if (['unfulfilled'].includes(value)) kind = 'neutral';

  return <span className={`hud-status ${kind}`}>{children}</span>;
}

export default function Admin() {
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [orders, setOrders] = useState(initialOrders);
  const [products, setProducts] = useState(initialProducts);
  const [articles, setArticles] = useState(initialArticles);
  const [filter, setFilter] = useState('All Orders');
  const [search, setSearch] = useState('');
  const [stockSearch, setStockSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showArticleForm, setShowArticleForm] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [toast, setToast] = useState('');
  const [bannerTitle, setBannerTitle] = useState('Little outfits. Big adventures.');
  const [bannerLink, setBannerLink] = useState('/shop');
  const [articleTitle, setArticleTitle] = useState('');
  const [articleCategory, setArticleCategory] = useState('Style Guide');
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('2500');

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2600);
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        `${order.id} ${order.name} ${order.email}`.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === 'All Orders' ||
        (filter === 'Unfulfilled' && order.fulfillment === 'Unfulfilled') ||
        (filter === 'Paid' && order.payment === 'Paid') ||
        (filter === 'Refunded' && order.payment === 'Refunded') ||
        (filter === 'Pending' && order.payment === 'Pending');

      return matchesSearch && matchesFilter;
    });
  }, [orders, filter, search]);

  const filteredProducts = products.filter((product) =>
    `${product.name} ${product.sku}`.toLowerCase().includes(stockSearch.toLowerCase())
  );

  const totalRevenue = orders
    .filter((order) => order.payment === 'Paid')
    .reduce((sum, order) => sum + order.total, 0);

  const pendingOrders = orders.filter((order) => order.fulfillment === 'Unfulfilled').length;
  const lowStock = products.filter((product) => product.stock > 0 && product.stock <= 3).length;
  const outOfStock = products.filter((product) => product.stock === 0).length;

  const updateStock = (id, amount) => {
    setProducts((current) =>
      current.map((product) =>
        product.id === id
          ? { ...product, stock: Math.max(0, product.stock + amount) }
          : product
      )
    );
  };

  const updateOrderStatus = (id, field, value) => {
    setOrders((current) =>
      current.map((order) => order.id === id ? { ...order, [field]: value } : order)
    );
    setSelectedOrder((current) =>
      current?.id === id ? { ...current, [field]: value } : current
    );
    notify('Order status updated');
  };

  const addArticle = (event) => {
    event.preventDefault();
    if (!articleTitle.trim()) return;

    setArticles((current) => [
      {
        id: Date.now(),
        title: articleTitle.trim(),
        author: 'Kainat',
        category: articleCategory,
        status: 'Draft',
        date: new Date().toLocaleDateString('en-US', {
          month: 'short', day: '2-digit', year: 'numeric'
        }),
      },
      ...current,
    ]);

    setArticleTitle('');
    setShowArticleForm(false);
    setActiveNav('Content & Homepage');
    notify('Article draft created');
  };

  const addProduct = (event) => {
    event.preventDefault();
    if (!newProductName.trim()) return;

    setProducts((current) => [
      {
        id: Date.now(),
        name: newProductName.trim(),
        sku: `HUD-${Date.now().toString().slice(-5)}`,
        category: 'Clothing',
        stock: 0,
        price: Math.max(0, Number(newProductPrice) || 0),
        color: '#f1f5f9',
        emoji: '👕',
      },
      ...current,
    ]);

    setNewProductName('');
    setNewProductPrice('2500');
    setShowProductForm(false);
    setActiveNav('Products & Inventory');
    notify('Product added to the demo catalog');
  };

  const navGroups = [
    {
      label: 'WORKSPACE',
      items: [
        ['Dashboard', '▦'],
        ['Products & Inventory', '□'],
        ['Orders & Fulfillment', '▤'],
        ['Content & Homepage', '▧'],
        ['Customers & CRM', '♙'],
      ],
    },
    {
      label: 'PREFERENCES',
      items: [['Store Settings', '⚙']],
    },
  ];

  const orderFilters = ['All Orders', 'Unfulfilled', 'Paid', 'Refunded', 'Pending'];

  return (
    <div className="hud-admin">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');

        .hud-admin {
          --bg: #f8fafc;
          --card: #fff;
          --text: #1e293b;
          --muted: #64748b;
          --line: #e2e8f0;
          --accent: #0f766e;
          display: flex;
          min-height: 100vh;
          background: var(--bg);
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
        }
        .hud-admin * { box-sizing: border-box; }
        .hud-admin button, .hud-admin input, .hud-admin select, .hud-admin textarea { font: inherit; }
        .hud-admin button { cursor: pointer; }
        .hud-sidebar {
          width: 238px; flex-shrink: 0; background: #17212b; color: #dbe4ed;
          display: flex; flex-direction: column; padding: 23px 14px 16px;
          min-height: 100vh;
        }
        .hud-brand { display: flex; align-items: center; gap: 10px; padding: 0 9px 24px; }
        .hud-brand-mark {
          width: 36px; height: 36px; border-radius: 11px; background: #0f766e;
          color: white; display: grid; place-items: center; font-size: 21px; font-weight: 800;
        }
        .hud-brand-name { font: 800 21px 'Manrope', sans-serif; color: white; letter-spacing: 1px; }
        .hud-brand-sub { color: #98a7b7; font-size: 10px; margin-top: 2px; }
        .hud-workspace {
          display: flex; align-items: center; gap: 9px; width: 100%; padding: 11px;
          margin-bottom: 25px; text-align: left; color: #f1f5f9; background: #25313d;
          border: 1px solid #344250; border-radius: 9px;
        }
        .hud-workspace-icon { background: #d1fae5; color: #065f46; width: 29px; height: 29px; display: grid; place-items: center; border-radius: 8px; font-weight: 800; }
        .hud-workspace strong { display: block; font-size: 12px; }
        .hud-workspace small { color: #9aa9b8; font-size: 10px; }
        .hud-workspace .hud-chevron { margin-left: auto; color: #9aa9b8; }
        .hud-nav-group { margin-bottom: 24px; }
        .hud-nav-label { color: #7f8d9c; font-size: 9px; font-weight: 700; letter-spacing: 1.1px; padding: 0 12px 10px; }
        .hud-nav-item {
          width: 100%; display: flex; align-items: center; gap: 12px; border: 0;
          border-radius: 8px; background: transparent; color: #b8c5d2; text-align: left;
          padding: 11px 12px; margin: 2px 0; font-size: 12px; transition: .15s;
        }
        .hud-nav-item:hover { background: #25313d; color: white; }
        .hud-nav-item.active { background: #0f766e; color: white; font-weight: 600; }
        .hud-icon { display: inline-grid; place-items: center; width: 18px; font-size: 16px; line-height: 1; }
        .hud-sidebar-spacer { flex: 1; min-height: 28px; }
        .hud-admin-profile { border-top: 1px solid #344250; padding: 16px 3px 0; display: flex; align-items: center; gap: 9px; }
        .hud-avatar { width: 34px; height: 34px; border-radius: 50%; display: grid; place-items: center; background: #fbcfe8; color: #831843; font-weight: 700; }
        .hud-profile-info { flex: 1; min-width: 0; }
        .hud-profile-info strong { display: block; color: #f8fafc; font-size: 12px; }
        .hud-profile-info small { color: #91a1b1; font-size: 10px; }
        .hud-online { display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #34d399; margin-right: 5px; }
        .hud-logout { border: 0; background: transparent; color: #a7b5c3; font-size: 17px; padding: 6px; }
        .hud-main { flex: 1; min-width: 0; }
        .hud-topbar {
          min-height: 70px; display: flex; align-items: center; gap: 16px;
          padding: 14px 28px; background: white; border-bottom: 1px solid var(--line);
        }
        .hud-mobile-brand { display: none; font-weight: 800; }
        .hud-search { position: relative; flex: 1; max-width: 440px; }
        .hud-search input {
          width: 100%; border: 1px solid var(--line); border-radius: 8px; background: #f8fafc;
          padding: 11px 70px 11px 36px; outline: none; color: var(--text);
        }
        .hud-search input:focus, .hud-field:focus { border-color: #0f766e; box-shadow: 0 0 0 3px #0f766e17; }
        .hud-search-icon { position: absolute; left: 12px; top: 10px; color: #94a3b8; font-size: 16px; }
        .hud-shortcut { position: absolute; right: 9px; top: 9px; border: 1px solid var(--line); border-radius: 5px; color: #64748b; padding: 3px 5px; font-size: 10px; background: white; }
        .hud-top-actions { display: flex; align-items: center; gap: 10px; margin-left: auto; }
        .hud-btn {
          border: 1px solid var(--line); border-radius: 8px; padding: 10px 13px;
          background: white; color: #334155; font-weight: 600; white-space: nowrap;
        }
        .hud-btn:hover { background: #f8fafc; }
        .hud-btn.primary { background: var(--accent); border-color: var(--accent); color: white; }
        .hud-btn.primary:hover { background: #115e59; }
        .hud-btn.small { padding: 7px 10px; font-size: 11px; }
        .hud-bell { position: relative; border: 1px solid var(--line); border-radius: 8px; background: white; padding: 9px 12px; font-size: 17px; }
        .hud-bell span { position: absolute; top: -5px; right: -5px; background: #ef4444; color: white; border-radius: 20px; padding: 2px 5px; font-size: 9px; }
        .hud-live-link { color: var(--accent); text-decoration: none; font-weight: 600; white-space: nowrap; }
        .hud-content { max-width: 1700px; margin: 0 auto; padding: 27px 28px 38px; }
        .hud-page-heading { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; margin-bottom: 23px; }
        .hud-page-heading h1 { margin: 0 0 6px; font: 800 25px 'Manrope', sans-serif; letter-spacing: -.7px; }
        .hud-page-heading p { color: var(--muted); margin: 0; font-size: 12px; }
        .hud-date { color: #64748b; font-size: 11px; background: white; border: 1px solid var(--line); border-radius: 8px; padding: 10px 12px; white-space: nowrap; }
        .hud-kpis { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 15px; margin-bottom: 22px; }
        .hud-card { background: var(--card); border: 1px solid var(--line); border-radius: 10px; box-shadow: 0 2px 5px #0f172a05; min-width: 0; }
        .hud-kpi { padding: 18px 18px 16px; }
        .hud-kpi-top { display: flex; align-items: center; justify-content: space-between; color: var(--muted); font-size: 11px; font-weight: 600; gap: 6px; }
        .hud-kpi-icon { width: 33px; height: 33px; border-radius: 9px; display: grid; place-items: center; font-size: 17px; background: #ccfbf1; color: #0f766e; }
        .hud-kpi-value { font: 800 25px 'Manrope', sans-serif; margin: 13px 0 8px; letter-spacing: -.7px; }
        .hud-kpi-foot { color: var(--muted); font-size: 10px; }
        .hud-growth { color: #047857; background: #d1fae5; border-radius: 5px; padding: 3px 5px; font-weight: 700; margin-right: 4px; }
        .hud-alert-text { color: #c2410c; }
        .hud-section-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 17px 18px; border-bottom: 1px solid var(--line); }
        .hud-section-head h2 { margin: 0; font: 800 14px 'Manrope', sans-serif; }
        .hud-section-head p { margin: 4px 0 0; color: var(--muted); font-size: 10px; }
        .hud-orders { margin-bottom: 20px; }
        .hud-tabs { display: flex; align-items: center; gap: 5px; padding: 12px 17px 0; overflow-x: auto; }
        .hud-tab { background: transparent; border: 0; border-radius: 6px 6px 0 0; padding: 9px 11px; color: #64748b; white-space: nowrap; font-size: 11px; }
        .hud-tab.active { background: #ecfdf5; color: #0f766e; font-weight: 700; }
        .hud-table-wrap { overflow-x: auto; width: 100%; }
        .hud-table { width: 100%; border-collapse: collapse; white-space: nowrap; text-align: left; }
        .hud-table th { background: #f8fafc; color: #64748b; text-transform: uppercase; font-size: 9px; letter-spacing: .5px; font-weight: 700; padding: 12px 15px; }
        .hud-table td { padding: 13px 15px; border-top: 1px solid #edf1f5; font-size: 11px; }
        .hud-table tbody tr:hover { background: #f8fafc; }
        .hud-order-id { color: var(--accent); font-weight: 700; cursor: pointer; border: 0; padding: 0; background: transparent; }
        .hud-customer strong { display: block; font-size: 11px; margin-bottom: 4px; }
        .hud-customer small { color: var(--muted); font-size: 10px; }
        .hud-status { display: inline-flex; align-items: center; gap: 5px; border-radius: 5px; padding: 5px 7px; font-size: 10px; font-weight: 700; }
        .hud-status:before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: currentColor; }
        .hud-status.success { color: #047857; background: #d1fae5; }
        .hud-status.warning { color: #b45309; background: #fef3c7; }
        .hud-status.info { color: #1d4ed8; background: #dbeafe; }
        .hud-status.danger { color: #b91c1c; background: #fee2e2; }
        .hud-status.neutral { color: #475569; background: #e2e8f0; }
        .hud-muted { color: var(--muted); }
        .hud-table-action { border: 0; background: transparent; font-size: 17px; color: #64748b; padding: 4px 8px; }
        .hud-lower-grid { display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(280px, .85fr); gap: 20px; align-items: start; }
        .hud-inventory { margin-bottom: 20px; }
        .hud-stock-search { width: 100%; margin: 13px 15px 3px; max-width: calc(100% - 30px); }
        .hud-field { border: 1px solid var(--line); border-radius: 7px; background: white; color: var(--text); outline: none; padding: 9px 10px; width: 100%; }
        .hud-product-row { display: flex; align-items: center; gap: 11px; padding: 13px 16px; border-top: 1px solid #edf1f5; }
        .hud-product-emoji { width: 43px; height: 43px; display: grid; place-items: center; border-radius: 9px; font-size: 22px; flex-shrink: 0; }
        .hud-product-info { min-width: 0; flex: 1; }
        .hud-product-info strong { display: block; font-size: 11px; margin-bottom: 5px; }
        .hud-product-info small { color: var(--muted); font-size: 10px; }
        .hud-product-controls { display: flex; align-items: center; gap: 5px; }
        .hud-stock-btn { width: 25px; height: 27px; border: 1px solid var(--line); border-radius: 6px; background: white; color: #334155; }
        .hud-stock-btn:hover { background: #f1f5f9; }
        .hud-stock-number { width: 35px; height: 27px; border: 1px solid var(--line); border-radius: 6px; text-align: center; padding: 3px; }
        .hud-product-meta { display: flex; flex-direction: column; align-items: flex-start; gap: 6px; min-width: 100px; }
        .hud-inventory-foot { padding: 12px 16px; border-top: 1px solid var(--line); display: flex; justify-content: space-between; color: var(--muted); font-size: 10px; }
        .hud-cms { margin-bottom: 20px; }
        .hud-cms-body { padding: 16px; }
        .hud-banner-preview { background: linear-gradient(110deg, #d9f2ed, #fce7f3); border-radius: 9px; min-height: 125px; display: flex; align-items: center; padding: 18px; gap: 12px; overflow: hidden; }
        .hud-banner-copy { flex: 1; min-width: 0; }
        .hud-banner-copy small { color: #0f766e; text-transform: uppercase; letter-spacing: 1px; font-size: 8px; font-weight: 800; }
        .hud-banner-copy h3 { font: 800 18px 'Manrope', sans-serif; line-height: 1.25; margin: 7px 0 11px; color: #173b3a; }
        .hud-banner-art { font-size: 49px; flex-shrink: 0; }
        .hud-form-grid { display: grid; grid-template-columns: 1fr; gap: 10px; margin-top: 13px; }
        .hud-form-grid label, .hud-modal label { display: grid; gap: 6px; color: #475569; font-weight: 600; font-size: 10px; }
        .hud-articles { margin-top: 18px; }
        .hud-article-row { display: flex; align-items: center; gap: 10px; padding: 13px 0; border-top: 1px solid #edf1f5; }
        .hud-article-icon { width: 36px; height: 36px; border-radius: 8px; display: grid; place-items: center; background: #f1f5f9; font-size: 16px; flex-shrink: 0; }
        .hud-article-info { flex: 1; min-width: 0; }
        .hud-article-info strong { display: block; font-size: 11px; line-height: 1.5; margin-bottom: 4px; }
        .hud-article-info small { color: var(--muted); font-size: 10px; }
        .hud-article-controls { display: flex; align-items: center; gap: 7px; }
        .hud-toggle { position: relative; width: 32px; height: 18px; border: 0; border-radius: 20px; background: #cbd5e1; padding: 2px; }
        .hud-toggle:after { content: ''; display: block; width: 14px; height: 14px; border-radius: 50%; background: white; transition: transform .15s; }
        .hud-toggle.on { background: #0f766e; }
        .hud-toggle.on:after { transform: translateX(14px); }
        .hud-activity { padding-bottom: 5px; }
        .hud-activity-item { display: flex; gap: 11px; padding: 15px 16px 4px; }
        .hud-activity-icon { width: 30px; height: 30px; border-radius: 50%; display: grid; place-items: center; font-weight: 700; flex-shrink: 0; }
        .hud-activity-text strong { display: block; font-size: 11px; margin: 2px 0 5px; }
        .hud-activity-text p { color: var(--muted); font-size: 10px; margin: 0 0 5px; line-height: 1.5; }
        .hud-activity-text small { color: #94a3b8; font-size: 9px; }
        .hud-activity-line { width: 1px; height: 13px; background: var(--line); margin-left: 30px; }
        .hud-summary { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding: 15px 16px; border-top: 1px solid var(--line); margin-top: 15px; }
        .hud-summary div { background: #f8fafc; padding: 11px; border-radius: 8px; }
        .hud-summary strong { display: block; font: 800 18px 'Manrope', sans-serif; margin-bottom: 4px; }
        .hud-summary small { color: var(--muted); font-size: 10px; }
        .hud-empty { padding: 28px; color: var(--muted); text-align: center; }
        .hud-overlay { position: fixed; inset: 0; background: #0f172a66; z-index: 20; display: flex; justify-content: flex-end; }
        .hud-drawer { width: min(440px, 100%); background: white; height: 100%; overflow-y: auto; padding: 24px; box-shadow: -10px 0 30px #0f172a12; }
        .hud-drawer-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; margin-bottom: 24px; }
        .hud-drawer-head h2 { margin: 0 0 5px; font: 800 19px 'Manrope', sans-serif; }
        .hud-close { border: 1px solid var(--line); background: white; border-radius: 7px; width: 33px; height: 33px; font-size: 18px; }
        .hud-detail-box { border: 1px solid var(--line); border-radius: 9px; padding: 16px; margin-bottom: 14px; }
        .hud-detail-box h3 { font-size: 12px; margin: 0 0 12px; }
        .hud-detail-row { display: flex; justify-content: space-between; gap: 15px; padding: 7px 0; font-size: 11px; }
        .hud-detail-row span:first-child { color: var(--muted); }
        .hud-modal-wrap { position: fixed; inset: 0; background: #0f172a77; z-index: 30; display: grid; place-items: center; padding: 18px; }
        .hud-modal { background: white; width: min(440px, 100%); border-radius: 12px; padding: 23px; box-shadow: 0 20px 60px #0f172a30; }
        .hud-modal h2 { margin: 0 0 6px; font: 800 19px 'Manrope', sans-serif; }
        .hud-modal > p { margin: 0 0 20px; color: var(--muted); font-size: 11px; }
        .hud-modal form { display: grid; gap: 15px; }
        .hud-modal-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 5px; }
        .hud-toast { position: fixed; right: 24px; bottom: 24px; background: #17212b; color: white; padding: 13px 18px; border-radius: 9px; box-shadow: 0 8px 24px #0f172a22; z-index: 50; }
        .hud-mobile-menu { display: none; }
        @media (max-width: 1200px) {
          .hud-sidebar { width: 210px; }
          .hud-content { padding: 22px 20px; }
          .hud-topbar { padding: 13px 20px; }
          .hud-kpis { gap: 10px; }
          .hud-kpi { padding: 15px; }
          .hud-kpi-value { font-size: 22px; }
          .hud-lower-grid { grid-template-columns: minmax(0, 1.25fr) minmax(260px, .8fr); gap: 14px; }
          .hud-product-meta { min-width: 88px; }
        }
        @media (max-width: 920px) {
          .hud-sidebar { width: 68px; padding: 18px 8px 14px; align-items: center; }
          .hud-brand { padding: 0 0 22px; }
          .hud-brand-name, .hud-brand-sub, .hud-workspace > span:not(.hud-workspace-icon), .hud-workspace strong, .hud-workspace small, .hud-workspace .hud-chevron, .hud-nav-label, .hud-nav-item .hud-nav-text, .hud-profile-info, .hud-logout { display: none; }
          .hud-workspace { padding: 7px; justify-content: center; }
          .hud-nav-group { width: 100%; }
          .hud-nav-item { justify-content: center; padding: 12px 0; }
          .hud-nav-item .hud-icon { font-size: 18px; }
          .hud-admin-profile { justify-content: center; width: 100%; }
          .hud-kpis { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .hud-lower-grid { grid-template-columns: 1fr; }
          .hud-activity { display: grid; grid-template-columns: 1fr 1fr; }
          .hud-activity .hud-section-head { grid-column: 1 / -1; }
          .hud-activity-item { padding-bottom: 10px; }
          .hud-activity-line { display: none; }
        }
        @media (max-width: 600px) {
          .hud-sidebar { display: none; }
          .hud-topbar { min-height: 62px; padding: 12px 14px; flex-wrap: wrap; gap: 10px; }
          .hud-mobile-brand { display: block; }
          .hud-search { order: 3; flex-basis: 100%; max-width: none; }
          .hud-top-actions { gap: 6px; }
          .hud-top-actions .hud-btn:not(.primary), .hud-live-link { display: none; }
          .hud-content { padding: 19px 12px 28px; }
          .hud-page-heading { flex-direction: column; margin-bottom: 17px; }
          .hud-page-heading h1 { font-size: 23px; }
          .hud-date { display: none; }
          .hud-kpis { gap: 9px; }
          .hud-kpi { padding: 13px; }
          .hud-kpi-top { align-items: flex-start; font-size: 10px; }
          .hud-kpi-icon { width: 29px; height: 29px; font-size: 14px; }
          .hud-kpi-value { font-size: 20px; margin: 12px 0 7px; }
          .hud-kpi-foot { font-size: 9px; line-height: 1.5; }
          .hud-section-head { padding: 14px; }
          .hud-tabs { padding-left: 8px; }
          .hud-lower-grid { gap: 14px; }
          .hud-product-row { flex-wrap: wrap; padding: 12px; }
          .hud-product-meta { min-width: 100%; flex-direction: row; justify-content: space-between; align-items: center; padding-left: 54px; }
          .hud-product-controls { margin-left: auto; }
          .hud-activity { grid-template-columns: 1fr; }
          .hud-activity .hud-section-head { grid-column: auto; }
          .hud-article-row { align-items: flex-start; flex-wrap: wrap; }
          .hud-article-controls { margin-left: 46px; }
          .hud-banner-preview { padding: 14px; }
          .hud-banner-copy h3 { font-size: 16px; }
          .hud-banner-art { font-size: 38px; }
          .hud-stock-search { margin-top: 10px; }
        }
      `}</style>

      <aside className="hud-sidebar">
        <div className="hud-brand">
          <div className="hud-brand-mark">h</div>
          <div>
            <div className="hud-brand-name">HUDIE</div>
            <div className="hud-brand-sub">STORE MANAGEMENT</div>
          </div>
        </div>

        <button className="hud-workspace" onClick={() => notify('HUDIE Store workspace')}>
          <span className="hud-workspace-icon">H</span>
          <span><strong>HUDIE Store</strong><small>Online storefront</small></span>
          <span className="hud-chevron">⌄</span>
        </button>

        {navGroups.map((group) => (
          <div className="hud-nav-group" key={group.label}>
            <div className="hud-nav-label">{group.label}</div>
            {group.items.map(([label, icon]) => (
              <button
                key={label}
                className={`hud-nav-item ${activeNav === label ? 'active' : ''}`}
                onClick={() => setActiveNav(label)}
                title={label}
              >
                <Icon>{icon}</Icon><span className="hud-nav-text">{label}</span>
              </button>
            ))}
          </div>
        ))}

        <div className="hud-sidebar-spacer" />
        <div className="hud-admin-profile">
          <div className="hud-avatar">K</div>
          <div className="hud-profile-info">
            <strong>Kainat</strong>
            <small><span className="hud-online" />Administrator</small>
          </div>
          <button className="hud-logout" title="Log out" onClick={() => notify('Connect authentication to enable logout')}>↗</button>
        </div>
      </aside>

      <main className="hud-main">
        <header className="hud-topbar">
          <div className="hud-mobile-brand">HUDIE Admin</div>
          <div className="hud-search">
            <span className="hud-search-icon">⌕</span>
            <input
              aria-label="Search orders"
              placeholder="Search orders by ID, customer..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setActiveNav('Orders & Fulfillment');
              }}
              onKeyDown={(event) => {
                if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
                  event.preventDefault();
                  event.currentTarget.focus();
                }
              }}
            />
            <span className="hud-shortcut">⌘ K</span>
          </div>
          <div className="hud-top-actions">
            <button className="hud-btn" onClick={() => setShowArticleForm(true)}>＋ Write Article</button>
            <button className="hud-btn primary" onClick={() => setShowProductForm(true)}>＋ Add Product</button>
            <button className="hud-bell" aria-label="Notifications" onClick={() => notify('You have 3 notifications')}>♧<span>3</span></button>
            <a className="hud-live-link" href="/" target="_blank" rel="noreferrer">View Live Store ↗</a>
          </div>
        </header>

        <div className="hud-content">
          <div className="hud-page-heading">
            <div>
              <h1>{activeNav === 'Dashboard' ? 'Dashboard' : activeNav}</h1>
              <p>Welcome back, Kainat. Here's what's happening with your store.</p>
            </div>
            <div className="hud-date">◷ &nbsp; October 15, 2026 &nbsp;⌄</div>
          </div>

          <section className="hud-kpis">
            <div className="hud-card hud-kpi">
              <div className="hud-kpi-top"><span>Total Revenue</span><span className="hud-kpi-icon">↗</span></div>
              <div className="hud-kpi-value">{money(totalRevenue)}</div>
              <div className="hud-kpi-foot"><span className="hud-growth">↗ 12.8%</span> vs last month</div>
            </div>
            <div className="hud-card hud-kpi">
              <div className="hud-kpi-top"><span>Total Orders</span><span className="hud-kpi-icon" style={{ background: '#dbeafe', color: '#1d4ed8' }}>▤</span></div>
              <div className="hud-kpi-value">{orders.length.toLocaleString()}</div>
              <div className="hud-kpi-foot"><span className="hud-growth">{pendingOrders} unfulfilled</span> need attention</div>
            </div>
            <div className="hud-card hud-kpi">
              <div className="hud-kpi-top"><span>Low Stock Alerts</span><span className="hud-kpi-icon" style={{ background: '#ffedd5', color: '#c2410c' }}>⚠</span></div>
              <div className="hud-kpi-value">{String(lowStock + outOfStock).padStart(2, '0')}</div>
              <div className="hud-kpi-foot hud-alert-text">{lowStock} low stock · {outOfStock} out of stock</div>
            </div>
            <div className="hud-card hud-kpi">
              <div className="hud-kpi-top"><span>Store Visitors</span><span className="hud-kpi-icon" style={{ background: '#fce7f3', color: '#9d174d' }}>♙</span></div>
              <div className="hud-kpi-value">24,892</div>
              <div className="hud-kpi-foot"><span className="hud-growth">3.8%</span> conversion rate · Demo data</div>
            </div>
          </section>

          <section className="hud-card hud-orders">
            <div className="hud-section-head">
              <div><h2>Recent Orders</h2><p>Track payments and order fulfillment</p></div>
              <button className="hud-btn small" onClick={() => { setActiveNav('Orders & Fulfillment'); notify('Showing all demo orders'); }}>View all ↗</button>
            </div>
            <div className="hud-tabs">
              {orderFilters.map((tab) => (
                <button key={tab} className={`hud-tab ${filter === tab ? 'active' : ''}`} onClick={() => setFilter(tab)}>
                  {tab}
                  {tab === 'Unfulfilled' && <span> ({pendingOrders})</span>}
                </button>
              ))}
            </div>
            <div className="hud-table-wrap">
              <table className="hud-table">
                <thead>
                  <tr>
                    <th>Order</th><th>Customer</th><th>Date</th><th>Payment</th><th>Fulfillment</th><th>Items</th><th>Total</th><th />
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id}>
                      <td><button className="hud-order-id" onClick={() => setSelectedOrder(order)}>{order.id}</button></td>
                      <td className="hud-customer"><strong>{order.name}</strong><small>{order.email}</small></td>
                      <td>{order.date}</td>
                      <td><Status>{order.payment}</Status></td>
                      <td><Status>{order.fulfillment}</Status></td>
                      <td>{order.items}</td>
                      <td><strong>{money(order.total)}</strong></td>
                      <td><button className="hud-table-action" title="View order details" onClick={() => setSelectedOrder(order)}>···</button></td>
                    </tr>
                  ))}
                  {filteredOrders.length === 0 && <tr><td colSpan="8"><div className="hud-empty">No orders match this filter.</div></td></tr>}
                </tbody>
              </table>
            </div>
          </section>

          <div className="hud-lower-grid">
            <div>
              <section className="hud-card hud-inventory">
                <div className="hud-section-head">
                  <div><h2>Inventory & Stock</h2><p>Adjust product quantities and monitor stock levels</p></div>
                  <button className="hud-btn small" onClick={() => setShowProductForm(true)}>＋ Product</button>
                </div>
                <div className="hud-stock-search">
                  <input className="hud-field" placeholder="Search by product name or SKU..." value={stockSearch} onChange={(event) => setStockSearch(event.target.value)} />
                </div>
                {filteredProducts.map((product) => {
                  const stockStatus = product.stock === 0 ? 'Out of Stock' : product.stock <= 3 ? `Low Stock - ${product.stock} Left` : 'In Stock';
                  return (
                    <div className="hud-product-row" key={product.id}>
                      <div className="hud-product-emoji" style={{ background: product.color }}>{product.emoji}</div>
                      <div className="hud-product-info">
                        <strong>{product.name}</strong><small>{product.sku} · {money(product.price)}</small>
                      </div>
                      <div className="hud-product-controls">
                        <button className="hud-stock-btn" aria-label={`Decrease ${product.name} stock`} onClick={() => updateStock(product.id, -1)}>−</button>
                        <input className="hud-stock-number" aria-label={`${product.name} quantity`} type="number" min="0" value={product.stock} onChange={(event) => {
                          const value = Math.max(0, Number(event.target.value) || 0);
                          setProducts((current) => current.map((item) => item.id === product.id ? { ...item, stock: value } : item));
                        }} />
                        <button className="hud-stock-btn" aria-label={`Increase ${product.name} stock`} onClick={() => updateStock(product.id, 1)}>＋</button>
                      </div>
                      <div className="hud-product-meta">
                        <Status>{stockStatus}</Status>
                      </div>
                    </div>
                  );
                })}
                {filteredProducts.length === 0 && <div className="hud-empty">No products found.</div>}
                <div className="hud-inventory-foot">
                  <span>{products.length} products in catalog</span>
                  <span>{products.reduce((sum, item) => sum + item.stock, 0)} total units</span>
                </div>
              </section>

              <section className="hud-card hud-cms">
                <div className="hud-section-head">
                  <div><h2>Homepage & Content</h2><p>Manage your storefront banner and articles</p></div>
                  <button className="hud-btn small" onClick={() => setShowArticleForm(true)}>＋ New Article</button>
                </div>
                <div className="hud-cms-body">
                  <h3 style={{ margin: '0 0 12px', fontSize: 12 }}>Hero Banner Manager</h3>
                  <div className="hud-banner-preview">
                    <div className="hud-banner-copy">
                      <small>HUDIE · LITTLE MOMENTS</small>
                      <h3>{bannerTitle || 'Your headline goes here'}</h3>
                      <button className="hud-btn small" onClick={() => notify(`Banner CTA links to ${bannerLink}`)}>Shop collection ↗</button>
                    </div>
                    <div className="hud-banner-art" aria-hidden="true">🧸</div>
                  </div>
                  <div className="hud-form-grid">
                    <label>Banner headline
                      <input className="hud-field" value={bannerTitle} onChange={(event) => setBannerTitle(event.target.value)} />
                    </label>
                    <label>Call-to-action URL
                      <input className="hud-field" value={bannerLink} onChange={(event) => setBannerLink(event.target.value)} />
                    </label>
                    <div><button className="hud-btn primary small" onClick={() => notify('Banner preview updated. Connect a backend to publish it.')}>Save Banner</button></div>
                  </div>

                  <div className="hud-articles">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
                      <h3 style={{ margin: 0, fontSize: 12 }}>Articles & Blog Posts</h3>
                      <span className="hud-muted" style={{ fontSize: 10 }}>{articles.length} articles</span>
                    </div>
                    {articles.map((article) => (
                      <div className="hud-article-row" key={article.id}>
                        <div className="hud-article-icon">▤</div>
                        <div className="hud-article-info">
                          <strong>{article.title}</strong>
                          <small>{article.author} · {article.category} · {article.date}</small>
                        </div>
                        <div className="hud-article-controls">
                          <Status>{article.status}</Status>
                          <button
                            className={`hud-toggle ${article.status === 'Published' ? 'on' : ''}`}
                            role="switch"
                            aria-checked={article.status === 'Published'}
                            aria-label={`Toggle publication for ${article.title}`}
                            onClick={() => setArticles((current) => current.map((item) => item.id === article.id ? { ...item, status: item.status === 'Published' ? 'Draft' : 'Published' } : item))}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            <div>
              <section className="hud-card hud-activity">
                <div className="hud-section-head">
                  <div><h2>Recent Activity</h2><p>Latest store events</p></div>
                  <span style={{ color: '#0f766e', fontSize: 10, fontWeight: 700 }}>● LIVE DEMO</span>
                </div>
                {activities.map((activity, index) => (
                  <React.Fragment key={activity.title}>
                    <div className="hud-activity-item">
                      <div className="hud-activity-icon" style={{ background: activity.color, color: '#334155' }}>{activity.icon}</div>
                      <div className="hud-activity-text">
                        <strong>{activity.title}</strong>
                        <p>{activity.detail}</p>
                        <small>{activity.time}</small>
                      </div>
                    </div>
                    {index < activities.length - 1 && <div className="hud-activity-line" />}
                  </React.Fragment>
                ))}
                <div style={{ padding: '15px 16px 0' }}>
                  <button className="hud-btn small" style={{ width: '100%' }} onClick={() => notify('Connect your event log to see live activity')}>View activity log →</button>
                </div>
                <div className="hud-summary">
                  <div><strong>{products.length}</strong><small>Catalog products</small></div>
                  <div><strong>{articles.filter((item) => item.status === 'Published').length}</strong><small>Published articles</small></div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      {selectedOrder && (
        <div className="hud-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedOrder(null); }}>
          <aside className="hud-drawer">
            <div className="hud-drawer-head">
              <div><h2>Order {selectedOrder.id}</h2><p className="hud-muted" style={{ margin: 0 }}>Placed on {selectedOrder.date}</p></div>
              <button className="hud-close" onClick={() => setSelectedOrder(null)} aria-label="Close order details">×</button>
            </div>
            <div className="hud-detail-box">
              <h3>Customer details</h3>
              <div className="hud-detail-row"><span>Name</span><strong>{selectedOrder.name}</strong></div>
              <div className="hud-detail-row"><span>Email</span><strong>{selectedOrder.email}</strong></div>
            </div>
            <div className="hud-detail-box">
              <h3>Order summary</h3>
              <div className="hud-detail-row"><span>Items</span><strong>{selectedOrder.items}</strong></div>
              <div className="hud-detail-row"><span>Total</span><strong>{money(selectedOrder.total)}</strong></div>
              <div className="hud-detail-row"><span>Payment status</span><Status>{selectedOrder.payment}</Status></div>
              <div className="hud-detail-row"><span>Fulfillment</span><Status>{selectedOrder.fulfillment}</Status></div>
            </div>
            <div className="hud-detail-box">
              <h3>Update order</h3>
              <label style={{ display: 'grid', gap: 7, fontSize: 11, marginBottom: 15 }}>
                Payment status
                <select className="hud-field" value={selectedOrder.payment} onChange={(event) => updateOrderStatus(selectedOrder.id, 'payment', event.target.value)}>
                  <option>Pending</option><option>Paid</option><option>Refunded</option>
                </select>
              </label>
              <label style={{ display: 'grid', gap: 7, fontSize: 11 }}>
                Fulfillment status
                <select className="hud-field" value={selectedOrder.fulfillment} onChange={(event) => updateOrderStatus(selectedOrder.id, 'fulfillment', event.target.value)}>
                  <option>Unfulfilled</option><option>Processing</option><option>Shipped</option>
                </select>
              </label>
            </div>
            <button className="hud-btn primary" style={{ width: '100%' }} onClick={() => { setSelectedOrder(null); notify('Demo order changes saved'); }}>Done</button>
          </aside>
        </div>
      )}

      {(showArticleForm || showProductForm) && (
        <div className="hud-modal-wrap" onMouseDown={(event) => { if (event.target === event.currentTarget) { setShowArticleForm(false); setShowProductForm(false); } }}>
          <div className="hud-modal">
            <h2>{showArticleForm ? 'Create an article' : 'Add a product'}</h2>
            <p>{showArticleForm ? 'Start a new HUDIE blog post. It will be saved as a draft.' : 'Add a product to the demo catalog.'}</p>
            {showArticleForm ? (
              <form onSubmit={addArticle}>
                <label>Article title
                  <input className="hud-field" autoFocus required value={articleTitle} onChange={(event) => setArticleTitle(event.target.value)} placeholder="e.g. The toddler essentials guide" />
                </label>
                <label>Category
                  <select className="hud-field" value={articleCategory} onChange={(event) => setArticleCategory(event.target.value)}>
                    <option>Style Guide</option><option>Parenting</option><option>Materials</option><option>News</option>
                  </select>
                </label>
                <div className="hud-modal-actions">
                  <button type="button" className="hud-btn" onClick={() => setShowArticleForm(false)}>Cancel</button>
                  <button className="hud-btn primary" type="submit">Create Draft</button>
                </div>
              </form>
            ) : (
              <form onSubmit={addProduct}>
                <label>Product name
                  <input className="hud-field" autoFocus required value={newProductName} onChange={(event) => setNewProductName(event.target.value)} placeholder="e.g. Little Star T-shirt" />
                </label>
                <label>Price (PKR)
                  <input className="hud-field" type="number" min="0" required value={newProductPrice} onChange={(event) => setNewProductPrice(event.target.value)} />
                </label>
                <p style={{ margin: 0 }}>New products start with zero stock. Add stock from the inventory panel.</p>
                <div className="hud-modal-actions">
                  <button type="button" className="hud-btn" onClick={() => setShowProductForm(false)}>Cancel</button>
                  <button className="hud-btn primary" type="submit">Add Product</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {toast && <div className="hud-toast" role="status">{toast}</div>}
    </div>
  );
}
