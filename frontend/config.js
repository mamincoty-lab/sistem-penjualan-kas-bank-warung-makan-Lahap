const isLocalApp = ['localhost', '127.0.0.1'].includes(window.location.hostname);
window.LAHAP_API_BASE = isLocalApp ? '' : 'https://sistem-penjualan-kas-bank-warung-ma.vercel.app';
