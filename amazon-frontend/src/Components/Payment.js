import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import { useStateValue } from "../StateProvider";
import { getBasketTotal } from "../reducer";
import axios from "axios";


function Payment() {
  const [{ address, basket, user }] = useStateValue();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Kapıda Ödeme");

  const handlePayment = async () => {
      setLoading(true);

      const orderDetail = {
          price: getBasketTotal(basket),
          products: basket,
          email: user?.email,
          address: {
              fullName: address.fullName,
              flat: address.flat,
              area: address.area,
              landmark: address.landmark,
              city: address.city,
              state: address.state,
              phone: address.phone
          }
      };

      try {
          await axios.post("http://localhost:8000/orders/add", orderDetail);
          alert("Siparişiniz başarıyla oluşturuldu!");
          setLoading(false);
      } catch (error) {
          console.error("Sipariş işlemi sırasında hata oluştu:", error);
          if (error.response) {
              console.error("Response data:", error.response.data);
              console.error("Response status:", error.response.status);
              console.error("Response headers:", error.response.headers);
          } else if (error.request) {
              console.error("Request data:", error.request);
          } else {
              console.error("Error message:", error.message);
          }
          setLoading(false);
      }
  };
  

    return (
        <Container>
            <Navbar />
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
                            <p>{address.city} {address.state}</p>
                            <p>Telefon: {address.phone}</p>
                        </div>
                    </AddressContainer>
                    <PaymentMethodContainer>
                        <h5>Ödeme Yöntemi</h5>
                        <div>
                            <CustomLabel>
                                <CustomRadio
                                    type="radio"
                                    name="paymentMethod"
                                    value="Kapıda Ödeme"
                                    checked={paymentMethod === "Kapıda Ödeme"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                Kapıda Ödeme
                            </CustomLabel>
                        </div>
                    </PaymentMethodContainer>
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
                    <p>
                        Ara Toplam ({basket.length} ürün): <strong>₺{getBasketTotal(basket).toFixed(2)}</strong>
                    </p>
                    <button onClick={handlePayment} disabled={loading}>
                        {loading ? "İşleniyor..." : "Siparişi Tamamla"}
                    </button>
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

const PaymentMethodContainer = styled.div`
  margin-top: 20px;
  div {
    margin-top: 10px;
    margin-left: 10px;
  }
`;

const CustomLabel = styled.label`
  font-size: 14px;
  display: flex;
  align-items: center;
`;

const CustomRadio = styled.input`
  margin-right: 10px;
  accent-color: ${props => (props.checked ? "blue" : "initial")}; 
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

  button {
    width: 65%;
    height: 33px;
    margin-top: 20px;
    background-color: #ffd814;
    border: 1px solid transparent;
    outline: none;
    transition: border-color 0.3s ease; 
    border-radius: 8px;
  }
  button:hover {
    border-color: #000; 
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
`;

export default Payment;
