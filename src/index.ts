import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import router from "./routes";
import cron from "./cron"
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;

app.use("/", router);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
