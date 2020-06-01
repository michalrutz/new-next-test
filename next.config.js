const withSass = require("@zeit/next-sass");
module.exports = withSass({
  env: {
    ROOT: __dirname,
    DATABASE:
      "mongodb+srv://Michal:<password>@cluster0-vxluw.mongodb.net/test?retryWrites=true&w=majority",
    DATABASE_PASSWORD: "uZxBDQ6rTygAGBkZ",
    STRIPE_SECRET_KEY: "sk_test_zKe3DQZB9XmgD0CVZx8lE30O00GmZqGcaK",
    STRIPE_PUBLISHABLE_KEY: "pk_test_6GCyEv03yWinorBzeSbSOQdd00QbRDOSFR",
    JWT_SECRET: "moj_maly_secret",
    CLOUDINARY_URL: "https://api.cloudinary.com/v1_1/dk5zucmo3/image/upload",
  },
});
