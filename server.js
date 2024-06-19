const express = require('express');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3005;
const API_URL = 'http://20.244.56.144';
const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE4NzgyNTM3LCJpYXQiOjE3MTg3ODIyMzcsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImQ5NjVmNzQ5LWI5MzItNGNkMC05MDY5LTk2MTJkOWQxNjQ1NiIsInN1YiI6IjIxMDMwMzEyNDAzMkBwYXJ1bHVuaXZlcnNpdHkuYWMuaW4ifSwiY29tcGFueU5hbWUiOiJhZmZvcmRtZWQiLCJjbGllbnRJRCI6ImQ5NjVmNzQ5LWI5MzItNGNkMC05MDY5LTk2MTJkOWQxNjQ1NiIsImNsaWVudFNlY3JldCI6IkdWZ3F1a2JPdWJlaFdyanoiLCJvd25lck5hbWUiOiJIYXJzaGFsIFBhcm1hciIsIm93bmVyRW1haWwiOiIyMTAzMDMxMjQwMzJAcGFydWx1bml2ZXJzaXR5LmFjLmluIiwicm9sbE5vIjoiMjEwMzAzMTI0MDMyIn0.8GmHT4MEOYIbW3JUWvGX11oOPRlfhlEj7nS2IFiW5No';

async function fetchProducts(company, category, top, minPrice, maxPrice) {
  try {
    const response = await axios.get(`${API_URL}/test/companies/${company}/categories/${category}/products`, {
      params: {
        top,
        minPrice,
        maxPrice
      },
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
}

app.get('/test/companies/:companyname/categories/:categoryname/products', async (req, res) => {
  const { companyname, categoryname } = req.params;
  const { top, minPrice, maxPrice } = req.query;

  try {
    const products = await fetchProducts(companyname, categoryname, top, minPrice, maxPrice);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});