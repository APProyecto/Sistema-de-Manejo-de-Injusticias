import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "m4-estadisticas",
  });
});

app.use("/api", routes);

export default app;