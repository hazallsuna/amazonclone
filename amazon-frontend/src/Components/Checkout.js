import React from "react";
import { useStateValue } from "../StateProvider";
import styled from "styled-components";
import Navbar from "./Navbar";
import { getBasketTotal } from "../reducer";
import { useNavigate } from "react-router-dom";
import CurrencyInput from 'react-currency-input-field';
import axios from "axios";


function Checkout() {
  const [{ basket }, dispatch] = useStateValue();
  const navigate = useNavigate()
  const removeFromBasket = async (e, id) => {
    e.preventDefault();

    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
    try {
      console.log(`Attempting to delete item with id: ${id}`);
      const response = await axios.delete(`http://localhost:8000/cart/remove/${id}`);

      console.log('Response:', response.data);
    } catch (error) {
      console.log('Error:', error);
    }

  };
  console.log("checkout >>>>>", basket);

  

  return (
    <Container>
      <Navbar />
      <Main>
        <ShoppingCart>
          <h2>Alışveriş Sepeti</h2>

          {basket?.map((product) => (
            <Product key={product.id}>
              <Image>
                <img src={product.image} alt="" />
              </Image>
              <Description>
                <h4>{product.title}</h4>
                <p>{product.price} ₺</p>
                <button onClick={(e) => removeFromBasket(e, product.id)}
                >Sil</button>
              </Description>
            </Product>
          ))}


        </ShoppingCart>
        <Subtotal>
          <CurrencyInput
            renderText={(value) => (
              <>
                <p>
                  Ara Toplam ( {basket.length} items ) : <strong> {value}</strong>
                </p>
                <small>
                  <input type="checkbox" />
                  <span>Bu sipariş hediye içerir</span>
                </small>
              </>
            )}
            decimalScale={2}
            value={getBasketTotal(basket)}
            displayType="text"
            thousandSeparator={true}
            prefix={"₺"}
          />

          <button onClick={() => navigate("/address")}>
            Alışverişi Tamamla
          </button>
        </Subtotal>



      </Main>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  height: fit-content;
  margin: auto;
  background-color: rgb(234, 237, 237);
  border: 1px solid red;
  position: relative;

`;
const Main = styled.div`
  display: flex;
  padding: 15px;

  @media only screen and (max-width: 1200px) {
    flex-direction: column;
  }
`;
const ShoppingCart = styled.div`
  padding: 15px;
  background-color: #fff;
  flex: 0.7;

  @media only screen and (max-width: 1200px) {
    flex: none;
  }

  h2 {
    font-weight: 500;
    border-bottom: 1px solid lightgray;
    padding-bottom: 15px;
  }
`;
const Subtotal = styled.div`
  flex: 0.3;
  background-color: #fff;
  margin-left: 15px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 1200px) {
    flex: none;
    margin-top: 20px;
  }
  p {
    font-size: 20px;
  }

  small {
    display: flex;
    align-items: center;
    margin-top: 10px;

    span {
      margin-left: 10px;
    }
  }

  button {
    width: 65%;
    height: 33px;
    margin-top: 20px;
    background-color: #ffd814;
    border:  1px solid transparent;
    outline: none;
    transition: border-color 0.3s ease;
    border-radius: 8px;
  }
  button:hover {
    border-color: #000; 
  }
`;

const Product = styled.div`
  display: flex;
  align-items: center;
  width:20%;
  heigth:20%;

`;
const Image = styled.div`
flex: 0.3;
img {
  width: 100%;
  max-height: 100%;
  height:auto;
  display:block;
}
`;
const Description = styled.div`
flex: 0.7;
padding-left: 20px;

h4 {
  font-weight: 600;
  font-size: 18px;
}

p {
  font-weight: 600;
  margin-top: 20px;
}

button {
  background-color: transparent;
  color: #1384b4;
  border: none;
  outline: none;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
`;
export default Checkout;