import app from "./server.js"
import connectDB from "./config/db.config.js";

const PORT = process.env.PORT ?? 8888;

app.listen(PORT, (err) => {
  if (err) return console.log(err);
  connectDB();
  console.log(`Server running on port: ${PORT}`);
});  
