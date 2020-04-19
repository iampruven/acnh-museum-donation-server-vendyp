const express = require('express')
const AddItemServices = require('./addItem-service')
const jsonParser = express.json();
const AddItemRouter = express.Router()
const { requireAuth } = require('../middleware/jwt-auth')
AddItemRouter
    .route('/')
    .all(requireAuth)
    .get((req,res,next)=>{
        // const knexInstance = req.app.get("db")
        AddItemServices.getNewItems(req.app.get('db'),req.user.id) //update with req.user.id instead of 1
            .then(newItem=>{
                res.json(newItem)
            })
            .catch(next)
    })
    .post(jsonParser, (req,res,next)=>{
        const { name, date } = req.body;
        const  user_id = req.user.id; //remove 1 when have authorization for login put this instead  of 1 -> req.user.id 
        console.log(req.body);
        const knexInstance = req.app.get("db")
        AddItemServices.getByName(knexInstance,name)
            .then(data=>{
                const item_id = data.id
                const newItem = { user_id, item_id, date }
                return AddItemServices.insertItem(knexInstance,newItem)
                    .then(userItem=>{
                       
                        userItem.name = data.name
                        console.log(userItem.name)
                        userItem.img = data.img
                        console.log(userItem)
                        res.status(201).json(userItem)
                    })
            })
            .catch(next);
        

    });

AddItemRouter
    .route('/:id')
    .all(requireAuth)
    .delete((req,res,next)=>{
        
        const { id } = req.params
        const knexInstance = req.app.get("db")
        AddItemServices.deleteItem(knexInstance,id)
            .then(() =>
                res.status(204).end())
            .catch(next);
    })
    






module.exports = AddItemRouter;