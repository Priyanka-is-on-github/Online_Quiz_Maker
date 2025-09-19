const express = require("express");
const app = express();
const cors = require("cors");

const router = require("./routes/auth-routes");




const PORT = 2000;


// Middleware
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true})); 

//routes


app.use("/api/v1/", router);




app.listen(PORT, () => {
  console.log("Server is running at port:", PORT);
});

