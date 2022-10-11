const PetController = require("../controllers/pet.controllers")
const { getAllPets, getOnePet, addPet, updatePet, deletePet } = PetController
module.exports = (app) => {
    app.get('/api/pets', getAllPets)
    app.get('/api/pets/:id', getOnePet)
    app.post('/api/pets', addPet)
    app.put('/api/pets/:id', updatePet)
    app.delete('/api/pets/:id', deletePet)
}
