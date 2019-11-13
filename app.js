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
  db = process.env.DATABASE_URL
    ? (knex({
        client: "pg",
        connection: {
          connectionString: process.env.DATABASE_URL,
          ssl: true
        }
      }),
      // HTTPS ENFORCER
      app.enable("trust proxy"),
      app.use(express_enforces_ssl()),
      console.log(process.env.DATABASE_URL))
    : "";

app.use((req, res, next) => {
  let now = new Date().toString(),
    log = `${now}: ${req.method} ${req.url}`;

  fs.appendFile("app.log", `${log} \n`, err =>
    err ? console.log("Unable to log to file") : ""
  );

  next();
});
app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => res.sendFile(`${publicPath}/views/index.html`));

app.post("/signup", (req, res) =>
  db
    .select("email")
    .from("early_birds")
    .where("email", "=", req.body.email)
    .then(existing =>
      existing.length === 0
        ? register.handleRegister(req, res, db, mailgun, fs, publicPath)
        : res.json(`You have already signed up and been notified!`)
    )
);

app.listen(port, () => console.log(`App is live on port ${port}`));