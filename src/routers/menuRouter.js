import express from "express";
import {
  menuSearch,
  icecreamDetail,
  icecreamList,
  icecreamLike,
} from "../controllers/menuControllers";
import { authMiddleWare } from "../middleWare";

const menuRouter = express.Router();

menuRouter.post("/search", menuSearch);
menuRouter.get("/icecream/:title", icecreamDetail);
menuRouter.get("/icecream", icecreamList);
menuRouter.post("/icecream/like", authMiddleWare, icecreamLike);

export default menuRouter;
