const { PrismaClient } = require("@prisma/client");
const express = require('express');
const jwt = require('jsonwebtoken');
const apiRouter = express.Router();
require('dotenv').config();

const prisma = new PrismaClient();

apiRouter.use( async (req, res, next)=> {
  const prefix = "Bearer ";
  const auth = req.header('Authorization');

  if(!auth){
    next(); 
  }
  else if(auth.startsWith(prefix)){

    const token = auth.slice(prefix.length);
    const {id} = jwt.verify(token, process.env.JWT_SECRET);

    if(id){
      const user = await prisma.users.findUnique({
        where: {
          id: id
        }
      })
      req.user = {id: user.id, username: user.username};
      next();
    }else{
      next();
    }

  }
  else{
    next();
  }
})





apiRouter.use('/posts', require("./posts"));

module.exports =apiRouter;