import express from "express";
import { login, join, getApi } from "../controllers/globalControllers";

const globalRouter = express.Router();

globalRouter.post("/login", login);
globalRouter.post("/join", join);

export default globalRouter;
