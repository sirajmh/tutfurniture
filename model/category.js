
const backend = require('../backend/category')({})
module.exports = (props) => {
    return {
        getCategories,
        getCategoryById,
        saveCategory,
        updateCategory,
        deleteCategory
    }
}

async function getCategories(req,res) {
    let payload = {}
    options = await backend.getCategories(payload)
    res.send(options)
  
}

async function getCategoryById(req,res) {
    let requestedPayload = req.body
    let payload = {
        id: requestedPayload.id
    }
    const options = await backend.getCategoryById(payload)
    res.send(options)
}

async function saveCategory(req,res) {
    let payload = req.body
    
    const options = await backend.saveCategory(payload)
    res.send(options)
}

async function updateCategory(req,res) {
    let payload = req.body
    const options = await backend.updateCategory(payload)
    res.send(options)
}
async function deleteCategory(req,res) {

    let payload = req.body
   
    const options = await backend.deleteCategory(payload)
    res.send(options)
}