export default function handler(req, res) {
  const shop = "voidline-38.myshopify.com";
  const client_id = process.env.SHOPIFY_CLIENT_ID;

  if (!client_id) {
    return res.status(500).json({ error: "SHOPIFY_CLIENT_ID missing" });
  }

  const redirect_uri = "https://<TU-DOMINIO>.vercel.app/api/auth/callback";
  const scopes = "write_products,read_products,write_themes,read_themes,write_content,read_content";

  const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${client_id}&scope=${scopes}&redirect_uri=${redirect_uri}`;

  res.redirect(installUrl);
}
