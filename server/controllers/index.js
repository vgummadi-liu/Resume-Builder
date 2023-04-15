const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const validators = require('../Validators')
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
      if (!password || password.length < 6) {
        return res.status(400).send({
          msg: 'Please enter a password with min. 6 chars'
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

const VerifyJWT = (req,res,next)=>{
  
    
}


const protectedRoute = (req,res)=>{

}

module.exports = {
    createUser,
    checkUser,
    protectedRoute
}