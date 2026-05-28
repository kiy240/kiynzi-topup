const express = require("express");
const axios = require("axios");
const crypto = require("crypto");

const app = express();
app.use(express.json());

const USERNAME = "ISI_USERNAME";
const API_KEY = "ISI_API_KEY";

app.get("/", (req, res) => {
  res.send("API KIYNZI AKTIF");
});

app.post("/topup", async (req, res) => {
  const { userId, product } = req.body;

  const ref_id = "INV" + Date.now();
  const signature = crypto
    .createHash("md5")
    .update(USERNAME + API_KEY + ref_id)
    .digest("hex");

  try {
    const response = await axios.post("https://api.digiflazz.com/v1/transaction", {
      username: USERNAME,
      buyer_sku_code: product,
      customer_no: userId,
      ref_id: ref_id,
      sign: signature,
    });

    res.json(response.data);
  } catch (err) {
    res.json({ error: "Gagal top up" });
  }
});

app.listen(3000, () => {
  console.log("Server jalan di port 3000");
});
