import { Cat } from "./cat.model";
import express, { Router } from "express";
import { createCat, deleteCat, readAllCats, readCat, updateCat, updatePartialCat } from "./cat.service";

const router = Router();

router.get("/cats", readAllCats);

router.get("/cats/:id", readCat);

router.post("/cats", createCat);

router.put("/cats/:id", updateCat);

router.patch("/cats/:id", updatePartialCat);

router.delete("/cats/:id", deleteCat);

export default router;
