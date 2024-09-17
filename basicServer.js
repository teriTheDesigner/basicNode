const { createServer } = require("http");
const { MongoClient, ServerApiVersion } = require("mongodb");

const hostname = "127.0.0.1";
const port = 3000;

//Set up a connection to MongoDB

const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const server = createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  // connect to MongoDB

  if (req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      console.log("body", body);
      const parsedBody = JSON.parse(body);
      createMessage(parsedBody).catch(console.dir);

      // run(parsedBody).then((result) => {
      //   console.log("result", result);
      // });
    });
  } else if (req.method === "GET") {
    getAllMessages()
      .then((documents) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(documents));
      })
      .catch((error) => {
        console.error(error);
        res.statusCode = 500;
        res.end("Error fetching data");
      });
  }

  res.statusCode = 201;
  res.setHeader("Content-Type", "text/plain");
  // res.end("Hello World");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

async function createMessage(parsedBody) {
  try {
    // Connect the client to the server
    await client.connect();
    const myDB = client.db("myDB");
    const myColl = myDB.collection("pizzaMenu");

    const result = await myColl.insertOne(parsedBody);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    console.log("result object", result);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function getAllMessages() {
  try {
    await client.connect();
    const myDB = client.db("myDB");
    const myColl = myDB.collection("pizzaMenu");

    const documents = await myColl.find({}).toArray();
    return documents;
  } finally {
    await client.close();
  }
}
