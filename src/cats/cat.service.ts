import { Cat } from "./cat.model";
import express from "express";

const readAllCats = (req: express.Request, res: express.Response) => {
  try {
    const cats = Cat;
    res.json({
      success: true,
      data: {
        cats,
      },
    });
  } catch (error: unknown) {
    res.json({
      success: false,
      error: error instanceof Error ? error.message : "",
    });
  }
};

const readCat = (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const cat = Cat.find((cat) => cat.id === id);
    res.json({
      success: true,
      data: {
        cat,
      },
    });
  } catch (error: unknown) {
    res.json({
      success: false,
      error: error instanceof Error ? error.message : "",
    });
  }
};

const createCat = (req: express.Request, res: express.Response) => {
  const newCat = req.body;
  Cat.push(newCat);
  res.json(newCat);
};

const updateCat = (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const body = req.body;
  let result;
  Cat.forEach((cat) => {
    if (cat.id === id) {
      cat = body;
      result = cat;
    }
  });
  res.json({
    success: true,
    data: result,
  });
};
const updatePartialCat = (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const body = req.body;
  let result;
  Cat.forEach((cat) => {
    if (cat.id === id) {
      cat = { ...cat, ...body };
      result = cat;
    }
  });
  res.json({
    success: true,
    data: result,
  });
};

const deleteCat = (req: express.Request, res: express.Response) => {
  const { id } = req.params;
};

export { createCat, deleteCat, updateCat, updatePartialCat, readAllCats, readCat };
