import client from "../client";

export const reviewList = async (req, res) => {
  const { page = 1 } = req.query;
  //페이지 없어도 에러 안뜨게 수정
  try {
    const reviews = await client.notice.findMany({
      take: 7,
      skip: (page - 1) * 7,
      orderBy: {
        create: -1,
      },
    });

    const count = await client.notice.count({});

    const totalPage = Math.ceil(count / 7);

    return res.json({ ok: true, data: { reviews, totalPage, total: count } });
  } catch (e) {
    console.log(e);
    return res.json({
      ok: false,
      error: "알수없는 오류가 발생했습니다. 관리자에게 문의하세요.",
    });
  }
};
export const reviewDetail = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const review = await client.notice.findUnique({
      where: { id: Number(id) },
    });
    if (!review) {
      return res.json({ ok: false, error: "해당 게시글이 존재하지 않습니다." });
    }
    return res.json({ ok: true, data: review });
  } catch (e) {
    console.log(e);
    return res.json({
      ok: false,
      error: "알수없는 오류가 발생했습니다. 관리자에게 문의하세요.",
    });
  }
};

export const reviewWrite = async (req, res) => {
  const user = res.locals.user;
  const { title = "", content = "" } = req.body;
  if (!title.trim().length || !content.trim().length) {
    return res.json({ ok: false, error: "제목과 내용을 적어주세요." });
  }

  try {
    const review = await client.notice.create({
      data: { title, content, user: { connect: { id: user.id } } },
    });

    return res.json({ ok: true, data: review });
  } catch (e) {
    console.log(e);
    res.json({
      ok: false,
      error: "알수없는 오류가 발생했습니다. 관리자에게 문의하세요.",
    });
  }
};

export const reviewEdit = async (req, res) => {
  const user = res.locals.user;
  const { title = "", content = "" } = req.body;
  const { id } = req.params;

  if (!title.trim().length && !content.trim().length) {
    return res.json({ ok: false, error: "수정된 내용이 없습니다." });
  }
  try {
    const review = await client.notice.count({ where: { id: Number(id) } });

    if (!review) {
      return res.json({ ok: false, error: "해당 리뷰가 존재하지 않습니다." });
    }

    const data = await client.notice.update({
      where: { id: Number(id) },
      data: { title, content },
    });

    return res.json({ ok: true, data });
  } catch (e) {
    console.log(e);
    return res.json({
      ok: false,
      error: "알수없는 오류가 발생했습니다 관리자에게 문의하세요.",
    });
  }
};

export const reviewDelete = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await client.notice.count({ where: { id: Number(id) } });
    if (!review) {
      return res.json({ ok: false, error: "해당 게시글이 존재하지 않습니다." });
    }

    await client.notice.delete({ where: { id: Number(id) } });
    return res.json({ ok: true });
  } catch (e) {
    console.log(e);
    res.json({ ok: false, error: "알수없는 오류가 발생했습니다." });
  }
};
