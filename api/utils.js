const requireUser = (req, res, next) => {
  if(req.user){
    next();
  }
  else{
    res.sendStatus(`you must be logged in to do this`,401);
  }
}

module.exports = {
  requireUser
}