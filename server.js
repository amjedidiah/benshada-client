const fs = require('fs'),
      express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      knex = require('knex'),
      register = require('./controllers/register'),
      publicPath = __dirname+`/public`,
      port = 3000 || process.env.PORT



const app = express(),
      db = knex({
        client: 'pg',
        connection: {
          host: '127.0.0.1',
          port: '5433',
          user: 'postgres',
          password: '&3:8:8-$6048',
          database: 'benshada'
        }
      })


app.use((req, res, next) => {

  let now = new Date().toString(),
      log = `${now}: ${req.method} ${req.url}`

  fs.appendFile('server.log', `${log} \n`, err => {
    if(err) {
      console.log('Unable to log to file')
    }
  })

  next()
})
app.use(express.static(publicPath))
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.sendFile(`${publicPath}/views/index.html`)
})

app.post('/signup', (req, res) => {
  const {email} = req.body

  db.select('email')
    .from('early_birds')
    .where('email', '=', email)
    .then(existing => {
      if(existing.length === 0) {
        register.handleRegister(req, res, db)
      } else {
      res.json(`You have already subscribed!`)
      }
    })

})

app.listen(port, () => {
  console.log(`app's server is live on port ${port}`)
})
