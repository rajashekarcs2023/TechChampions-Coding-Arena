const express = require("express");
const cors = require("cors");

const db = require("./database/dbConnection");
const userRoutes = require("./routes/userAuth");
const problemRoutes = require("./routes/problems");
const codeRoutes = require("./routes/code");
const submissionRoutes = require("./routes/submissions");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", userRoutes);
app.use("/", problemRoutes);
app.use("/", codeRoutes);
app.use("/", submissionRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server started...");
});
