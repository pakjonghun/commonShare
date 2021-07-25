require("dotenv").config();
import express from "express";
import globalRouter from "./routers/globalRouter";
import menuRouter from "./routers/menuRouter";
import aboutRouter from "./routers/aboutRouter";
import cors from "cors";
import "./api";

const app = express();

const whiteList = [
  "http://localhost:3000",
  "https://beskinrobbins.s3-website.ap-northeast-2.amazonaws.com",
  "http://beskinrobbins.s3-website.ap-northeast-2.amazonaws.com",
  "http://beskinrobbins.shop.s3-website.ap-northeast-2.amazonaws.com",
  "https://beskinrobbins.shop.s3-website.ap-northeast-2.amazonaws.com",
  "https://beskinrobbins.shop",
  "http://beskinrobbins.shop",
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log(origin, callback);
    if (whiteList.indexOf(origin) >= 0 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("당신은 접근이 허용되지 않았습니다."));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/menu", menuRouter);
app.use("/api", globalRouter);
app.use("/review", aboutRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server is running on ${port}`));
