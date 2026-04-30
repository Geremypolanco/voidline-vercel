import axios from "axios";

export default async function handler(req, res) {
  const token = global.shopifyToken;

  if (!token) {
    return res.status(400).json({
      error: "No token. Install the app first by visiting /api/auth."
    });
  }

  try {
    const response = await axios.post(
      "https://voidline-38.myshopify.com/admin/api/2024-10/products.json",
      {
        product: {
          title: "VOIDLINE Test Product",
          body_html: "Created via VOIDLINE app",
          vendor: "VOIDLINE",
          product_type: "Custom"
        }
      },
      {
        headers: {
          "X-Shopify-Access-Token": token,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({ success: true, data: response.data });
  } catch (error) {
    res.status(500).json({
      error: "Error creating product",
      details: error.response?.data || error.message
    });
  }
}
