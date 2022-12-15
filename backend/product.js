

module.exports = function(props) {
    return {
        getProducts,
        getProductById,
        getProductsByCategoryId,
        saveProduct,
        updateProduct,
        deleteProduct,
        getProductRequests,
        saveProductRequest
    }
}

async function getProducts(payload){
    let sqlStmt = `Select product.*, product_image.image_url from product left join product_image on product.id = product_image.product_id`
    try {
        const result  = await db.query(sqlStmt);
        return {status: 200, response: result, error: null}
    } catch (error) {
       return  { status: 500, error: error, response: null} 
    }
}

async function getProductById(payload){
    let sqlStmt = `Select product.*, product_image.image_url from product left join product_image on product.id = product_image.product_id where product.id = "${payload.prodId}"`
    try {
        const result  = await db.query(sqlStmt);
        return {status: 200, response: result, error: null}
    } catch (error) {
       return  { status: 500, error: error, response: null} 
    }
}


function getProductsByCategoryId(payload, callback){
    let sqlStmt = `Select * from product where category_id = "${payload.categoryId}"`
    console.log(sqlStmt)
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


async function saveProduct(payload){
    let sqlStmt = `INSERT INTO product (category_id, product_name,product_price, product_description, quantity) VALUES ("${payload.categoryId}","${payload.productName}", "${payload.productPrice}","${payload.productDescription}","${payload.quantity}")`
    try {
        let response = await db.query(sqlStmt);
        let insertId = response.insertId;
        let sql = `INSERT INTO product_image (product_id, image_url) VALUES ("${insertId}", "${payload.imageUrl}")`
        let responsetwo =  await db.query(sql) 
        return {status: 200, response: responsetwo, error: null}
    } catch (error) {
        return {status: 500, response: null, error}
    }
}


function updateProduct(payload, callback){
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
async function deleteProduct(payload){
    let sqlStmt = `Delete from product where id = "${payload.id}"`
    try {
        let response = await db.query(sqlStmt);
        let sql = `Delete from product_image where product_id = "${payload.id}"`
        let responseTwo = await db.query(sql);
        return {status: 200, error: null, response: responseTwo} 
    } catch (error) {
       return {status: 500, error, response: null} 
    }

}

async function getProductRequests(payload){
    let sqlStmt = `Select * from  product_request`
    try {
        let response = await db.query(sqlStmt);
        return {status: 200, error: null, response} 
    } catch (error) {
       return {status: 500, error, response: null} 
    }
}

function saveProductRequest(payload, callback){
    let sqlStmt = `INSERT INTO product_request (title, requirement_description,email, contact_number) VALUES ("${payload.title}","${payload.description}", "${payload.email}","${payload.phone}")`
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