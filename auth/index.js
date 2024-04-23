const authRouter = require("express").Router();
const db = require("../db");
const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client");
const { urlencoded } = require("express");

const prisma = new PrismaClient();


authRouter.post("/register", async (req, res, next) => {
  try {
    user = {
      username: req.body.username,
      password: req.body.password
    }
    const newUser = await prisma.users.create({ data: user })
    res.send(newUser)
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET);
    res.status(201).send({message: "Successful Registration", token });

  } catch (error) {
    console.log(error);
    next(error);
  }


})

authRouter.post("/login", async (req, res, next) => {
  try {
    const authUser = await prisma.users.findUnique({
      where: {
        username: req.body.username,
        password: req.body.password,
        
      }
    })

    if (!authUser) {
      return res.status(401).send(`Incorrect username or password, please try again`)
    }

    const token = jwt.sign({ id: authUser.id }, process.env.JWT_SECRET)
    res.status(201).send({message: "Login Successful", token });

  } catch (error) {
    console.log(error)
    next(error);
  }

});


module.exports = authRouter;