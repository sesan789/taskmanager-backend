const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//  routes
const routes = require("./app/routes/route");

const app = express();

const port = process.env.PORT || 3001;
const mongodbUrl = process.env.MONGODB_URL;

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());

app.use(routes);

// mongoose configuration
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(port, () => {
      console.log(`server listening on port ${port}`);
    });
  })
  .catch((err) =>
    console.error(`Error in connection to MongoDB: ${err.message}`)
  );
