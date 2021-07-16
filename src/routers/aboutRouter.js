import express from "express";
import { noticeDetail, noticeList } from "../controllers/aboutControllers";

const aboutRouter = express.Router();

aboutRouter.get("/notice", noticeList);
aboutRouter.get("/notice/:id", noticeDetail);

export default aboutRouter;
