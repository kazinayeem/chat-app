const userModel = require("../model/userModel");

const jwt = require("jsonwebtoken");

const getAlluser = (req, res) => {
  userModel.find({}, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.send(data);
    }
  });
};

const resgisterUser = async (req, res) => {
 
  const newuser = new userModel({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const isCheck = await userModel.find({ email: req.body.email });

    if (isCheck.length > 0) {
      res.send("user alery exit");
    } else {
      await newuser.save();
      console.log("data insert ");
      res.send(newuser);
    }
  } catch (error) {
    console.log("error", error);
  }
};

const loginUsera = async (req, res) => {
  try {
    const user = await userModel.find({ email: req.body.email });

    if (user.length > 0) {
      const { password, email, _id } = user[0];

      const checkpassword = await bcrypt.compare(req.body.password, password);

      if (checkpassword) {
        const token = jwt.sign(
          { email: email, id: _id },
          process.env.SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );
        res.status(200).json({
          token: token,
        });
      } else {
        res.status(201).json({
          messege: "password not match",
        });
      }
    } else {
      res.status(500).json({
        messege: "user not found",
      });
    }
  } catch (error) {
    console.log("error");
  }
};

module.exports = { getAlluser, resgisterUser, loginUsera };
