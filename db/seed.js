const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');




const seedUsers =async () =>{
  await prisma.users.create({
    data:{
      username: "Terry",
      password: `${await bcrypt.hash('THIS', 10)}`,
  
    }
  })
  await prisma.users.create({
    data:{
      username: "Tommy",
      password: `${await bcrypt.hash('WAS', 10)}`,
    }
    
  })
  await prisma.users.create({
    data:{
      username: "Tollen",
      password: `${await bcrypt.hash('HASHED', 10)}`,
    }
  })
  

  console.log(`user created`)
}

const createPost = async () => {
  for (let i=0;i<9; i++){
    await prisma.post.create({
      data:{
        title: "testing",
        content: "this is content",
        userid: (i%3)+1,
      }
    })
  }

  console.log( `posts created`)
}


const syncAndSeed = async () => {
  try {
    await seedUsers(),
    await createPost(),
    console.log(`db seeeded`)

  } catch(error) {
    console.log(error)
  }
}

syncAndSeed()