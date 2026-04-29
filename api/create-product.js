import fetch from "node-fetch";

const SHOP = "voidline-38.myshopify.com";

export default async function handler(req, res) {
  try {
    const ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;

    const url = `https://${SHOP}/admin/api/2024-10/products.json`;

    const body = {
      product: {
        title: "Producto generado por VOIDLINE",
        body_html: "Descripción automática generada por VOIDLINE",
        vendor: "VOIDLINE",
        product_type: "Automático"
      }
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": ACCESS_TOKEN
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error Shopify:", data);
      return res.status(500).json({ error: "Error al crear producto", data });
    }

    console.log("Producto creado:", data);
    return res.status(200).json({ success: true, product: data });
  } catch (err) {
    console.error("Error general:", err);
    return res.status(500).json({ error: "Error interno" });
  }
}
