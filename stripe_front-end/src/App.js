import { useState } from 'react';
import logo from "./logo.svg";
import './App.css';
import  StripeCheckout from "react-stripe-checkout";

// window.Stripe.setPublishableKey("pk_test_51J4ALCSGc5AGfM0B5dMP1YSZkRKPSsZNS19xVVHPmQRdjBUwGjzkhL6wKsaXYXUA5K0uAmUiI0TVZM3CRAFmKgJr00OVZp5Y5k");
function App() {

  const [product, setProduct] = useState({
    name:" React from Cloudversity",
    price: 10,
    productBy: "Akshay"
  });
  console.log("Stripe Key: ", process.env.REACT_APP_KEY)
  const paymentToken = (token) => {
    const body = {
      token, product
    }
    const headers = {
      "Content-Type":"application/json"
    }

    return fetch("http://localhost:7777/payment", {
    method: "POST",
    headers,
    body: JSON.stringify(body)
    }).then(res => {
      console.log("Response: ",res)
      const {status} = res;
      console.log("Status: ", status)
    }).catch(err => {
      console.log(err);
    })

  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <StripeCheckout 
        stripeKey={process.env.REACT_APP_KEY}
        token={paymentToken}
        name="Cloudversity Payments"
        amount={product.price * 100}
        shippingAddress
        billingAddress
        > 
        <button className="btn-large lightgreen">Proceed to Pay at ${product.price}</button>
        </StripeCheckout>

      </header>
    </div>
  );
}

export default App;
