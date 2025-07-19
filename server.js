const express           = require('express')
const cors              = require('cors')
const productRoutes     = require('./src/routes/productRoutes')
const categoryRoutes    = require('./src/routes/categoryRoutes')
const transactionRoutes = require('./src/routes/transactionRoutes')
const resetRoutes       = require('./src/routes/resetRoutes')

const app = express();
const PORT = process.env.PORT || 3002;  // Gunakan environment variable

app.use(cors({
    origin: [
    'http://localhost:5173', // Development (Vite)
    'app://*',               // Production (Electron)
    'file://*'               // Fallback Electron
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true // Wajib jika frontend pakai credentials: 'include'
}));
app.use(express.json());

app.use('/api/', productRoutes, categoryRoutes, transactionRoutes, resetRoutes);

// Export server untuk digunakan di Electron, tapi jangan jalankan listen() otomatis
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}

module.exports = app;  // Penting untuk di-require di main.js