import React, { useEffect } from "react";
import styled from "styled-components";
import Rating from '@mui/material/Rating';
import { useStateValue } from "../StateProvider";

function Card({id,image,title,price,rating}) {

  const [{ basket }, dispatch] = useStateValue();
  
  console.log("basket >>>>", basket);
  const addToBasket = async (e) => {
    e.preventDefault();
    console.log("id",id)

    const response = await fetch('https://amazonclone-tau.vercel.app/cart/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id,
            title,
            price,
            image,
            rating,
        }),
    });
 
    if (response.ok) {
        const data = await response.json();
        console.log('Item added to cart:', data);
        dispatch({
            type: "ADD_TO_BASKET",
            item: data,
        });
    } else {
        console.error('Error adding item to cart:', response.statusText);
    }
};

    return(
        <Container>
           <Image> 
            <img src={image} alt=""/>
           </Image>
           <Description>
            <h5>{title}</h5>
           <Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly 
           />
            <p>{price}TL</p>

            <button onClick={addToBasket}>Sepete Ekle</button>
           </Description>
        </Container>
    )

}

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  background-color: #fff;
  z-index: 10;
`;
const Image = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  margin-top: 20px;
  flex: 0.3;
  img {
    width: 180px;
    height: 200px;
  }
`;
const Description = styled.div`
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex: 0.7;

  h5 {
    font-size: 16px;
    font-weight: 600;
  }

  p {
    font-weight: 600;
  }

  button {
    width: 100%;
    height: 33px;
    background-color: #fa8900;
    border:1px solid transparent;
    border-radius: 10px;
    cursor: pointer;
    transition: border-color 0.3s ease;
  }
  button:hover {
    border-color: #000; 
  }
`;
export default Card;