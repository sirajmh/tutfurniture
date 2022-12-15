
const userModel = require('../model/user')({})
const categoryModel = require('../model/category')({})
const productModel = require('../model/product')({})
const orderModel = require('../model/order')({})
const jwt = require('jsonwebtoken')
const cartModel = require('../model/cart')({})
module.exports = function(router, expressApp){
    router.post("/user/save", userModel.save)
    router.post("/user/login", userModel.processLogin)

    router.post('/category/getall', categoryModel.getCategories)
    router.post('/category/getbyid', categoryModel.getCategoryById)
    router.post('/category/save', categoryModel.saveCategory)
    router.post('/category/update', categoryModel.updateCategory)
    router.post('/category/delete', categoryModel.deleteCategory)
    
    router.get('/product/getall', productModel.getProducts)
    router.post('/product/getbyid', productModel.getProductById)
    router.post('/product/getbycid', productModel.getProductsByCategoryId)
    router.post('/product/save', productModel.saveProduct)
    router.post('/product/update', productModel.updateProduct)
    router.post('/product/delete', productModel.deleteProduct)
    router.post('/upload', productModel.uploadProductImage)

    router.get('/cart/getall',authenticateToken, cartModel.getCartProducts)
    router.post('/cart/save',authenticateToken, cartModel.saveCartProduct)
    router.post('/cart/quantity/increase',authenticateToken, cartModel.increaseCartProduct)
    router.post('/cart/quantity/decrease',authenticateToken, cartModel.decreaseCartProduct)
    
   router.post('/cart/delete',authenticateToken, cartModel.deleteCartProduct)
   
   router.get('/order/getall',authenticateToken, orderModel.getOrdersByUserId)
   router.post('/order/save', authenticateToken, orderModel.saveOrder)
   router.post('/order/update', orderModel.updateOrder)
   router.post('/order/uid/getall',authenticateToken, orderModel.getOrdersByUserId)
    router.post('/order/save',authenticateToken, orderModel.saveOrder)
    router.post('/order/update', orderModel.updateOrder)

    return router
}


const authenticateToken = (req, res, next)=>{
    console.log(req.headers['x-auth-token'])
    try {
        const user = jwt.verify(req.headers['x-auth-token'], 'secret')
        console.log(user)
        req.user = user
        next();
    } catch (error) {
       console.log("em i here..") 
       req.headers['x-auth-token'] = null
       req.user = null
       return res.send(error)
    }
    
   
}