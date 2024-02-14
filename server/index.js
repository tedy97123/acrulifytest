import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

// Import routes 
import userRoutes from './routes/users.js';
import descriptionRoutes from "./routes/description.js";

/* CONFIGURATIONS */
require('dotenv').config();
const app = express();
const { auth } = require('express-openid-connect');
const config = {
    authRequired: false,
    auth0Logout: true,
    secret:'',
    baseURL:'',
    clientId:'',
    issuerBaseURL:'',
};

// Use Helmet for general security headers
app.use(helmet()); 

// Enable CORS for local development
app.use(cors());

// Request logging
app.use(morgan("common"));

// Parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(auth(config));
// Mount routes
app.use('/users', userRoutes); // User routes

// Mount other routes 
app.use("/description", descriptionRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL; // Use environment variable for MongoDB URL

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
