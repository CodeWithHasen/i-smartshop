var express = require("express");
var cors = require("cors");
var { MongoClient } = require("mongodb");

var connectionString = "mongodb://127.0.0.1:27017";

var app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToMongo() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("MongoDB connection failed:", err);
    }
}

connectToMongo();

app.get("/getusers", async (req, res) => {
    try {
        const database = client.db("reactdb");
        const usersCollection = database.collection("tblusers");
        const users = await usersCollection.find({}).toArray();
        res.send(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).send({ error: "Error fetching users" });
    }
});

app.post("/registeruser", async (req, res) => {
    try {
        const userdetails = {
            UserId: req.body.UserId,
            UserName: req.body.UserName,
            Password: req.body.Password,
            Age: parseInt(req.body.Age),
            Mobile: req.body.Mobile,
            Subscribed: req.body.Subscribed === "true"
        };

        const database = client.db("reactdb");
        const usersCollection = database.collection("tblusers");

        await usersCollection.insertOne(userdetails);
        console.log("Record Inserted");
        res.send({ message: "Registered Successfully" });
    } catch (err) {
        console.error("Error inserting user:", err);
        res.status(500).send({ error: "Error inserting user" });
    }
});

app.get("/getproducts", async (req, res) => {
    try {
        const database = client.db("reactdb");
        const products = await database.collection("tblproducts").find({}).toArray();
        res.send(products);
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).send({ error: "Error fetching products" });
    }
});

app.get("/getcategories", async (req, res) => {
    try {
        const database = client.db("reactdb");
        const categories = await database.collection("tblcategories").find({}).toArray();
        res.send(categories);
    } catch (err) {
        console.error("Error fetching categories:", err);
        res.status(500).send({ error: "Error fetching categories" });
    }
});

app.get("/getproduct/:id", async (req, res) => {
    try {
        let productId = parseInt(req.params.id);
        const database = client.db("reactdb");
        const product = await database.collection("tblproducts").findOne({ id: productId });
        res.send(product ? [product] : []);
    } catch (err) {
        console.error("Error fetching product:", err);
        res.status(500).send({ error: "Error fetching product" });
    }
});

app.listen(4040, () => {
    console.log("Server Started : http://127.0.0.1:4040");
});
