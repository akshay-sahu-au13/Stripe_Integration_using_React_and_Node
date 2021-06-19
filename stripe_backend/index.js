const express = require("express");
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 7777;
const app = express();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
//  TODO: add a stripe key
const { v4: uuidv4 } = require("uuid");


//Middlewares
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send(`<h1 style="color: #635BFF"><center>Welcome to Stripe tutorial using react and Node js</center></h1>`);
});

app.post("/payment", (req, res) => {
    try {

        const {product, token} = req.body;
        console.log("PRODUCT: ", product);
        console.log("PRICE: ", product.price);
        const idempotencyKey = uuid();

        return stripe.customers.create({
            email: token.email,
            sourse: token.id
        }).then(customer => {
            stripe.charges.create({}, {idempotencyKey});
        }).then(result => res.status(200).send(result))
        .catch(err => console.log(err))
        
    } catch (error) {
        console.log("error occured: ", error);
        res.send({message: "Error while processing the payment", error: error.message});
    }
});


app.listen(PORT, ()=> {
    console.log(`Listening to http://localhost:${PORT}`);
});