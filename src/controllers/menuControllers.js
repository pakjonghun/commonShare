import client from "../client";

export const menuSearch = async (req, res) => {
  try {
    const { keyword, hashtag, select, page } = req.body;
    let data;

    if (hashtag) {
      data = await client.icecream.findMany({
        take: 7,
        skip: 7 * (page - 1),
        where: { hashTags: { some: { hashtag } } },
      });

      return res.json({ ok: true, data });
    }

    data = await client.icecream.findMany({
      where: {
        title: { contains: keyword },
        allergy: { some: { allergy: select } },
      },
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
    const { id } = req.params;
    console.log(id);

    const data = await client.icecream.findUnique({
      where: { id: Number(id) },
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
    const { page } = req.params;
    const icecreams = await client.icecream.findMany({
      take: 20,
      skip: 20 * (page - 1),
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
