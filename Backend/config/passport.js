const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");
const ApprovedEmail = require("../models/approvedEmail");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://<your-backend-url>.onrender.com/api/auth/google/callback"
,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const approved = await ApprovedEmail.findOne({ email });

        // Check if the email is approved
        if (!approved) {
          // If the email is not approved, create the user with a default role
          let user = await User.findOne({ email });
          if (!user) {
            user = await User.create({
              googleId: profile.id,
              name: profile.displayName,
              email,
              photo: profile.photos[0].value,
              role: "user", // Assign 'user' role by default for unapproved emails
            });
          }
          return done(null, user);
        }

        // If the email is approved, proceed as before
        let user = await User.findOne({ email });
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email,
            photo: profile.photos[0].value,
            role: approved.role, // Use the approved role
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

module.exports = passport;
