import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home";
import Checkout from "./Components/Checkout";
import Address from "./Components/Address";
import Payment from "./Components/Payment";
import Card from "./Components/Card";
import {Elements} from "@stripe/react-stripe-js";





function App() {

  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/giris" element={<Login />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/kayıt" element={<SignUp />} />
          <Route path="/address" element={<Address />} />
          <Route
            path="/payment"
            element={
                <Payment />
            }
          /> 
          <Route path="/cart/add" element={<Card />} />
          {/* <Route path="/product/details/:id" element={<Card />} /> */}
           </Routes>
       
      </Container>
    </Router>
  );
}

const Container = styled.div`
width: 100vw;
height: 100vh;
overflow-y: scroll;
&::-webkit-scrollbar {
  display: none;
}
  
`;
export default App;
