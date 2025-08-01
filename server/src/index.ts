import dotenv from "dotenv";
import cors from "cors";
import express, { Request, Response } from "express";
import settingsRoutes from "./routes/settingsRoutes";
import messagesRoutes from "./routes/messagesRoutes";
import mediaRoutes from "./routes/mediaRoutes";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./utils/auth";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

/* Middlewares */
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello, World!");
});

/* Routes */
app.use("/api/settings", settingsRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/media", mediaRoutes);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
