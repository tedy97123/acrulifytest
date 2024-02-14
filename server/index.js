import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import session from 'express-session'; // Added for session handling
import passport from 'passport'; // Added for Passport

// Import routes 
import userRoutes from './routes/users.js';
import descriptionRoutes from "./routes/description.js";
import { oauthRouter } from './routes/okta.js'; // Renamed import for OAuth 2.0
 
/* CONFIGURATIONS */
dotenv.config();
const app = express();

// Use Helmet for general security headers
app.use(helmet()); 

// Enable CORS for local development
app.use(cors());

// Request logging
app.use(morgan("common"));

// Parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session setup
app.use(session({ secret: '1234', resave: true, saveUninitialized: true }));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Mount routes
app.use('/', oauthRouter); // OAuth 2.0 routes
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
