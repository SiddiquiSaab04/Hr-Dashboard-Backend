import dotenv from "dotenv";
dotenv.config();
import prisma from "./prisma/client";
import express from "express";
import cors from "cors";
import router from "./routes";

const app = express();
app.use(express.json());
app.use(cors());

prisma.user.create({
  data: {
    email: "laiba@yopmail.com",
    name: "Laiba",
    password: "123asd123",
    role: "ADMIN",
    deptId: 1
  }
});


const PORT = process.env.PORT || 4000;

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
