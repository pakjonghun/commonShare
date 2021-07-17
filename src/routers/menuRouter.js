import express from "express";
import {
  menuSearch,
  contentSearch,
  icecreamDetail,
  icecreamList,
} from "../controllers/menuControllers";

const menuRouter = express.Router();

menuRouter.post("/search", menuSearch);
menuRouter.get("/search", contentSearch);
menuRouter.get("/icecream/:title", icecreamDetail);
menuRouter.get("/icecream", icecreamList);

export default menuRouter;
