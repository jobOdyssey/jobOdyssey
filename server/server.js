import express from 'express';
import dotenv from 'dotenv';

// Express set up
const app = express();

// Setting up environment variables
dotenv.config();

// GraphQL endpoint


// Listener
app.listen(process.env.PORT, console.log(`Server is in ${process.env.NODE_ENV} mode, listening on port ${process.env.PORT}`));