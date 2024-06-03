import express from "express";
import bodyParser, { json } from "body-parser";

import cookieSession from "cookie-session";
import "express-async-errors";
import cors from "cors";
import rootRouter from "./routes/rootRouter";
import { errorHandler } from "./middleware/error-handlers";
import { NotFoundError } from "./errors/not-found-error";
const app = express();

const whitelist = ["http://localhost:3000", "https://complain-app.vercel.app"];

// const corsOptions = {
//   origin: function (origin: any, callback: any) {
//     if (!origin || whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// };

const corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions));
app.set("trust proxy", true);
app.use(bodyParser.json());
app.use(json());

app.use(rootRouter);

app.all("*", async (req, res, next) => {
  next(new NotFoundError());
});

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
