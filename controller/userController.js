const bcrypt = require("bcrypt");
const { MongoClient, ObjectId } = require("mongodb");
const client = new MongoClient(
  "mongodb+srv://tsolmn9:Taffyyy12@test.1s5hd.mongodb.net/?retryWrites=true&w=majority&appName=TEST"
);

let db;
const connectToDB = () => {
  try {
    client.connect();
    db = client.db("sample_mflix");
  } catch (error) {
    console.log(error);
  }
};
connectToDB();

const signupUser = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    const response = await db.collection("users").insertOne({
      name,
      email,
      password,
    });
    res.send(response);
  } catch (err) {
    res.send("failed to create user");
  }
};

const loginUser = (req, res) => {
  res.send("login successful");
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    await db.collection("users").deleteOne({ _id: new ObjectId(id) });
    res.send("done");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const hashedPasswordMiddleWare = async (req, res, next) => {
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    next();
  } else {
    res.send("nothing password");
  }
};
const checkId = (req, res, next) => {
  if (req.body.id) {
    next();
  } else {
    res.send("id alga");
  }
};
const checkLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const response = await db.collection("users").findOne({ email });
  const hashedPassword = response.password;
  const isValidPassword = await bcrypt.compare(password, hashedPassword);
  if (isValidPassword) {
    next();
  } else {
    res.send("email or password is incorrect");
  }
};

module.exports.signupUser = signupUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;
module.exports.hashedPasswordMiddleWare = hashedPasswordMiddleWare;
module.exports.checkLogin = checkLogin;
module.exports.checkId = checkId;
