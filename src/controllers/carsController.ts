import httpStatus from "http-status";

import { Request, Response } from "express";
import carService from "../services/carService.js";

async function getAllCars(req: Request, res: Response) {
  try {
    const cars = await carService.getCars();
    res.send(cars);
  } catch (e) {
    console.log(e);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function getSpecificCar(req: Request, res: Response) {
  const carId = parseInt(req.params.carId);
  try {
    const car = await carService.getCar(carId);
    res.send(car);
  } catch (e) {
    if (e.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}

async function createCar(req: Request, res: Response) {
  const { model, licensePlate, year, color } = req.body;
  
  try {
    await carService.createCar(model, licensePlate, year, color)
    res.sendStatus(httpStatus.CREATED);
  } catch (e) {
    console.log(e);
    if (e.name === "ConflictError") {
      return res.sendStatus(httpStatus.CONFLICT);
    }
    
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function deleteCar(req: Request, res: Response) {
  const carId = parseInt(req.params.carId);
  
  
  try {
    const {id} = await carService.getCar(carId);

    await carService.deleteCar(id)
    res.send(httpStatus.OK);
  } catch (e) {
    console.log(e);
    if (e.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function updateCar(req: Request, res: Response) {
  const carId = parseInt(req.params.carId);
  const { model, licensePlate, year, color } = req.body;
  try {
     await carService.updateCar(model, licensePlate, year, color, carId);
     res.sendStatus(httpStatus.OK)
  } catch (e) {
    if (e.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}

const carController = {
  getAllCars,
  getSpecificCar,
  createCar,
  deleteCar,
  updateCar
}

export default carController;