import React ,{useState} from "react";
import styled from "styled-components";
import axios from "../axios";

function AddProduct() {

    const [title, setTitle] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [price, setPrice] = useState(0);
    const [rating, setRating] = useState(0);

    const addProduct = (e) => {
        e.preventDefault();

        axios.
        post("/products/add", { title, imageURL, price, rating })
        .then(() => {
          setTitle("");
          setImageURL("");
          setPrice(0);
          setRating(0);
        })
        .catch((error) => alert(error.message));
    };

    return (
        <Container>
        <Logo>
          <img src="/amazon_logo.png" alt="" />
        </Logo>
  
        <FormContainer>
  <h3>Ürün Ekle</h3>
  <InputContainer>
    <p>Ad</p>
    <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
  </InputContainer>
  <InputContainer>
    <p>Görsel</p>
    <input type="text" onChange={(e) => setImageURL(e.target.value)} value={imageURL} />
  </InputContainer>
  <InputContainer>
    <p>Fiyat</p>
    <input type="number" onChange={(e) => setPrice(Number(e.target.value))} value={price} />
  </InputContainer>
  <InputContainer>
    <p>Değerlendirme</p>
    <input type="number" onChange={(e) => setRating(Number(e.target.value))} value={rating} />
  </InputContainer>
  <Button onClick={addProduct}>Ürün Ekle</Button>
</FormContainer>

           
          </Container>
    );
}

const Container = styled.div`
  width: 40%;
  min-width: 450px;
  height: fit-content;
  padding: 15px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.div`
  width: 120px;
  margin-bottom: 20px;
  img {
    width: 100%;
  }
`;

const FormContainer = styled.form`
  border: 1px solid lightgray;
  width: 55%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;

  h3 {
    font-size: 28px;
    font-weight: 400;
    line-height: 33px;
    align-self: flex-start;

    margin-bottom: 10px;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  padding: 10px;

  p {
    font-size: 14px;
    font-weight: 600;
  }

  input {
    width: 95%;
    height: 33px;
    padding-left: 5px;
    border-radius: 5px;
    border: 1px solid lightgray;
    margin-top: 5px;

    &:hover {
      border: 1px solid orange;
    }
  }
`;

const Button = styled.button`
  width: 60%;
  height: 35px;
  background-color: #f3b414;
  border: 1px solid transparent;
  outline: none;
  border-radius: 10px;
  margin-top: 30px;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: #000; 
  }

`;
export default AddProduct;
