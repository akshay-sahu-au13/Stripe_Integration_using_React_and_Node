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

        console.log(process.env.STRIPE_SECRET_KEY);
        const {product, token} = req.body;
        console.log("PRODUCT: ", product);
        console.log("PRICE: ", product.price);
    console.log("TOKEN: ", token);
        const idempontencyKey = uuidv4(); // to make sure we don't charge the user twice accidently or due to any error

        // stripe.charges.create({
        //     amount: product.price * 100,
        //     source: token.id,
        //     currency: 'usd',
        //     description: `purchase of ${product.name}`,
        //     // customer: customer.id,
        //     shipping: {
        //         name: token.card.name,
        //         address: {
        //             country: token.card.address_country
        //         }
        //     }
        // }).then(function () {
        //     console.log('Charge Successful')
        //     res.json({ message: 'Successfully purchased items' })
        // }).catch(function (err) {
        //     console.log('Charge Fail', err)
        //     res.status(500).end()
        // })

        return stripe.customers.create({
            email: token.email,
            source: token.id,
        }).then(customer => {
            stripe.charges.create({
                
                amount: product.price * 100,
                currency: "inr",
                customer: customer.id,
                receipt_email: token.email,
                description: `purchase of ${product.name}`,
                shipping: {
                    name: token.card.name,
                    address: {
                        line1: token.card.address_line1,
                        country: token.card.address_country
                    }
                }
            });
        }).then(result => res.status(200).send(result))
        .catch(err => console.log(err));
        
  
});


app.listen(PORT, ()=> {
    console.log(`Listening to http://localhost:${PORT}`);
});