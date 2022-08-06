const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Quiz = require("../Models/quizModel");
class UserController {
  /**
   * It takes in a request and a response, and then it checks if the request body contains a name, email,
   * and password. If it does, it checks if the email already exists in the database. If it doesn't, it
   * creates a new user with the name, email, and hashed password.
   * @param req - The request object represents the HTTP request and has properties for the request query
   * string, parameters, body, HTTP headers, and so on.
   * @param res - The response object.
   * @returns The user is being returned.
   */
  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      res.setHeader("Content-Type", "application/json");
      if (!name || !email || !password) {
        return res.status(400).send("Please enter all fields");
      } else {
        const user = await User.findOne({ email });
        if (user) {
          return res.status(400).json({ msg: "User already exists" });
        } else {
          const hashedPassword = await bcrypt.hash(password, 10);
          const newUser = new User({
            name,
            email,
            password: hashedPassword,
          });
          const savedUser = await newUser.save();
          res.status(201).json(savedUser);
        }
      }
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  }
  /**
   * It takes in the email and password from the request body, checks if the email and password are
   * present, if not, it returns a 400 status code with a message, if they are present, it checks if the
   * user exists, if not, it returns a 400 status code with a message, if the user exists, it checks if
   * the password is correct, if not, it returns a 400 status code with a message, if the password is
   * correct, it creates a token and returns a 200 status code with the token and user information.
   * @param req - request
   * @param res - the response object
   * @returns The token and the user's id, name, and email.
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).send("Please enter all fields");
      } else {
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ msg: "User does not exist" });
        } else {
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return res.status(400).json({ msg: "Invalid Credentials" });
          } else {
            const token = await user.generateAuthToken();
            res.status(200).json({
              token,
              user: { id: user._id, name: user.name, email: user.email },
            });
          }
        }
      }
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  }

  async validateToken(req, res) {
    try {
      const { token } = req.body;

      if (!token) {
        return res.status(400).json({ msg: "No token provided" });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { _id } = decoded;
      const user = await User.findById({ _id });
      if (!user) {
        return res.status(400).json({ msg: "User not found" });
      }
      res.status(200).json({ msg: "Token is valid", user });
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  }

  async addQuiz(req, res) {
    try {
      const { _id, category, difficulty, score } = req.body;
      if (!category || !difficulty || !score) {
        return res.status(400).send("Please enter all fields");
      }

      const user = await User.findById({ _id });

      if (!user) {
        return res.status(400).json({ msg: "User not found" });
      }
      const newQuiz = await new Quiz({
        user: _id,
        category,
        difficulty,
        score,
      }).save();

      res.status(201).json(newQuiz);
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  }

  async getQuizzes(req, res) {
    const { _id } = req.body;

    try {
      if (!_id) {
        return res.status(400).json({ msg: "Please enter all fields" });
      }
      const user = await User.findById({ _id });
      if (!user) {
        return res.status(400).json({ msg: "User not found" });
      }
      const quizzes = await Quiz.find({ user: _id }).sort({ date: -1 });
      return res.status(200).json(quizzes);
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  }
}
module.exports = new UserController();
