// Needed for dotenv
require("dotenv").config();

// Needed for Express
const express = require('express');
const cors = require('cors');
const app = express();

// Needed for EJS
app.set('view engine', 'ejs');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Prisma setup
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// API: Get restaurants from database
app.get('/api/restaurants', async (req, res) => {
  try {
    const data = await prisma.restaurants.findMany(); // <-- plural
    res.json(data);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
});

// API: Add a new restaurant
app.post('/api/addRestaurant', async (req, res) => {
  const {
    Name, Location, Cuisine, Halal, Vegetarian,
    Price, Distance, Image_URL, Review, Unit, Type
  } = req.body;

  try {
    const restaurant = await prisma.restaurants.create({
      data: {
        Name,
        Location,
        Cuisine,
        Halal,
        Vegetarian,
        Price,
        Distance,
        Image_URL,
        Review,
        Unit: Unit || "NULL",
        Type: Type || "NULL"
      }
    });
    res.status(201).json(restaurant);
  } catch (error) {
    console.error("Error adding restaurant:", error);
    res.status(500).json({ error: "Failed to add restaurant" });
  }
});

// Pages
app.get('/', (req, res) => res.render('pages/home'));
app.get('/about', (req, res) => res.render('pages/about'));
app.get('/new', (req, res) => res.render('pages/new'));
app.get('/explore', async(req, res) => {
  const restaurants =  await prisma.restaurants.findMany()
  
    const locations =new Set(restaurants.map((d)=>d.Location))
  await res.render('pages/explore', {locations: locations})
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
