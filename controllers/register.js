const handleRegister = (req, res, db) => {
  const {email} = req.body,
        validateEmail = (email) => {
          var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(String(email).toLowerCase());
        }

  if(email === '' ||  validateEmail(email) === false) {
    return res.status(400).json('A valid email address is required')
  } else {
    db('early_birds')
    .insert({email})
    .then(response => {
      res.json(`Sign up successful!<br />You will be notified of our launch!`)
    })
    .catch(err => {
      res.status(400).json(err.code, err.routine)
    })
  }
}

module.exports = {
  handleRegister
}
