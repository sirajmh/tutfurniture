
const db = require('../mysql')
function backendHandler(props){
    return {
        getCategories,
        getCategoryById,
        saveCategory,
        updateCategory,
        deleteCategory
    }
}

async function getCategories(payload, callback){
    let sqlStmt = `Select * from category`
    try {
      const result = await db.query(sqlStmt);
      return {status: 200, response: result, error: null}
    } catch (err) {
  
      return {status: 500, response: null, error: err}
    }
}

async function getCategoryById(payload, callback){
    let sqlStmt = `Select * from category where id = "${payload.id}"`
    try {
        const result = await db.query(sqlStmt);
        return {status: 200, response: result, error: null}
      } catch (err) {
    
        return {status: 500, response: null, error: err}
      }
}


async function saveCategory(payload, callback){
    let sqlStmt = `INSERT INTO category (category_name,narration) VALUES ("${payload.categoryName}", "${payload.narration}")`
    try {
        const result = await db.query(sqlStmt);
        return {status: 200, response: result, error: null}
      } catch (err) {
    
        return {status: 500, response: null, error: err}
    }
}


async function updateCategory(payload, callback){
    let sqlStmt = `UPDATE category SET category_name="${payload.categoryName}", narration="${payload.narration}", updated_at = now() where id = "${payload.id}"`

    try {
        const result = await db.query(sqlStmt);
        return {status: 200, response: result, error: null}
      } catch (err) {
    
        return {status: 500, response: null, error: err}
    }
}
async function deleteCategory(payload, callback){
    let sqlStmt = `Delete from category where id = "${payload.id}"`

    try {
        const result = await db.query(sqlStmt);
        return {status: 200, response: result, error: null}
      } catch (err) {
    
        return {status: 500, response: null, error: err}
    }
}
module.exports = backendHandler