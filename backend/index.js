const express = require("express");
require("./db/config");


const cors = require("cors");
const User = require("./model/User");
const Product = require("./model/Product");
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.json());

// ======================
// Register API
// ======================

app.post("/register", async (req, res) => {
  try {
    let user = new User(req.body);
    let result = await user.save();

console.log("Saved user:", result);

    result = result.toObject(); //converts mongoose document to normal JS object
    delete result.password; //removes the password from that object.

    res.status(201).send(result);
  } catch (err) {
    
    if (err.code === 11000) {
      return res.status(400).send({
     
        success: false,
        message: "Email already exists.",
      });
    }
    res.status(500).send({
    
      success: false,
      message: "Something went wrong.",
      error: err.message,
    });
  }
});

// ======================
// Login API
// ======================


app.post("/login", async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({
        success: false,
        message: "Email and password are required",
      });
    }

    let user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    }).select("-password");//return the user, but exclude the password field.

    if (user) {
      res.status(200).send({
        success: true,
        user,
      });
    } else {
      res.status(401).send({
        success: false,
        message: "Invalid email or password.",
      });
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Something went wrong.",
      error: err.message,
    });
  }
});


// ======================
// Add Product API
// ======================

app.post("/add-product", async (req, res) => {
    try {
        let product = new Product(req.body);

        let result = await product.save();

        res.status(201).send({
            success: true,
            product: result
        });

    } catch (err) {
        res.status(500).send({
            success: false,
            message: "Unable to add product.",
            error: err.message
        });
    }
});

// ======================
// Get Product API
// ======================

app.get('/products', async(req,res)=>{
    try{
        const products= await Product.find();
        res.status(200).send({
            success:true,
            products
        });

    }catch(err){
        res.status(500).send({
            succes:false,
            message:"Unabel to fetch products.",
            error:err.message,
        })
    }
});

// ======================
// Delete API
// ======================

app.delete('/product/:id', async(req,res)=>{
  try{

    const result = await Product.deleteOne({//deleteOne() -> It returns information about the operation.
      _id: req.params.id
    });

    if(result.deletedCount === 0){
      return res.status(404).send({
        success:false,
        message:"Product not found."
      });
    }


    res.status(200).send({
      success:true,
      message:"Product deleted successfully."
    });

  }catch(err){

    res.status(500).send({
      success:false,
      meesage:"Unable to delete product.",
      error : err.message
    })

  }
})

// ======================
// Update Product API
// ======================

app.put('/products/:id', async (req,res)=>{
  try{
    const result = await Product.updateOne(
      {_id:req.params.id},
      req.body
    );

    if(result.matchedCount === 0){
      return res.status(404).send({
        success:false,
        message:"Product not found."
      });
    }

    res.status(200).send({
      success:true,
      message:"Product updated Sucessfully."
    });

  }catch(err){

    res.status(500).send({
      success:false,
      message:"Unable to update product.",
      error:err.message
    });

  }
});

// ======================
// Get Single Product API
// ======================
 
app.get('/products/:id',async(req,res)=>{
  try{

    const product = await Product.findOne({
      _id:req.params.id
    });

    if(!product){
      return res.status(404).send({
        success:false,
        message:"Product not found."
      });
    }


    res.status(200).send({
      success:true,
      product
    });

  }catch(err){

    res.status(500).send({
      success:false,
      message:"Unable to fetch product.",
      error:err.message
    });

  }

})


// ======================
// Search API
// ======================

app.get('/search/:key', async (req,res)=>{
  try{
    const result = await Product.find({
      $or: [
        {name :{ $regex : req.params.key, $options:"i"}},
        {category :{ $regex : req.params.key, $options:"i"}},
        {company :{ $regex : req.params.key, $options:"i"}},

      ]
    });
    res.status(200).send({
      success:true,
      products:result
    });

  }catch(err){
            res.status(500).send({
            success: false,
            message: "Unable to search products.",
            error: err.message
        });

  }
})

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
