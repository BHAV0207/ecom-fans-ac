const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const ApprovedEmail = require("../models/ApprovedEmail");

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/auth/google/callback"
},
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;

      const approved = await ApprovedEmail.findOne({ email });
      if (!approved) return done(null, false);

      let user = await User.findOne({ email });
      if (!user) {
        user = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email,
          photo: profile.photos[0].value,
          role: approved.role
        });
      }

      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
