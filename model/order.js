const backend = require("../backend/order")({});
module.exports = function(props) {
    return {
        getOrdersByUserId,
        saveOrder,
        updateOrder,
        getOrders,
        updateOrderStatus
    }
}

async function getOrdersByUserId(req,res) {
    let payload = req.body
    payload = {userId: req.user.id, ...payload}
    let _response = await backend.getOrdersByUserId(payload)
    res.send(_response)
}

function updateOrder(req,res) {
    let payload = req.body
    backend.updateOrder(payload, function(options){
        res.send(options)
    })
}


async function getOrders(req,res) {
    let payload = req.body
    // payload = {userId: req.user.id, ...payload}
    let _response = await backend.getOrders(payload)
    res.send(_response)
}


function updateOrderStatus(req,res) {
    let payload = req.body
    backend.updateOrderStatus(payload, function(options){
        res.send(options)
    })
}

async function saveOrder(req,res) {
    let payload = req.body
    payload = {userId: req.user.id, ...payload}
    let cartProducts = await backend.getCartProducts(payload)
    if(cartProducts.status != 200){
        return res.send(cartProducts)
    }
    if(cartProducts.response.length == 0){
        return res.send({status: 403, error: 'Cart is empty', response: null})
    }
    let generateOrderResponse = await backend.saveOrder(payload);
    if(generateOrderResponse.status != 200){
        return res.send(generateOrderResponse)
    }
    let orderId =  generateOrderResponse.response.insertId
    

    payload = {orderId: orderId, ...payload}
    let cartItems = cartProducts.response;
    payload = {cartItems, ...payload};
    
    // return res.send({generateOrderResponse,payload})

    let _response = await backend.saveOrderItems(payload)
    if(_response.status == 200){
        let emailOptions = {
            email: payload.email,
            message: `Hi ${payload.name}, Your order has been placed`
        }
        sendEmail(emailOptions);
    }
    res.send(_response)
}