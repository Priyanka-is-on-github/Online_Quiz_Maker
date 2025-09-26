const express = require("express");
const app = express();
const cors = require("cors");

const router = require("./routes/quiz-routes");




const PORT = 2000;
const corsOptions = {
  origin: ['https://online-quiz-maker-qunu.vercel.app'], // allowed origin(s)
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 204
};

// Middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // ensure preflight requests handled for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: true})); 

//routes
app.use("/api/v1/", router);




app.listen(PORT, () => {
  console.log("Server is running at port:", PORT);
});

