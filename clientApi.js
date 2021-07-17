import axios from "axios";
const instance = axios.create({
  baseURL: "https://bestclone.herokuapp.com/",
});

export const icecreamAll = async () => instance.get("menu/icecream");

export const icecreamSearch = async () =>
  instance.post("menu/search", {
    keyword: "꿀초코",
    hashtag: "초콜릿",
    select: ["체리", "밀가루"],
    page: 1,
  });

//글검색 아직 구현안됨.

export const icecreamDetail = async () => {
  const keyword = encodeURIComponent("꿀초코");
  console.log(keyword);
  return instance.get(`menu/icecream/${keyword}`);
};
