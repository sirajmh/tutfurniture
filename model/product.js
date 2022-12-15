
const backend = require('../backend/product')({})
const { uploadImage } = require('../config/helper')
module.exports = function(props){
    return {
        getProducts,
        getProductById,
        getProductsByCategoryId,
        saveProduct,
        updateProduct,
        deleteProduct,
        uploadProductImage,
        saveProductRequest,
        getProductRequests
    }
}

async function getProducts(req,res) {
    let payload = {}
    const options = await backend.getProducts(payload)
    res.send(options)
}


async function getProductById(req,res) {
    let requestedPayload = req.body
   
    let payload = {
        prodId: requestedPayload.id
    }
    const options = await backend.getProductById(payload)
    res.send(options)
}


async function getProductsByCategoryId(req,res) {
    let payload = req.body
    const options = await backend.getProductsByCategoryId(payload)
    res.send(options)
}


async function saveProduct(req,res) {
    let payload = req.body
    
   let options = await backend.saveProduct(payload);
    res.send(options)

}


function updateProduct(req,res) {
    let payload = req.body
    backend.updateProduct(payload, function(options){
        res.send(options)
    })
}
async function deleteProduct(req,res) {
    let payload = req.body
    let options = await backend.deleteProduct(payload)
        res.send(options)
   
}


function uploadProductImage(req,res) {
    let payload = req.body
    debugger
    uploadImage(req, res, function(error){
        if(error){
          return res.send({status: 500, error, response: null })
        } else {
            console.log(req.files)
            return  res.send({status: 200, error, response: req.files[0] })
        }
    })
   
}

function saveProductRequest(req,res) {
    let payload = req.body
    
    backend.saveProductRequest(payload, function(options){
        res.send(options)
    })
}

async function getProductRequests(req,res) {
    let payload = {}
    
   let options = await backend.getProductRequests(payload);
    res.send(options)

}