import "dotenv/config";
import app from "./app";

const PORT = Number(process.env.PORT ?? 3004);

app.listen(PORT, "0.0.0.0", () => {
console.log(`M4 Estadisticas API running on http://localhost:${PORT}`);
});