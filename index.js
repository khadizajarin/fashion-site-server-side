const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

//middleware 
app.use(cors());
app.use(express.json())



const uri = "mongodb+srv://fashionApparel:SpAToBTeMDWy4ozl@cluster0.lzj0eku.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const productCollection = client.db('productsDB').collection('products')


    const brandCollection =client.db('productsDB').collection('brands')


    //brands collection

    app.get('/nike', async(req, res) => {
        const cursor = nikeCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })



    //add products collection

    app.get('/', async(req, res) => {
        const cursor = productCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    app.post ('/addProduct', async(req, res) => {
        const newProduct = req.body;
        console.log(newProduct);
        const result = await productCollection.insertOne(newProduct);
        res.send(result);
    })







    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req,res) => {
    res.send ("fashion server is running")
})

app.listen (port, ()=> {
    console.log (`fashion is running on port  ${port}`)
})