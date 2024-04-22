const express = require('express');
const router = express.Router();


let cars = [];
let deals = [];


router.get('/cars', (req, res) => {
  res.status(200).json(cars);
});


router.post('/cars', (req, res) => {
  const { make, model, year } = req.body;
  const car = { make, model, year };
  cars.push(car);
  res.status(201).json({ message: 'Car added successfully', car });
});


router.get('/deals', (req, res) => {
  res.status(200).json(deals);
});


router.post('/deals', (req, res) => {
  const { carId, dealershipId, price, date } = req.body;
  const deal = { carId, dealershipId, price, date };
  deals.push(deal);
  res.status(201).json({ message: 'Deal added successfully', deal });
});

module.exports = routes;
