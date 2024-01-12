import env from "dotenv";

const dotenv = env.config();
const jwt_secret = process.env.JWT_SECRET;
console.log(jwt_secret);

const jwt_options = {
  secret: jwt_secret,
  algorithms: ["HS256"],
  audience: "http://localhost:8888/api",
};

export default jwt_options;
