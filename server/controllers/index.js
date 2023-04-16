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
                        expiresIn: 300,
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
          msg: "Failed to Authenticate",
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

const protectedRoute = (req,res)=>{

  res.send({
    msg:"This is a protected Route"
  })


}

module.exports = {
    createUser,
    checkUser,
    protectedRoute,
    verifyJWT,updateProfile
}