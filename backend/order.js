const db = require("../mysql")

module.exports = function(props){
    return {
        getOrders,
        updateOrder,
        getOrdersByUserId,
        updateOrderStatus,
        getCartProducts,
        saveOrder
    }
}

async function getOrdersByUserId(payload, callback){
    let sqlStmt = `SELECT product_orders.user_id,product_orders.customer_address1,product_orders.customer_address2, product_orders.email, product_orders.contact_number,product_orders.pincode, product_order_items.* FROM product_orders inner join product_order_items on product_orders.id = product_order_items.order_id where user_id = "${payload.userId}"`
   console.log(sqlStmt);
    try {
        let response = await db.query(sqlStmt)
        return {status: 200, response, error: null}
    } catch (error) {
        return {status: 500, response:null, error}
    }
}

async function getOrders(payload){
    let sqlStmt = `SELECT product_orders.user_id,product_orders.customer_address1,product_orders.customer_address2, product_orders.email, product_orders.contact_number,product_orders.pincode, product_order_items.* FROM product_orders inner join product_order_items on product_orders.id = product_order_items.order_id`
    try {
        let response = await db.query(sqlStmt)
        console.log(sqlStmt)
        console.log(response)
        return {status: 200, response, error: null}
    } catch (error) {
        return {status: 500, response:null, error}
    }
}


function updateOrder(payload, callback){
    let sqlStmt = `UPDATE product SET category_id = "${payload.categoryId}" product_name="${payload.productName}", product_price="${payload.productPrice}", product_description = "${product.productDescription}", quantity = "${payload.productQuantity}", updated_at = now() where id = "${payload.id}"`

    db.query(sqlStmt, function(err, response){
        if(!err){
           let options = { status: 200, error: null, response: response} 
           callback(options)
        } else {
           let options = { status: 500, error: err, response: null} 
           callback(options)
        }
    })
}


function updateOrderStatus(payload, callback){
    let sqlStmt = `UPDATE product_order_items SET delivery_status = "${payload.deliveryStatus}", updated_at = now() where id = "${payload.id}"`

    db.query(sqlStmt, function(err, response){
        if(!err){
           let options = { status: 200, error: null, response: response} 
           callback(options)
        } else {
           let options = { status: 500, error: err, response: null} 
           callback(options)
        }
    })
}


async function getCartProducts(payload, callback){
    let sqlStmt = `Select product.*,product_image.image_url, product_cart.quantity, product_cart.product_id from product_cart inner join product on product_cart.product_id = product.id left join product_image on product_image.product_id = product.id where user_id = "${payload.userId}"`
    try {
        let response = await db.query(sqlStmt)
        return {status: 200, response, error: null}
    } catch (error) {
        return {status: 500, response:null, error}
    }
}


async function saveOrder(payload){
    let sqlStmt = `INSERT INTO product_orders (user_id, customer_address1,customer_address2 ,pincode, contact_number, email) VALUES ("${payload.userId}","${payload.address1}", "${payload.address2}","${payload.pincode}","${payload.phone}","${payload.email}")`
   try {
        let response = await db.query(sqlStmt)
        return {status: 200, response, error: null}
    } catch (error) {
        return {status: 500, response:null, error}
    }
}