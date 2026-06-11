import "dotenv/config";
import app from "./app";

const PORT = Number(process.env.PORT ?? 3003);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`M3 Comments API running on http://localhost:${PORT}`);
});