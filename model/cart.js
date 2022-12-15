
const backend = require("../backend/cart")({});

module.exports =function(props){
    return {
        getCartProducts,
        saveCartProduct,
        increaseCartProduct,
        decreaseCartProduct,
        deleteCartProduct,
        emptyCart
    }
}


async function getCartProducts(req,res) {
    let payload = req.body
    

    payload = {userId: req.user.id, ...payload}
    let _response = await backend.getCartProducts(payload)
    let totalPrice = 0
    if(_response.status == 200 && _response.response.length > 0 ){
        totalPrice = _response.response.map((item) => item.product_price * item.quantity).reduce((p,n) => p + n)
    }
    console.log(totalPrice)
    _response.totalPrice = totalPrice
    res.send(_response)
    
}


async function saveCartProduct(req,res) {
    let payload = req.body
    payload = {userId: req.user.id, ...payload}
    let isProductAvailable = await backend.getProductByCart(payload)
    if(isProductAvailable.status != 200){
        return res.send(isProductAvailable)
    }
    if(isProductAvailable.response.length > 0){
        //update quantity
        let _response = await backend.increaseCartProduct(payload)
        return res.send(_response)
        
    } else {
        // insert record with one quantity into cart
       let _response = await backend.saveCartProduct(payload)
        return res.send(_response)
    }
    
}


async function increaseCartProduct(req,res) {
    let payload = req.body
    payload = {userId: req.user.id, ...payload}
    console.log(req.body)
    let _response = await backend.increaseCartProduct(payload)
    res.send(_response)
}

async function decreaseCartProduct(req,res) {
    let payload = req.body
    payload = {userId: req.user.id, ...payload}
    
    let _response = await backend.decreaseCartProduct(payload)
    res.send(_response)
}
async function deleteCartProduct(req,res) {
    let payload = req.body
    console.log(req.user)
    payload = {userId: req.user.id, ...payload}
    let _response = await backend.deleteCartProduct(payload)
      res.send(_response)
   
}

async function emptyCart(req,res) {
    let payload = req.body
    payload = {userId: 2, ...payload}
    let _response = await backend.emptyCart(payload)
      res.send(_response)
   
}
