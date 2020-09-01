const express = require('express');
const cors = require('./cors');
const authenticate = require('../authenticate');
const Favorite = require('../models/favorite');


const favoriteRouter = express.Router();

favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (req, res, next) =>{
    Favorite.find()
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
                favorite._id.push(id);
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

})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) =>{
    
});

favoriteRouter.route('/:campsiteId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (req, res, next) =>{

})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) =>{
    
})
.put(cors.corsWithOptions, authenticate.verifyUser)
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) =>{
    
});




module.exports = favoriteRouter;