import client from "../client";

const selection = {
  hashTags: {
    select: {
      hashtag: true,
    },
  },
  title: true,
  image: true,
  allergy: {
    select: {
      allergy: true,
    },
  },
};

export const menuSearch = async (req, res) => {
  try {
    const { keyword, hashtag, select = [], page } = req.body;
    let data;

    

    if (hashtag) {
      data = await client.icecream.findMany({
        take: 7,
        skip: page ? 7 * (page - 1) : 0,
        where: { hashTags: { some: { hashtag } } },
        select: selection,
      });
      return res.json({ ok: true, data });
    }

    const OR = [];
    if (select.length) {
      for (let item of select) {
        OR.push({ allergy: item });
      }
    }

    data = await client.icecream.findMany({
      take: 7,
      skip: page ? 7 * (page - 1) : 0,
      where: {
        title: { contains: keyword },
        ...(OR.length && { allergy: { some: { OR } } }),
      },
      select: selection,
    });

    return res.json({ ok: true, data });
  } catch (e) {
    console.log(e);
    res.json({
      ok: false,
      error: "알수없는 오류가 발생했습니다. 관리자에게 문의하세요.",
    });
  }
};

export const icecreamDetail = async (req, res) => {
  try {
    const { title } = req.params;
    const decodedTitle = decodeURIComponent(title);

    const data = await client.icecream.findUnique({
      select: selection,
      where: { title: decodedTitle },
    });
    return res.json({ ok: true, data });
  } catch (e) {
    console.log(e);
    return res.json({
      ok: false,
      error: "알수없는 오류가 발생했습니다. 관리자에게 문의하세요",
    });
  }
};

export const icecreamList = async (req, res) => {
  try {
    const { page } = req.query;
    const icecreams = await client.icecream.findMany({
      take: 20,
      skip: page ? 20 * (page - 1) : 0,
      select: selection,
    });
    res.json({
      ok: true,
      data: icecreams,
    });
  } catch (e) {
    console.log(e);
    res.json({
      ok: false,
      error: "알수없는 오류가 발생했습니다. 관리자에게 문의하세요.",
    });
  }
};

export const contentSearch = (req, res) => res.json({ ok: true });
