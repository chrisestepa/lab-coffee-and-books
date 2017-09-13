const express = require('express');
const router  = express.Router();
const Place = require('../models/Place');

// RETRIEVE: Places list
router.get('/', (req, res, next) => {
  Place.find()
  .then(places => res.render('places/places_list', {places: places}))
  .catch(e => next(e));
});

router.get('/new', (req, res, next) => {
  res.render('places/new-place');
});

router.post('/new', (req, res, next) => {
  const newPlace = {
    name: req.body.name,
    description: req.body.description,
    location: {
      type: 'Point',
      coordinates: [req.body.latitude, req.body.longitude]}
  };

  new Place(newPlace)
    .save()
    .then(res.redirect('/places'))
    .catch(err => console.log(err));
});

module.exports = router;
