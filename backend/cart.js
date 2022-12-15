const db = require("../mysql")

module.exports = function(props){
    return {
        getCartProducts,
        getProductByCart,
        saveCartProduct,
        increaseCartProduct,
        decreaseCartProduct,
        deleteCartProduct,
        emptyCart
    }
}


async function getCartProducts(payload){
    let sqlStmt = `Select product.*,product_image.image_url, product_cart.quantity as cart_quantity, product_cart.product_id from product_cart inner join product on product_cart.product_id = product.id left join product_image on product_image.product_id = product.id where user_id = "${payload.userId}"`
    console.log(sqlStmt)
    try {
        let response = await db.query(sqlStmt)
        return {status: 200, response, error: null}
    } catch (error) {
        return {status: 500, response:null, error}
    }
}


async function getProductByCart(payload){
    let sqlStmt = `Select * from product_cart where user_id = "${payload.userId}" and product_id = "${payload.productId}"`

    try {
        let response = await db.query(sqlStmt)
        return {status: 200, response, error: null}
    } catch (error) {
        return {status: 500, response:null, error}
    }
}


async function saveCartProduct(payload){
    console.log(payload)
    let sqlStmt = `INSERT INTO product_cart (user_id, product_id,quantity, price) VALUES ("${payload.userId}","${payload.productId}", "${1}","${payload.productPrice}")`
    try {
        let response = await db.query(sqlStmt)
        return {status: 200, response, error: null}
    } catch (error) {
        return {status: 500, response:null, error}
    }
}


async function increaseCartProduct(payload){
    console.log("payyyy")
    let sqlStmt = `UPDATE product_cart SET quantity = quantity + 1,  updated_at = now() where user_id = "${payload.userId}" and  product_id = "${payload.productId}"`
    console.log(sqlStmt)
    try {
        let response = await db.query(sqlStmt)
        return {status: 200, response, error: null}
    } catch (error) {
        return {status: 500, response:null, error}
    }
}


async function decreaseCartProduct(payload){
    console.log("payyyy")
    let sqlStmt = `UPDATE product_cart SET quantity = quantity - 1,  updated_at = now() where user_id = "${payload.userId}" and  product_id = "${payload.productId}"`
    console.log(sqlStmt)
    try {
        let response = await db.query(sqlStmt)
        return {status: 200, response, error: null}
    } catch (error) {
        return {status: 500, response:null, error}
    }
}
async function deleteCartProduct(payload){
    let sqlStmt = `Delete from product_cart where product_id = "${payload.productId}" and user_id = "${payload.userId}"`

    try {
        let response = await db.query(sqlStmt)
        return {status: 200, response, error: null}
    } catch (error) {
        return {status: 500, response:null, error}
    }
}

async function emptyCart(payload){
    let sqlStmt = `Delete from product_cart where user_id = "${payload.userId}"`

    try {
        let response = await db.query(sqlStmt)
        return {status: 200, response, error: null}
    } catch (error) {
        return {status: 500, response:null, error}
    }
}