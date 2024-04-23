const express = require('express');
const postsRouter = express.Router();

const { PrismaClient } = require("@prisma/client");
const { post } = require('..');
const { requireUser } = require("./utils");

const prisma = new PrismaClient();


postsRouter.get('/', async(req,res,next)=>{

  const allPosts = await prisma.post.findMany()
  res.send(allPosts)

});

postsRouter.get('/:postId', async(req, res, next)=>{
  try{
    const postById = await prisma.post.findUnique({

      where: {
        id: parseInt(req.params.postId)
        
      }
    
     
    })
    res.send(postById)

  }catch(error){
    console.log(error);
  }


});



postsRouter.post("/", requireUser, async (req, res, next)=>{
  try{
    const newPost = await prisma.post.create({
      data: {
        title: req.body.title,
        content: req.body.content,
        userid: req.user.id

      }
      
    })
    res.send(newPost);

  }catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
})

postsRouter.put("/:id", requireUser, async(req, res, next)=>{
try {
  const updatePost = await prisma.post.update({
    where:{
      id: parseInt(req.params.id)
    },
    data:{
      title: req.body.title,
      content: req.body.content,
    }
  })
res.send(updatePost)
}
catch(error){
  console.log(error)

}


})
postsRouter.delete("/:id", requireUser, async (req, res, next)=>{
try{
  const deletePost = await prisma.post.delete({
    where:{
      id: parseInt(req.params.id)
    }
  })
  res.send(deletePost)
}catch(error){
  console.log(error)
}

})



module.exports = postsRouter;