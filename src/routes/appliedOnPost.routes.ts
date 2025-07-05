import { Router } from "express";
import { applyOnpost } from "../controller/applyOnpost.controller";

const server = Router();

server.post("/apply", applyOnpost);
export default server;
