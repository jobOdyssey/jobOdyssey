
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import passport from 'passport'
import cookieParser from 'cookie-parser'
import cookieSession from 'cookie-session'
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'
import jobapplicationRouter from './routes/jobapplication.js'

import apollo from 'apollo-server-express';
import graphqlPassport from 'graphql-passport';
const { buildContext } = graphqlPassport;

console.log("apollo!!", apollo);

const { ApolloServer } = apollo
import { typeDefs } from './typeDefs.js';
import { resolvers } from './resolvers.js';


// Setting up environment variables
dotenv.config();

const __dirname = path.resolve(path.dirname(''));

// Express set up
const app = express();



// view engine setup
app.set('views', path.join(__dirname, 'server\\views'));
app.set('view engine', 'jade')

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days (in milliseconds)
    keys: [process.env.COOKIE_KEY], // special cookie key
  }),
);

// Initialize passprt
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// make static resources like the css available
app.use(express.static(path.join(__dirname, 'public')));

// register routes
app.use('/', authRouter);

app.use('/api/user', userRouter);

app.use('/api/jobapplication', jobapplicationRouter);

userRouter


// GraphQL endpoint

// Apollo Server setup
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,  
  context: ({ req, res }) => buildContext({ req, res })
});


// GraphQL listener
apolloServer.applyMiddleware({ app, cors: false });

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    console.log('error: ',err);
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

// Express listener
app.listen(
  process.env.PORT,
  console.log(`Server is in ${process.env.NODE_ENV} mode, ready at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`)
);

