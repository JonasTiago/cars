import { prisma } from "../config/database.js";

async function getCars() {
  const data = await prisma.cars.findMany()
  return data;
}

async function getCar(id: number) {
  // const data = await db.query(`SELECT * FROM cars WHERE id = $1`, [id]);
  // return data.rows[0];
  const data = await prisma.cars.findUnique({
    where:{
      id,
    }
  });
  return data;
}

async function getCarWithLicensePlate(licensePlate: string) {
  // const data = await db.query(`SELECT * FROM cars WHERE "licensePlate" = $1`, [licensePlate]);
  // return data.rows[0];
  const data = await prisma.cars.findUnique({
    where:{
      licensePlate,
    }
  })
  return data;
}

async function createCar(model: string, licensePlate: string, year: number, color: string) {
  await prisma.cars.create({
    data:{
      model,
      licensePlate,
      year,
      color,
    }
  })
}

async function deleteCar(id: number) {
  await prisma.cars.delete({
    where:{
      id,
    }
  })
}
async function updateCar(model: string, licensePlate: string, year: number, color: string, id: number) {
  await prisma.cars.update({
    where:{
      id,
    },
    data:{
      model,
      licensePlate,
      year,
      color,
    }
  })
}

const carRepository = {
  getCar,
  getCarWithLicensePlate,
  getCars,
  createCar,
  deleteCar,
  updateCar
}

export default carRepository;