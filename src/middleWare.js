import jwt from "jsonwebtoken";
import client from "./client";

export const authMiddleWare = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (authorization === null || authorization === undefined) {
      return res.json({ ok: false, error: "로그인 하세요" });
    }
    const { nickname } = jwt.verify(authorization, process.env.SECRET);

    client.user
      .findUnique({
        where: { nickname },
        select: { nickname: true, email: true, id: true },
      })
      .then((response) => {
        res.locals.user = response;
        return next();
      });
  } catch (e) {
    console.log(e);
    return res.json({ ok: false, error: "로그인 하세요" });
  }
};
