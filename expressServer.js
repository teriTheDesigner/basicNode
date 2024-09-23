const express = require("express");
const app = express();
var cors = require("cors");
const port = 3003;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/destinations", (req, res) => {
  // send back the created object or at least the new ID
  console.log(req.body);
  res.send("Got a POST request");
});

app.get("/destinations/:id", (req, res) => {
  console.log("params", req.params);
  res.send("Getting travel destinations");
});

app.put("/destinations/:id", (req, res) => {
  console.log(req.body);
  res.send("Got a PUT request at /destinations/id");
});

app.delete("/destinations/:id", (req, res) => {
  console.log("delete destination with this id", req.params.id);
  res.send("Got a DELETE request at /destinations");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
