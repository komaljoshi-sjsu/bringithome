const conn2 = require("./config/mongo_connection");
const express = require("express");
const app = express();
const session = require("express-session");
var cors = require("cors");
app.use(cors());

// Connect to MongoDB
conn2();

// Init Middleware
app.use(express.json({ extended: false }));

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

//Define all the models

// require('./models/Freelancer')
// require('./models/Customer')

// //Define all the routes
app.use(require("./routes/loginRoute"));
app.use(require("./routes/signupRoute"));
app.use(require("./routes/customerHome"));
app.use(require("./routes/myServiceDetails"));
app.use(require("./routes/reviews"));

//Freelancer
app.use(require("./routes/getPostedService"));
app.use(require("./routes/postNewService"));
app.use(require("./routes/getFreelancerDetails"));
app.use(require("./routes/postFreelancerDetails"));
app.use(require("./routes/editFreelancerDetails"));
app.use(require("./routes/getApplicantsName"));
app.use(require("./routes/updateJobSeekerStatus"));
app.use(require("./routes/employerAnalytics"));

app.use(require("./routes/messageRoute"));
app.use(require("./routes/conversationRoute"));
app.use(require("./routes/employerFeaturedReviews"));

const PORT = process.env.PORT || 8000;
//Server code will be running on port 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
