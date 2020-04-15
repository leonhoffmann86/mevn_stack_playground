var User = require("../models/User");
module.exports.controller = (app) => {
  // get all users
  app.get("/users", (req, res) => {
    User.find({}, "name email", function (error, users) {
      if (error) {
        console.log(error);
      }
      res.send(users);
    });
  });

  //get a single user details
  app.get("/users/:id", (req, res) => {
    User.findById(req.params.id, "name email", function (error, user) {
      if (error) {
        console.log(error);
      }
      res.send(user);
    });
  });

  // add a new user
  app.post("/users", (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
    });
    user.save(function (error, user) {
      if (error) {
        console.log(error);
      }
      res.send(user);
    });
  });

  // update a user
  app.put("/users/:id", (req, res) => {
    User.findById(req.params.id, "name email", function (error, user) {
      if (error) {
        console.error(error);
      }
      user.name = req.body.name;
      user.email = req.body.email;
      user.save(function (error, user) {
        if (error) {
          console.log(error);
        }
        res.send(user);
      });
    });
  });

  // delete a user
  app.delete("/users/:id", (req, res) => {
    User.remove(
      {
        _id: req.params.id,
      },
      function (error, user) {
        if (error) {
          console.error(error);
        }
        res.send({ success: true });
      }
    );
  });
};
