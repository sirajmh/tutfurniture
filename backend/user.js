const md5 = require("md5")
const db = require("../mysql");

module.exports = function(props){
    return {
        saveUser,
        verifyUserEmail,
        verifyUserPassword
    }
}

async function saveUser(payload){
    let sqlStmt = `INSERT INTO users (full_name, email, password, phone,pincode) VALUES ("${payload.name}","${payload.email}", "${md5(payload.password)}", "${payload.phone}","${payload.pincode}")`
  
  try {
    const result = await db.query(sqlStmt);
    return {status: 200, response: result, error: null}
  } catch (err) {

    return {status: 500, response: null, error: err}
  }
  
  
}


async function verifyUserEmail(payload){
    let sqlStmt = `Select id, full_name, user_type, email from users where email = "${payload.email}"`

  try {
    const result = await db.query(sqlStmt);
    console.log(sqlStmt)
    if(result.length == 0){
        return {status: 403, response: null, error: "user with this email does not exist"}
    } else {
        return {status: 200, response: result, error: null}

    }
    return {status: 200, response: result, error: null}
  } catch (err) {

    return {status: 500, response: null, error: err}
  }
  
  
}


async function verifyUserPassword(payload){
    let sqlStmt = `Select id, full_name, user_type, email, phone from users where email = "${payload.email}" and password = "${md5(payload.password)}"`

  try {
    const result = await db.query(sqlStmt);
    console.log(sqlStmt)
    if(result.length == 0){
        return {status: 403, response: null, error: "Invalid Credentials"}
    } else {
        return {status: 200, response: result, error: null}

    }
    return {status: 200, response: result, error: null}
  } catch (err) {

    return {status: 500, response: null, error: err}
  }
  
  
}