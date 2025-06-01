const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const FortyTwoStrategy = require('passport-42').Strategy;
const dotenv = require('dotenv');

const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const User = require('./models/User');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FortyTwoStrategy({
    clientID: process.env.FORTYTWO_APP_ID,
    clientSecret: process.env.FORTYTWO_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/42/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    try {
      let user = await User.findOne({ fortyTwoId: profile.id });
      
      if (!user) {
        user = await User.create({
          fortyTwoId: profile.id,
          username: profile.username,
          email: profile.emails[0].value,
          avatar: profile._json.image.link
        });
      }
      
      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Routes
app.use('/api/users', usersRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});