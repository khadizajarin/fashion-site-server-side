const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    // await client.connect();

    const productCollection = client.db('productsDB').collection('products')

    
    const cartCollection = client.db('cartDB').collection('cart')

    //CRUD operations on My cart product

    app.post('/cart', async(req,res) => {
      const newCart = req.body;
      console.log(newCart);
      const result = await cartCollection.insertOne(newCart);
      res.send(result);
    }) 

    app.get('/cart', async(req,res) => {
      const cursor = cartCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.delete('/cart/:id', async (req,res) => {
      const id = req.params.id;
      const query = {_id : new ObjectId(id)}
      const result = await cartCollection.deleteOne(query);
      res.send(result);
    })




// CRUD Operations on Add and update product
  


    app.get('/addProduct', async(req, res) => {
      const cursor = productCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/addProduct/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id : new ObjectId(id)}
      const result = await productCollection.findOne(query);
      res.send(result);
    })



    app.post ('/addProduct', async(req, res) => {
        const newProduct = req.body;
        console.log(newProduct);
        const result = await productCollection.insertOne(newProduct);
        res.send(result);
    })


    app.put('/addProduct/:id', async(req, res) =>{
      const id = req.params.id;
      const filter = { _id : new ObjectId(id)}
      const options = {upsert:true};
      const updatedProduct = req.body;
      const product = {
        $set : {
          productName : updatedProduct.productName ,
          brand : updatedProduct.brand, 
          type : updatedProduct.type, 
          price : updatedProduct.price, 
          description : updatedProduct.description, 
          rating : updatedProduct.rating, 
          photo : updatedProduct.photo
        }
      }
      const result = await productCollection.updateOne(filter, product, options )
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