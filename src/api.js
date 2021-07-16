import cheerio from "cheerio";
import axios from "axios";
import client from "./client";

export const insertIcecream = async (cate, title, image, hashTags = []) => {
  const connectOrCreate = [];
  if (hashTags.length) {
    for (let hashtag of hashTags) {
      connectOrCreate.push({
        where: { hashtag },
        create: { hashtag },
      });
    }
  }

  try {
    await client.icecream.create({
      data: {
        title,
        image,
        hashTags: {
          connectOrCreate,
        },
        Category: {
          connectOrCreate: {
            where: {
              category: cate,
            },
            create: {
              category: cate,
            },
          },
        },
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const getIcecream = async (url) => {
  const icecreams = [];

  const res = await axios.get(url);

  const $ = cheerio.load(res.data);
  const bodyList = $("#prd_list > aside > ul").children("li");

  bodyList.each(function (index, elle) {
    const baseUrl = "http://www.baskinrobbins.co.kr";

    const imgUrl =
      baseUrl + $(this).find("a > figure > span > img").attr("src");

    const title = $(this).find("a > figure > figcaption > span").text();
    const hashtags = [];

    $(this)
      .find("div.hashtag_buy > div.hashtag > ul")
      .children("li")
      .each(() => {
        const text = $(this).find("a").text();
        if (text.includes("#")) {
          const tempText = text.split("#").pop().slice(0, -1);
          hashtags.push(tempText);
        }
      });
    icecreams.push({ cate: "icecream", title, imgUrl, hashtags });
  });
  return icecreams;
};

const getEditIcecream = async (url) => {
  const editIcecream = [];
  const res = await axios.get(url);

  const $ = cheerio.load(res.data);
  const bodyList = $("#content > div > div > div > table > tbody ").children(
    "tr"
  );

  bodyList.each(function (index, elle) {
    const title = $(this).find("td:nth-child(1) > a").text();
    const algs = $(this).find("td:nth-child(9)").text();
    const alg = algs.split(",").map((item) => item.trim());

    editIcecream.push({ title, alg });
  });

  return editIcecream;
};

export const handleGetEditIcecream = async () => {
  const pages = [
    "http://www.baskinrobbins.co.kr/menu/nutrition_new.php?Page=1&ScProd=&ScNutri=&ScAmount=&top=A",
    "http://www.baskinrobbins.co.kr/menu/nutrition_new.php?Page=2&ScProd=&ScNutri=&ScAmount=&top=A",
  ];

  const editIcreamData = [];

  for (let item of pages) {
    const tempData = await getEditIcecream(item);
    editIcreamData.push(...tempData);
  }
  return editIcreamData;
};
