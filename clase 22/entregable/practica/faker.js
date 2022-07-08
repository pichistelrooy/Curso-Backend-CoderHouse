const { faker } = require('@faker-js/faker');
const express = require("express");
const routerFaker = express.Router();
faker.locale = 'es';

function addFakerProduct() {
  return {
    id: faker.datatype.number({ min: 1, max: 100 }),
    title: faker.commerce.product(),
    price: faker.commerce.price(100, 200, 2, "$"),
    thumbnail: faker.image.avatar(),
  };
}

routerFaker.use(express.json());
routerFaker.use(express.urlencoded({ extended: true }));

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

module.exports = routerFaker;