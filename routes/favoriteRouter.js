const express = require('express');
const cors = require('./cors');
const authenticate = require('../authenticate');
const Favorite = require('../models/favorite');


const favoriteRouter = express.Router();

favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (req, res, next) =>{
    Favorite.find()
    .populate('User')
    .populate('Campsite')
    .then(favorites=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorites);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) =>{
    Favorite.create(req.body)
    .then(favorite =>{
     if (favorite) {
         req.body._id.forEach( id =>{
             if(!id.includes(indexOf(favorite))) {
                favorite._id.push(id);
                favorite.save();
             } else {
                favorite._id.remove();
                favorite.save();
             }
         })
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite);
     }
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res) =>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) =>{
    Favorite.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

favoriteRouter.route('/:favoriteId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (req, res) =>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) =>{
    Favorite.findById(req.params.campsiteId)
    .then(favorite => {
        if (!favorite._id.includes(req.params.favoriteId)) {
            favorite._id.push(req.body);
            favorite.save()
            .then(favorite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            })
            .catch(err => next(err));
        } else {
            err = new Error(`Favorite ${req.params.favoriteId} is already in the list of favorites`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res)=>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) =>{
    Favorite.findByIdAndDelete(req.params.campsiteId)
    .then(favorite => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite);
    })
    .catch(err => next(err));
});




module.exports = favoriteRouter;