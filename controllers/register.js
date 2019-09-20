const handleRegister = (req, res, db, mailgun, fs, publicPath) => {
  const {email} = req.body,
        validateEmail = (email) => {
          var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(String(email).toLowerCase());
        },
        DOMAIN = `mail.benshada.com`,
        mg = mailgun({
          apiKey: 'a249880fe489e273133831dc1f1cfb40-7bce17e5-6fec07d6',
          domain: DOMAIN
        }),
        html = fs.readFileSync(`${publicPath}/views/thanks.html`, `utf8`),
        data = {
        	from: 'Benshada Place <info@benshada.com>',
        	to: `imunacode@gmail.com, ${email}`,
        	subject: `Thank you for signing up to Benshada Place - what's next`,
        	html
        }

  if(email === '' ||  validateEmail(email) === false) {
    return res.status(400).json('A valid email address is required')
  } else {
    db('early_birds')
    .insert({email})
    .then(response => {
      mg.messages().send(data, function (error, body) {
      	res.json(`Thank you for signing up to Benshada Place!<br />You will be notified of our launch!`)
      })
    })
    .catch(err => {
      res.status(400).json(err.code, err.routine)
    })
  }
}

module.exports = {
  handleRegister
}
