import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from "./db/connectDB.js";
import path from "path";
import authRoutes from "./routes/auth.route.js";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import cors from "cors";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const __dirnamee=path.resolve();

dotenv.config({ path: path.resolve(__dirname, "../.env") });
const app = express();
const PORT = process.env.PORT || 5000;



app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirnamee, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirnamee, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
    connectDB().then(r => {
        console.log("Connected to DB");
    });
    console.log("Server is running on port: ", PORT);
});