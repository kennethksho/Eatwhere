const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Sample restaurant data
const restaurants = [
  {
    name: "Sushi Zen",
    cuisine: "Japanese",
    halal: "No",
    vegetarian: "Yes",
    location: "Downtown",
    price: "$$$",
    distance: "1.2km",
    image: "https://via.placeholder.com/150",
    review: "Fresh and authentic sushi.",
    lat: 1.3001,
    lng: 103.8565,
    rating: 4
  },
  {
    name: "Nasi Lemak House",
    cuisine: "Malay",
    halal: "Yes",
    vegetarian: "No",
    location: "Kampong Glam",
    price: "$$",
    distance: "0.8km",
    image: "https://via.placeholder.com/150",
    review: "Best sambal in town!",
    lat: 1.3069,
    lng: 103.8521,
    rating: 5
  }
];

// API endpoint
app.get('/api/restaurants', (req, res) => {
  res.json(restaurants);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
