import express from "express";
import {
  reviewDetail,
  reviewList,
  reviewWrite,
  reviewEdit,
  reviewDelete,
} from "../controllers/aboutControllers";
import { authMiddleWare } from "../middleWare";

const aboutRouter = express.Router();

aboutRouter.get("/", reviewList);
aboutRouter.post("/write", authMiddleWare, reviewWrite);
aboutRouter.put("/write/:id", authMiddleWare, reviewEdit);
aboutRouter.delete("/delete/:id", authMiddleWare, reviewDelete);

aboutRouter.get("/:id", reviewDetail);
export default aboutRouter;
