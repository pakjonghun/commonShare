import client from "../../client";
import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { id, password } = req.body;

    const userExist = await client.user.findUnique({
      where: { id },
      select: { password: true, nickname: true },
    });

    if (!userExist) {
      return res.json({ ok: false, error: "아이디와 비밀번호가 틀렸습니다." });
    }

    const isPasswordOk = await bcrypt.compare(password, userExist.password);

    if (!isPasswordOk) {
      return res.json({ ok: false, error: "아이디와 비밀번호가 틀렸습니다." });
    }

    const token = await jwt.sign(
      { nickname: userExist.nickname },
      process.env.SECRET
    );

    return res.json({ ok: true, token });
  } catch (e) {
    console.log(e);
    return res.json({
      ok: false,
      error: "알수없는 오류가 발생했습니다. 관리자에게 문의하세요.",
    });
  }
};

export const join = async (req, res) => {
  try {
    const { id, nickname, email, password, confirmPassword } = req.body;

    if (password.includes(id)) {
      return res.json({
        ok: false,
        error: "비밀번호에는 아이디를 포함하지 마세요.",
      });
    }

    const schema = Joi.object({
      id: Joi.string().min(3).required(),
      nickname: Joi.string().min(3).required(),
      password: Joi.string().min(3).required(),
      email: Joi.string()
        .required()
        .pattern(new RegExp("^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.[a-zA-Z]+")),
    });

    const { value, error } = schema.validate({ id, nickname, email, password });

    if (password !== confirmPassword) {
      return res.json({ ok: false, error: "비밀번호를 다시 확인하세요" });
    }

    if (error) {
      return res.json({
        ok: false,
        error: `${error["details"][0]["path"][0]}을 다시 확인하세요`,
      });
    }

    const isUserExist = await client.user.count({
      where: {
        OR: [{ id }, { email }, { nickname }],
      },
    });

    if (isUserExist) {
      return res.json({
        ok: false,
        error: "이미 가입된 계정이 있습니다.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await client.user.create({
      data: { id, nickname, password: hashedPassword, email },
    });

    return res.json({
      ok: true,
    });
  } catch (e) {
    console.log(e);
    return {
      ok: false,
      error: "알수없는 오류가 발생했어요. 관리자에게 문의하세요",
    };
  }
};
