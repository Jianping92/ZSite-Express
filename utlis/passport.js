const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { secretOrKey } = require("../config/keys");
const UserModel = require("../models/model_user");
let options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = secretOrKey;

module.exports = passport => {
  passport.use(new JwtStrategy(options, async (jwt_payload, done) => {
    const user = await UserModel.findOne({ _id: jwt_payload.id, name: jwt_payload.name });
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  }))
}
