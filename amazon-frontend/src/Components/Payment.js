import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import { useStateValue } from "../StateProvider";
import CurrencyInput from 'react-currency-input-field';
import { getBasketTotal } from "../reducer";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Address from "./Address";

function Payment() {

    const [{address, basket}] = useStateValue();

    const elements= useElements();
    const stripe= useStripe();
    

    return (
        <Container>
            <Navbar/>
            <Main>
                <ReviewContainer>
                    <h2>Sipariş Özeti</h2>
                    <AddressContainer>
                        <h5>Gönderi Adresi</h5>
                        <div>
                         <p>{address.fullName}</p>
                         <p>{address.flat}</p>
                         <p>{address.area}</p>
                         <p>{address.landmark}</p>
                         <p>
                         {address.city} {address.state}
                         </p>

                        <p>Telefon: {address.phone}</p>
                        </div>
                    </AddressContainer>
                    <PaymentContainer>
                    <h5>Ödeme Yöntemi</h5>
                    <div>
                      <p>Kredi kartı veya banka kartı ekleyin</p>
                      {/* Card Element */}

                      <CardElement/>
                    </div>
                    </PaymentContainer>
                    <OrderContainer>
                      <h5>Siparişiniz</h5>
                      <div>
                      {basket?.map((product) => (
                      <Product key={product.id}>
                      <Image>
                      <img src={product.image} alt="" />
                       </Image>
                      <Description>
                      <h4>{product.title}</h4>
                      <p>{product.price} ₺</p>
                      </Description>
                      </Product>
                      ))}
                      </div>
                    </OrderContainer>

                </ReviewContainer>
                <Subtotal>
                    <CurrencyInput
                        value={getBasketTotal(basket)}
                        decimalScale={2}
                        fixedDecimalLength={2}
                        displayType="text"
                        thousandSeparator={true}
                        prefix={"₺"}
                        readOnly
                    />
                    <p>
                        Ara Toplam ({basket.length} ürün): <strong>₺{getBasketTotal(basket).toFixed(2)}</strong>
                    </p>
                    <button>Sipariş Verin</button>
                </Subtotal>
            </Main>
        </Container>
        
    );
}
const Container = styled.div`
  width: 100%;

  max-width: 1400px;
  background-color: rgb(234, 237, 237);
`;

const Main = styled.div`
  padding: 15px;
  display: flex;

  @media only screen and (max-width: 1200px) {
    flex-direction: column;
  }
`;

const ReviewContainer = styled.div`
  background-color: #fff;
  flex: 0.7;
  padding: 15px;
  h2 {
    font-weight: 500;
    border-bottom: 1px solid lightgray;
    padding-bottom: 15px;
  }
`;

const AddressContainer = styled.div`
  margin-top: 20px;
  div {
    margin-top: 10px;
    margin-left: 10px;

    p {
      font-size: 14px;
      margin-top: 4px;
    }
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

const PaymentContainer= styled.div`
margin-top: 15px;

div {
  margin-top: 15px;
  margin-left: 15px;

  p {
    font-size: 14px;
  }
}
`;

const OrderContainer = styled.div`
  margin-top: 30px;
`;

const Product = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.div`
  flex: 0.3;
  img {
    width: 100%;
  }
`;
const Description = styled.div`
  flex: 0.7;

  h4 {
    font-weight: 600;
    font-size: 18px;
  }

  p {
    font-weight: 600;
    margin-top: 10px;
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

export default Payment;