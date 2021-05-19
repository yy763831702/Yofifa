if (process.env.NODE_ENV !== 'production') {
  	require('dotenv').config();
}
const express = require('express');
const cors = require('cors');
const app = express();
const configRoutes = require("./routes");

app.use(cors());
app.use(express.json());

const path = require('path');
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

configRoutes(app);

app.listen(process.env.PORT || 3008, () => {
  	console.log("We've now got a server!");
  	console.log("Your routes will be running on http://localhost:3008");
});
