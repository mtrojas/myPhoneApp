const express = require('express');
const router = express.Router();

const Phone = require('../models/phone-model');

//RESTful API
/* GET Phones listing. */
router.get('/', (req, res, next) => {
  Phone.find()
    .then(phones => {
      return res.status(200).json(phones)
    })
    .catch(error => next(error));
});

/* CREATE a new Phone. */
router.post('/', (req, res, next) => {
  Phone.create(req.body)
    .then(phone => {
      return res.status(201).json(phone)
    })
    .catch(error => {
      return res.status(500).json(error)
    });
});

/* GET a single Phone. */
router.get('/:id', (req, res, next) => {
  Phone.findById(req.params.id)
    .then(phone => {
      if(!phone) return res.status(404)
      return res.status(200).json(phone)
    })
    .catch(error => {
      return res.status(500).json(error)
    });
});

/* EDIT a Phone. */
router.put('/:id', (req, res, next) => {
  Phone.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(phone => {
      return res.status(202).json(phone)
    })
    .catch(error => {
      return res.status(404).json(error)
    });
});

/* DELETE a Phone. */
router.delete('/:id', (req, res, next) => {
  Phone.findByIdAndRemove(req.params.id)
    .then(phone => {
      res.status(200).json(phone)
    })
    .catch(error => {
      res.status(500).json({message:"Something went wrong!"})
        next(error)
    });
})


module.exports = router;