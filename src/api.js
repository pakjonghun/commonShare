import axios from "axios";
import client from "./client";
import cheerio from "cheerio";
import { htmls } from "./html/marketsHtmls";
import { instarHtmls } from "./html/instarHtmls";
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
          // const temp = text.replace("-" && "*" && /\n|\t/g, "").split("#");

          const temp = text
            .replace("구매", "")
            .replace("-", "")
            .replace(/\n|\t/g, "")
            .split("#");
          const temp2 = temp.filter(
            (item, index) => index !== 0 && index !== 2
          );

          temp2.forEach((item) => {
            hashtags.push(item);
          });
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

export const getInstar = async () => {
  const res = await axios.get("http://www.baskinrobbins.co.kr/event/list.php");

  const $ = cheerio.load(res.data);
  const body = $("#content > div > div > div.event_list > ul ").children("li");

  const datas = [];
  body.each((i, v) => {
    const url = "http://www.baskinrobbins.co.kr";
    const content = $(v).find("a > span").text();
    const time = $(v).find("a > span.period").text();
    const image = $(v).find("a > figure > img").attr("src");
    const imgUrl = url + image;
    datas.push({ content, time, imgUrl });
  });
  return datas;
};

export const getMarkets = async () => {
  const $ = cheerio.load(htmls);
  const body = $("li");

  const db = [];
  body.each((i, v) => {
    const geoLocation = $(v).find("article > a").attr("data-info");
    const data = JSON.parse(geoLocation);
    db.push({
      operationtime: data.operationtime,
      pointX: data.pointX,
      pointY: data.pointY,
      address1: data.address1,
      address2: data.address2,
      address3: data.address3,
      address: data.address,
      name: data.name,
      tel: data.tel,
    });
  });
  return db;
};

export const getInstarPic = async () => {
  const $ = cheerio.load(instarHtmls);
  const body = $("#contents > div");

  const db = [];

  body.each((i, v) => {
    const img = $(v).find("div > div > div > img").attr("src");
    db.push(img);
  });
  return db;
};

const encodeKey =
  "R1YkIepzkxhj6Ouue%2Fo0BcyXRM89NzjOU2baG8hXDjqv7MyVSxspxUBLzUZOJPISnGgxDg8SaIutpCmhB7OE%2Fg%3D%3D";
const decodeKey =
  "R1YkIepzkxhj6Ouue/o0BcyXRM89NzjOU2baG8hXDjqv7MyVSxspxUBLzUZOJPISnGgxDg8SaIutpCmhB7OE/g==";
//인코딩 키를 디코딩 해서 넣으면 작동한다.
const serviceKey = decodeURIComponent(encodeKey);

const api = axios.create({
  baseURL: "http://api.visitkorea.or.kr/openapi/service/rest/KorService/",
  params: {
    pageNo: 1,
    serviceKey,
    MobileOS: "ETC",
    MobileApp: "testApp",
  },
});

// 지역코드 코드 넣기 완료
// const getDataFun = async () => {
//   const result1 = await api.get("areaCode");
//   const items = result1.data.response.body.items.item;
//   for (let i of items) {
//     const { code, name, rnum } = i;
//     await client.areaCode.create({ data: { code, name, rnum } });
//   }
// };

// getDataFun();

// 서비스 분류코드
const getDataFun = async () => {
  const db = await api.get("detailCommon", {
    params: {
      contentId: 2685273,
      MobileApp: "test",
      MobileOS: "ETC",
    },
  });

  // await client.allLists.update({where:{
  //   contentid:i.contentid,
  //   data:{
  //     overView
  //   }
  // }})
  console.log(db.data.response);
};

getDataFun();
// for (let i of areaCode) {
//   const result1 = await api.get("detailCommon", {
//     params: {
//       areaCode: i.code,
//     },
//   });
//   const items = result1.data.response.body.items.item;

// }
