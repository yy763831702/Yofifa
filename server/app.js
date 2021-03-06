if (process.env.NODE_ENV !== 'production') {
  	require('dotenv').config();
}
const express = require('express');
const cors = require('cors');
const app = express();
const configRoutes = require("./routes");

app.use(cors());
app.use(express.json());

configRoutes(app);

app.listen(3008, () => {
  	console.log("We've now got a server!");
  	console.log("Your routes will be running on http://localhost:3008");
});
