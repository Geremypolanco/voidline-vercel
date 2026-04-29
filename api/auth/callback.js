import axios from "axios";

export default async function handler(req, res) {
  const { code, shop } = req.query;

  const client_id = process.env.SHOPIFY_CLIENT_ID;
  const client_secret = process.env.SHOPIFY_CLIENT_SECRET;

  try {
    const tokenResponse = await axios.post(
      `https://${shop}/admin/oauth/access_token`,
      {
        client_id,
        client_secret,
        code
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Para pruebas: guardamos el token en memoria
    global.shopifyToken = accessToken;

    res.json({ success: true, accessToken });
  } catch (error) {
    res.status(500).json({
      error: "OAuth failed",
      details: error.response?.data || error.message
    });
  }
}
