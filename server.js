const fs = require("fs"),
  express = require("express"),
  express_enforces_ssl = require("express-enforces-ssl"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  knex = require("knex"),
  mailgun = require("mailgun-js"),
  register = require("./controllers/register"),
  publicPath = __dirname + `/public`,
  port = process.env.PORT || 3000;

const app = express(),
  db = knex({
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true
    }
  });

// HTTPS ENFORCER
//app.enable("trust proxy");
//app.use(express_enforces_ssl());

app.use((req, res, next) => {
  let now = new Date().toString(),
    log = `${now}: ${req.method} ${req.url}`;

  fs.appendFile("server.log", `${log} \n`, err => {
    if (err) {
      console.log("Unable to log to file");
    }
  });

  next();
});
app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(`${publicPath}/views/index.html`);
});

app.post("/signup", (req, res) => {
  const { email } = req.body;

  db.select("email")
    .from("early_birds")
    .where("email", "=", email)
    .then(existing => {
      if (existing.length === 0) {
        register.handleRegister(req, res, db, mailgun, fs, publicPath);
      } else {
        res.json(`You have already signed up and been notified!`);
      }
    });
});

app.listen(port, () => {
  console.log(`app's server is live on port ${port}`);
});
