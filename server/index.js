const express = require("express");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const { authenticate } = require("./Middlewares/Authentication");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("connected to database");
});

// Use a specific origin — do NOT include "*" with others
const allowedOrigin = "http://localhost:5174"; // your frontend port

app.use(
  cors({
    origin: allowedOrigin,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true, // only needed if you're sending cookies or headers
  })
);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json());

app.use("/auth", require("./router/Auth"));
app.use(authenticate);
app.use("/project", require("./router/Project"));
app.use("/episode", require("./router/Episode"));
app.use("/user", require("./router/User"));

app.listen(port, () => {
  console.log(`server started listening to ${port} port`);
});
