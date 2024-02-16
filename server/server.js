import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import dotenv from 'dotenv';
import morgan from "morgan";
import { auth } from 'express-openid-connect';
// Import routes 
import userRoutes from './routes/users.js';
import descriptionRoutes from "./routes/description.js";
import loginRoutes from "./routes/login.js"
import lineItemRoutes from "./routes/lineitem.js"

  
/* CONFIGURATIONS */
dotenv.config();
const app = express();
// const config = {
//     authRequired: false,
//     auth0Logout: true,
//     secret:process.env.SECRET,
//     baseURL:process.env.BASEURL,
//     // clientId:process.env.CLIENT_ID,
//     issuerBaseURL:process.env.ISSUER_BASEURL,
// };

// Use Helmet for general security headers
app.use(helmet()); 

// Enable CORS for local development
const corsOptions = {
  origin: 'http://localhost:5173', // Allow only your frontend app domain
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));

// Request logging
app.use(morgan("common"));

// Parsing middleware
app.use(express.json());
// will be able to handle nested data coming in through the query string from the url
app.use(express.urlencoded({ extended: true }));
// app.use(auth(config));

// Mount routes
app.use('', loginRoutes); // User routes
app.use('/users', userRoutes); // User routes
app.use('/lineItem', lineItemRoutes); // User routes
app.use("/description", descriptionRoutes);
app.post('/dropDatabase', async function (req, res) {   
  await mongoose.connection.db.dropDatabase();
  res.send("deleted!")
})
/* MONGOOSE SETUP */
const PORT = process.env.PORT || 8000;
const MONGO_URL =  'mongodb+srv://tedyyohanes97:Peeman200@cluster1.vs1vunz.mongodb.net/?retryWrites=true&w=majority'; // Use environment variable for MongoDB URL
 
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("connected to DB"))
.catch((error) => console.log(`${error} did not connect`));

app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));

/* ERROR HANDLING MIDDLEWARE */
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});
