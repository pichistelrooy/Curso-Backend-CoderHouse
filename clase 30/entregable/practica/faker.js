import { faker } from '@faker-js/faker';
import { Router, json, urlencoded } from "express";
const routerFaker = Router();
faker.locale = 'es';

function addFakerProduct() {
  return {
    id: faker.datatype.number({ min: 1, max: 100 }),
    title: faker.commerce.product(),
    price: faker.commerce.price(100, 200, 2, "$"),
    thumbnail: faker.image.avatar(),
  };
}

routerFaker.use(json());
routerFaker.use(urlencoded({ extended: true }));

routerFaker.get("/", async (req, res) => {
  try {
    const array = [];

    Array.from({ length: 5 }).forEach(() => {
      array.push(addFakerProduct());
    });

    res.render("faker", { array });
  } catch (error) {
    throw error;
  }
});

export default routerFaker;