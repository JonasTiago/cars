import { prisma } from "../src/config/database.js"

async function main() {
  await prisma.cars.createMany({
    data: [
        {
          model: "HB20",
          licensePlate: "ABC9090",
          year: 2001,
          color: "AZUL"
        },
        {
          model: "SONATA",
          licensePlate: "EZD3035",
          year: 2010,
          color: "PRETO"
        },
        {
          model: "X1",
          licensePlate: "FBI2231",
          year: 2018,
          color: "BRANCO"
        },
        {
          model: "CIVIC",
          licensePlate: "LPA1019",
          year: 2021,
          color: "CINZA"
        }
      ]
  })
  
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  }).finally(async()=>{
    await prisma.$disconnect();
  })