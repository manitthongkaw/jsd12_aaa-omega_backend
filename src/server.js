import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import { limiter } from "./middlewares/rateLimit.js";

const app = express()

app.use(helmet());

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
  ],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(limiter);
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Welocome to AAA Omega - Backend (O_o)i')
})

const PORT = 8888;

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`)
});