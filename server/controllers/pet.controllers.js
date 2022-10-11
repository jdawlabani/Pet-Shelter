const Pet = require("../models/pet.models")

module.exports = {
    getAllPets : (req,res) =>{
        Pet.find()
        .then((result) => {
            res.json(result)
        }).catch((err) => {
            res.status(400).json(err)
        })
    },

    getOnePet:(req,res)=>{
        Pet.findById(req.params.id)
        .then((result)=>{
            res.json(result)
        }).catch((err)=>{
            res.status(400).json(err)
        })
    },

    addPet:(req,res)=>{
        Pet.create(req.body)
        .then((result)=>{
            res.json(result)
        }).catch((err)=>{
            res.status(400).json(err)
        })
    },

    updatePet:(req,res)=>{
        Pet.updateOne({_id:req.params.id},req.body,{runValidators:true})
        .then((result)=>{
            res.json(result)
        }).catch((err)=>{
            res.status(400).json(err)
        })
    },
    
    deletePet:(req,res)=>{
        Pet.deleteOne({_id:req.params.id})
        .then((result)=>{
            res.json(result)
        }).catch((err)=>{
            res.status(400).json(err)
        })
    }
}
