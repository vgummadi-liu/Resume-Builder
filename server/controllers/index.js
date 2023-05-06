const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const validators = require('../Validators')
const ProfileValidator = require('../Validators/ProfileValidator');
const db = require('../db');



const createUser  = async (req,res)=>{
    
    
        let{email,password}=req.body
        
        

        let roleid = 2;
        //creating user object
        const user={
            email,
            password,
            roleid
        }
    
        //validate user and the information provided by them
        if (!email || !validators.ValidateEmail(email)) {
         
          return res.status(400).send({
            msg: 'Please enter valid email id'
          });
        }
    
        // password min 6 chars
        if (!password || password.length < 6) {
          return res.status(400).send({
            msg: 'Please enter a password with min. 6 chars'
          });
        }


        db.query(`SELECT * FROM users WHERE email=?`,email,(err, result) => {
             
                    if(err){
                        return res.status(400).send({
                            msg:err
                        })
                    }
                   
                    //check whether username already exist or not
                    if (result.length!==0) {
                      return res.status(409).send({
                        msg: 'This email is already in use!'
                      });
                    } 
                      // username is available
                      bcrypt.hash(password, 8).then((hash)=> {
                        //set the password to hash value
                        user.password=hash
            
                      }).then(()=>{
                        db.query("INSERT INTO users SET ?",user,(err,result)=>{
                          if(err){
                              return res.status(400).send({
                                  msg:err
                              })

                        
                          }

                           db.query('SELECT * FROM users WHERE email=?',email,(err,result)=>{
                            if(err){
                              return res.status(400).send({
                                  msg:err
                              })
                            }

                              
                            return res.status(201)
                            .send({
                                userdata:user,
                                msg:"successfully registered"
                              }) 


                           
                           
                        })
                      })
                })
            });//endofquery
    


     


}     
    
    

const checkUser = (req,res)=>{

    let{email,password}=req.body;

    if (!email || !validators.ValidateEmail(email)) {
        return res.status(400).send({
          msg: 'Please enter valid email id'
        });
      }
  
      // password min 6 chars
      if (!password || password.length < 8) {
        return res.status(400).send({
          msg: 'Please enter a password with min. 8 chars'
        });
      }

      db.query(`SELECT * FROM users WHERE email=?`,email,async (err, result) => {
             
        if(err){
            return res.status(400).send({
                msg:err
            })
        }
       
        //check whether username already exist or not
        if (result.length==0) {
          return res.status(401).send({
            msg: 'NO User Registered with this email!'
          });
        }
        else{
            const hashedPassword = result[0].password
             //get the hashedPassword from result
            if (await bcrypt.compare(password, hashedPassword)) {
                       console.log("---------> Login Successful")
                       console.log("---------> Generating accessToken")
                       const id = result[0].id;
                       const token = jwt.sign({id},process.env.JWT_SECRET_KEY,{
                        expiresIn: 300000,
                        jwtid:result[0].email,

                       })

                       let role = "client";

                       if(result[0].roleid === 1){
                        role = "Admin"
                       }
                       
                       let user = {
                        email:result[0].email,
                        role:role
                       }

                       return res.status(200).send({
                        auth:true,
                        token:token,
                        result: user
                       })
                       
            } else {
                return res.status(404).send({
                    msg: '"Password incorrect!"'
                  });
            }

        } 

    });






}

const verifyJWT = (req,res,next)=>{
  const token = req.headers["x-access-token"];
  
  if(!token){
    res.status(404).send({
      auth:false,
      msg:"Token required to Authenticate",
    })
  }
  else{
    jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decoded)=>{

      if(err){
        res.status(401).send({
          auth:false,
          //msg: "Failed to Authenticate",
          error: err
        })
      }
      else{
          req.user = decoded.jti;
          console.log(req.user);
          next();
      }
    })
  }
    
}



const updateProfile = (req,res)=>{
  const body = req.body;
  console.log(body);
  const err = ProfileValidator.validateProfile(body);

  if(err){
    return res.status(401).send({
      msg:"Update Failed",
      error:err
    })
  }

  var userid = 0;
  db.query(`SELECT userid from users where Email = ?`,req.user,(err,result)=>{
    if(err){
        return res.status(400).send({ 
            msg:err
        })
    }
   
    if(result.length == 0){
     
        return res.status(401).send({
          msg: 'NO User Registered with this email!'
        });
      
    }
    else{
      userid = result[0].userid;

      db.query(`SELECT id from Profile WHERE userid = ?`,userid,(err,response)=>{
        if(err){
          return res.status(401).send({
            msg: 'Error while fetching the id from profile table',
            error:err
          });
        }
        else{
          if(response.length == 0){
            let obj = {
              userid:userid,
              first_name:body.first_name,
              last_name:body.last_name,
              mobile_number:body.mobile_number,
              portfolio:body.portfolio,
              address:body.address,
              carrier_objective:body.carrier_objective,
              created_at:'NOW()',
              updated_at:''
            };

            db.query(`INSERT INTO Profile SET ?`,obj,(err,ans)=>{
              if(err){
                return res.status(401).send({
                  msg: 'Error while Inserting into the profile table',
                  error:err
                });

              }
              else{
                return res.status(200).send({
                  msg: 'Updated Successfully',
                });
              }
            })
            
          }
          else{

            const {first_name,last_name,mobile_number,portfolio,address,carrier_objective} = body;
            const query = `UPDATE Profile SET first_name = ?, last_name = ?, mobile_number = ?, portfolio = ?, address = ?, carrier_objective = ?, updated_at = NOW() WHERE userid = ?`;
            const values = [first_name, last_name, mobile_number, portfolio, address, carrier_objective, userid];
            db.query(query,values,(err,results)=>{
              if(err){
                return res.status(401).send({
                  msg: 'Error while Updating the profile table',
                  error:err
                });
              }
              else{
                return res.status(200).send({
                  msg: 'Updated Successfully',
                });
              }
            })
          }
        }
      })
      
      
    }   
  });//end of query
  



  
}

const updateEducation = (req, res) => {
  const body = req.body;
  console.log(body);

  const err = ProfileValidator.validateEducation(body);

  if (err) {
    return res.status(401).send({
      msg: "Update Failed",
      error: err,
    });
  }

  const userEmail = req.user;

  db.query(`SELECT userid from users where Email = ?`, userEmail, (err, result) => {
    if (err) {
      return res.status(400).send({
        msg: err,
      });
    }

    if (result.length == 0) {
      return res.status(401).send({
        msg: "NO User Registered with this email!",
      });
    } else {
      const userid = result[0].userid;

      body.forEach((education, index) => {
        const {
          id,
          degree,
          major,
          school,
          startDate,
          endDate,
          description
        } = education;

        const obj = {
          userid: userid,
          degree: degree,
          Major: major,
          school: school,
          start_date: startDate,
          end_date: endDate,
          description: description
        };

        if (id) { // If education id exists, update the existing education record
          db.query(`UPDATE Education SET ? WHERE id = ? AND userid = ?`, [obj, id, userid], (err, results) => {
            if (err) {
              return res.status(401).send({
                msg: "Error while Updating the Education table",
                error: err,
              });
            } else {
              if (index == body.length - 1) {
                return res.status(200).send({
                  msg: "Updated Successfully",
                });
              }
            }
          });
        } else { // If education id does not exist, insert a new education record
          db.query(`INSERT INTO Education SET ?`, obj, (err, ans) => {
            if (err) {
              return res.status(401).send({
                msg: "Error while Inserting into the Education table",
                error: err,
              });
            } else {
              if (index == body.length - 1) {
                return res.status(200).send({
                  msg: "Updated Successfully",
                });
              }
            }
          });
        }
      });
    }
  }); //end of query
};


const updateSkills = (req, res) => {
  const body = req.body;
  console.log(body);

  const err = ProfileValidator.validateSkill(body);

  if (err) {
    return res.status(401).send({
      msg: "Update Failed",
      error: err,
    });
  }

  const userEmail = req.user;

  db.query(`SELECT userid from users where Email = ?`, userEmail, (err, result) => {

    if (err) {
      return res.status(400).send({
        msg: err,
      });
    }

    if (result.length == 0) {
      return res.status(401).send({
        msg: "NO User Registered with this email!",
      });
    } else {
      const userid = result[0].userid;

      body.forEach((skill, index) => {
        const { name, rating } = skill;

        // Check if the skill already exists in the database for this user
        db.query(`SELECT id FROM Skill WHERE userid = ? AND name = ?`, [userid, name], (err, response) => {
          if (err) {
            return res.status(401).send({
              msg: "Error while fetching the skill from the skill table",
              error: err,
            });
          } else {
            const obj = {
              userid: userid,
              name: name,
              rating: rating
            };

            if (response.length == 0) {
              // If the skill does not exist, insert it into the database
              db.query(`INSERT INTO Skill SET ?`, obj, (err, ans) => {
                if (err) {
                  return res.status(401).send({
                    msg: "Error while Inserting into the skill table",
                    error: err,
                  });
                } else {
                  if (index == body.length - 1) {
                    return res.status(200).send({
                      msg: "Updated Successfully",
                    });
                  }
                }
              });
            } else {
              // If the skill exists, update its rating in the database
              db.query(`UPDATE Skill SET rating = ? WHERE userid = ? AND name = ?`, [rating, userid, name], (err, results) => {
                if (err) {
                  return res.status(401).send({
                    msg: "Error while Updating the skill table",
                    error: err,
                  });
                } else {
                  if (index == body.length - 1) {
                    return res.status(200).send({
                      msg: "Updated Successfully",
                    });
                  }
                }
              });
            }
          }
        });
      });
    }
  });
};

const updateExperience = (req, res) => {
  const body = req.body;
  console.log(body);

  const err = ProfileValidator.validateExperience(body);

  if (err) {
    return res.status(401).send({
      msg: "Update Failed",
      error: err,
    });
  }

  const userEmail = req.user;

  db.query(`SELECT userid from users where Email = ?`, userEmail, (err, result) => {
    if (err) {
      return res.status(400).send({
        msg: err,
      });
    }

    if (result.length == 0) {
      return res.status(401).send({
        msg: "NO User Registered with this email!",
      });
    } else {
      const userid = result[0].userid;

      body.forEach((experience, index) => {
        const {
          id,
          title,
          company,
          location,
          startDate,
          endDate,
          description
        } = experience;

        const obj = {
          userid: userid,
          title: title,
          company: company,
          location: location,
          start_date: startDate,
          end_date: endDate,
          description: description
        };

        if (id) { // If education id exists, update the existing education record
          db.query(`UPDATE Experience SET ? WHERE id = ? AND userid = ?`, [obj, id, userid], (err, results) => {
            if (err) {
              return res.status(401).send({
                msg: "Error while Updating the Experience table",
                error: err,
              });
            } else {
              if (index == body.length - 1) {
                return res.status(200).send({
                  msg: "Updated Successfully",
                });
              }
            }
          });
        } else { // If education id does not exist, insert a new education record
          db.query(`INSERT INTO Experience SET ?`, obj, (err, ans) => {
            if (err) {
              return res.status(401).send({
                msg: "Error while Inserting into the Education table",
                error: err,
              });
            } else {
              if (index == body.length - 1) {
                return res.status(200).send({
                  msg: "Updated Successfully",
                });
              }
            }
          });
        }
      });
    }
  }); //end of query
};





const getProfile = (req,res)=>{
 

  var userid = 0;

  db.query(`SELECT userid from users where Email = ?`,req.user,(err,result)=>{
    if(err){
        return res.status(400).send({ 
            msg:err
        })
    }
    if(result.length == 0){
     
      return res.status(401).send({
        msg: 'NO User Registered with this email!'
      });
    
  }
  else{
    userid = result[0].userid;
    
db.query(`SELECT * FROM profile WHERE userid = ?`, userid, (error, results) => {
  if (error) {
    console.error('Error:', error);
    return res.status(500).send('Error retrieving user profile.');
  }
  console.log(results)
  if (results.length === 0) {
    // No profile data found for the user
    return res.status(404).send('User profile not found.');
  }

  const profile = {
    first_name: results[0].first_name,
    last_name: results[0].last_name,
    mobile_number: results[0].mobile_number,
    portfolio: results[0].portfolio,
    address: results[0].address,
    carrier_objective: results[0].carrier_objective
  };

  res.json(profile);
});


  }
    
});

}

const getEducation = (req, res) => {
  var userid = 0;

  db.query(`SELECT userid from users where Email = ?`, req.user, (err, result) => {
    if (err) {
      return res.status(400).send({ 
        msg:err
      })
    }
    if (result.length == 0) {
      return res.status(401).send({
        msg: 'NO User Registered with this email!'
      });
    } else {
      userid = result[0].userid;
      db.query(`SELECT * FROM Education WHERE userid = ?`, userid, (error, results) => {
        if (error) {
          console.error('Error:', error);
          return res.status(500).send('Error retrieving user education.');
        }
        console.log(results);
        
        res.json(results);
      });
    }
  });
}

const getSkills = (req, res) => {
  var userid = 0;

  db.query(`SELECT userid from users where Email = ?`, req.user, (err, result) => {
    if (err) {
      return res.status(400).send({ 
        msg:err
      })
    }
    if (result.length == 0) {
      return res.status(401).send({
        msg: 'NO User Registered with this email!'
      });
    } else {
      userid = result[0].userid;
      db.query(`SELECT * FROM Skill WHERE userid = ?`, userid, (error, results) => {
        if (error) {
          console.error('Error:', error);
          return res.status(500).send('Error retrieving user skills.');
        }
        console.log(results);
        res.json(results);
      });
    }
  });
}

const getExperience = (req, res) => {
  var userid = 0;

  db.query(`SELECT userid from users where Email = ?`, req.user, (err, result) => {
    if (err) {
      return res.status(400).send({ 
        msg:err
      })
    }
    if (result.length == 0) {
      return res.status(401).send({
        msg: 'NO User Registered with this email!'
      });
    } else {
      userid = result[0].userid;
      db.query(`SELECT * FROM Experience WHERE userid = ?`, userid, (error, results) => {
        if (error) {
          console.error('Error:', error);
          return res.status(500).send('Error retrieving user experience.');
        }
        console.log(results);
        
        res.json(results);
      });
    }
  });
}


const protectedRoute = (req,res)=>{

  res.send({
    msg:"This is a protected Route"
  })


}

const getAllUsers = async (req,res)=>{
  try{
    const role = req.user.split('@')[0];

    if(role !== "Admin"){
      return res.status(403).send({message: 'Unauthorized Access'});
    }
    db.query(`SELECT * FROM users where roleid != 1`,(errors,results)=>{
      if (errors) {
        console.error('Error:', errors);
        return res.status(500).send('Error retrieving user experience.');
      }
      console.log(results);
      
      res.json(results);
    })
  }
  catch(error){
    console.log(error);
    res.status(500).send({msg:"Internal Server Error"})
  }
}

const deleteUsers =(req,res)=>{
  const { userid } = req.params;
  
  try{
    const role = req.user.split('@')[0];

    if(role !== "Admin"){
      return res.status(403).send({message: 'Unauthorized Access'});
    }
    db.beginTransaction(function (err) {
      if (err) throw err;
    
      // Step 1: Delete records from the dependent tables
      db.query('DELETE FROM Skill WHERE userid = ?', [userid], function (
        err,
        results
      ) {
        if (err) {
          db.rollback(function () {
            throw err;
          });
        }
    
        db.query('DELETE FROM Education WHERE userid = ?', [userid], function (
          err,
          results
        ) {
          if (err) {
            db.rollback(function () {
              throw err;
            });
          }
    
          db.query('DELETE FROM Experience WHERE userid = ?', [userid], function (
            err,
            results
          ) {
            if (err) {
              db.rollback(function () {
                throw err;
              });
            }
    
            db.query('DELETE FROM Profile WHERE userid = ?', [userid], function (
              err,
              results
            ) {
              if (err) {
                db.rollback(function () {
                  throw err;
                });
              }
    
              // Step 2: Delete the user record from the users table
              db.query('DELETE FROM users WHERE userid = ?', [userid], function (
                err,
                results
              ) {
                if (err) {
                  db.rollback(function () {
                    throw err;
                  });
                }
    
                db.commit(function (err) {
                  if (err) {
                    db.rollback(function () {
                      throw err;
                    });
                  }
    
                  console.log('User data deleted successfully.');
                  res.status(200).send({
                    msg: "User data deleted successfully."
                  })
                  db.end();
                });
              });
            });
          });
        });
      });
    });
  }
  catch(error){
    console.log(error);
    res.status(500).send({msg:"Internal Server Error"})
  }
  

}

module.exports = {
    createUser,
    checkUser,
    protectedRoute,
    verifyJWT,updateProfile,
    getProfile,
    updateEducation,
    updateSkills,
    updateExperience,
    getEducation,
    getExperience,
    getSkills,
    getAllUsers,
    deleteUsers 
}