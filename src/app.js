require("dotenv").config();
import express from "express";
import globalRouter from "./routers/globalRouter";
import menuRouter from "./routers/menuRouter";
import aboutRouter from "./routers/aboutRouter";
import {
  getIcecream,
  getInstar,
  handleGetEditIcecream,
  insertIcecream,
} from "./api";
import client from "./client";
import cors from "cors";
import { authMiddleWare } from "./middleWare";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/menu", menuRouter);
app.use("/api", globalRouter);
app.use("/review", aboutRouter);

const port = process.env.PORT || 4000;

const getData = async () => {
  // await getInstar();
  await client.icecream.deleteMany({});
  await client.allergy.deleteMany({});

  const pages = [
    "http://www.baskinrobbins.co.kr/menu/list.php?top=A",
    "http://www.baskinrobbins.co.kr/menu/list.php?Page=2&top=A&sub=",
    "http://www.baskinrobbins.co.kr/menu/list.php?Page=3&top=A&sub=",
  ];

  for (let ice of pages) {
    const icecreams = await getIcecream(ice);
    for (let item of icecreams) {
      await insertIcecream(item.cate, item.title, item.imgUrl, item.hashtags);
    }
  }

  const editIcecream = await handleGetEditIcecream();

  for (let i of editIcecream) {
    const connectOrCreate = [];
    for (let a of i.alg) {
      connectOrCreate.push({
        where: {
          allergy: a,
        },
        create: {
          allergy: a,
        },
      });
    }

    const exist = await client.icecream.count({ where: { title: i.title } });
    if (exist) {
      await client.icecream.update({
        where: { title: i.title },
        data: {
          allergy: {
            connectOrCreate,
          },
        },
      });
    }
  }

  console.log(`Server is running on ${port}`);
};

app.listen(port, () => getData());
