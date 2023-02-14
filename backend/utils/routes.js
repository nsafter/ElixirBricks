const express = require("express");
const router = express.Router();
const conn = require("../utils/conn");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const saltRounds = 10;

router.use(cookieParser());

router.use(
  session({
    key: "userid",
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expire: 60 * 30,
    },
  })
);

router.get("/api/getdata", (req, res) => {
  let sqlquery =
    "select sno,name,description,bedrooms, bathrooms, area, price,todo,uname from properties";
  conn.query(sqlquery, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

router.get("/api/getuserdata", (req, res) => {
  let sqlquery = "select uname,email from users";
  conn.query(sqlquery, (err, results) => {
    if (err) throw err;
    let result = JSON.parse(JSON.stringify(results));
    res.send(result);
  });
});

router.get("/api/filterdata", (req, res) => {
  const bedrooms = parseInt(req.query.bedroom);
  const bathrooms = parseInt(req.query.bathroom);
  const area = parseInt(req.query.area);
  const minprice = parseInt(req.query.minprice);
  const maxprice = parseInt(req.query.maxprice);
  const todo = req.query.todo;

  let sqlquery =
    "select * from properties where bedrooms = ? and bathrooms=? and (area > 0 and area <= ?) and (price >= ? and price <= ?) and todo=?;";

  conn.query(
    sqlquery,
    [bedrooms, bathrooms, area, minprice, maxprice, todo],
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
});

router.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({
      loggedIn: true,
      user: req.session.user,
    });
  } else {
    res.send({
      loggedIn: false,
    });
  }
});

router.get("/logout", (req, res) => {
  if (req.session.user) {
    req.session.destroy();
    res.clearCookie("userid");
    res.send({ message: "successful logout" });
  }
});

router.post("/register", (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) console.log(err);

    let sqlquery = "INSERT into users(uname,passwd,email) values(?,?,?)";

    conn.query(sqlquery, [username, hash, email], (err, results) => {
      console.log(err);
    });
  });
});

router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  let sqlquery = "select * from users where uname=?";

  console.log(username, password);

  conn.query(sqlquery, [username], (err, result) => {
    if (err) {
      res.send({ err: err });
    }

    console.log(result);

    if (result.length > 0) {
      bcrypt.compare(password, result[0].passwd, (error, response) => {
        if (response) {
          req.session.user = result;
          res.send(result);
        } else {
          res.send({ message: "wrong username and password!!!" });
        }
      });
    } else {
      res.send({ message: "user does not exist" });
    }
  });
});

router.post("/addproperty", (req, res) => {
  const name = req.body.property.name;
  const description = req.body.property.description;
  const bedroom = parseInt(req.body.property.bedrooms);
  const bathroom = parseInt(req.body.property.bathrooms);
  const area = parseInt(req.body.property.area);
  const price = parseInt(req.body.property.price);
  const uname = req.body.user;
  const todo = req.body.property.todo;

  let sqlquery =
    "INSERT into properties(name,description,bedrooms,bathrooms,area,price,uname,todo) values(?,?,?,?,?,?,?,?)";

  conn.query(
    sqlquery,
    [name, description, bedroom, bathroom, area, price, uname, todo],
    (err, results) => {
      if (err) console.log(err);
    }
  );
});

router.delete("/propdel/:id", (req, res) => {
  let id = req.params.id;
  let sqlquery = "delete from properties where sno = ?";
  conn.query(sqlquery, id, (err, result) => {
    if (err) console.log(err);
  });
});

module.exports = router;
