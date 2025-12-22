import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from "cors";
import bookRoute from "./route/book.route.js"
import userRoute from "./route/user.route.js"
import contactRoute from "./route/contact.route.js";  


const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

// Connect to MongoDB
mongoose.connect(URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("MongoDB Error:", error));

// defining routes
app.use("/book",bookRoute);
app.use("/user", userRoute);
app.use("/contact", contactRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});