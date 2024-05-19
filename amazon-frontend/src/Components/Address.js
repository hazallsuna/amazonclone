import React, { useState } from "react";
import styled from "styled-components";
import { useStateValue } from "../StateProvider";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
function Address(){

  const [{}, dispatch] = useStateValue();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [flat, setFlat] = useState("");
  const [area, setArea] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  
  const navigate= useNavigate();

  const deliver = (e) => {
    e.preventDefault();

    dispatch({
      type: "SET_ADDRESS",
      item: {
        fullName,
        phone,
        flat,
        area,
        city,
        state,
      },
    });
    navigate("/payment");
  };
  
  console.log(fullName);

    return (
        <Container>
            <Navbar/>
            <Main> 
            <FormContainer>
            <InputContainer>
             <p>Tam ad (ad ve soyad)</p>
             <input
             type="text"
             placeholder="Hazal"
             onChange={(e) => setFullName(e.target.value)}
             value={fullName}
             
            />
             </InputContainer>
             <InputContainer>
             <p>Teslimat için cep telefonu</p>
             <input type="text"
             onChange={(e) => setPhone(e.target.value)}
             value={phone}
             
            />
             </InputContainer>
             <InputContainer>
             <p>Açık Adres</p>
             <input type="text"
             onChange={(e) => setFlat(e.target.value)}
             value={flat}
              
            />
             </InputContainer>
             <InputContainer>
             <p>Şehir</p>
             <input type="text"
             onChange={(e) => setArea(e.target.value)}
             value={area}
            />
             </InputContainer>
             <InputContainer>
             <p>İlçe</p>
             <input type="text"
             onChange={(e) => setLandmark(e.target.value)}
             value={landmark}
            />
             </InputContainer>
             <InputContainer>
             <p>Mahalle/Köy</p>
             <input type="text"
             onChange={(e) => setCity(e.target.value)}
             value={city}
            />
             </InputContainer>
             <InputContainer>
             <p>Posta kodu</p>
             <input type="text"
              onChange={(e) => setState(e.target.value)}
              value={state}
            />
             </InputContainer>
             <button onClick={deliver}>Bu Adrese Teslim Edin </button>
            </FormContainer>
            </Main>
            
        </Container>
    )
}

const Container = styled.div`
  width: 100%;
  height: fit-content;
  max-width: 1400px;

  margin: auto;
  background-color: rgb(234, 237, 237);

  position: relative;
`;
const Main = styled.div`
padding :15px;
`;

const FormContainer = styled.form`
border: 1px solid lightgray;
width: 55%;
min-width: 400px;
height: fit-content;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 15px;
background-color: #fff;
margin: auto;

button {
  align-self: flex-start;
  height: 33px;
  width: 250px;
  margin-top: 20px;
  background-color: #ffa32a;
  border: 1px solid transparent;
  transition: border-color 0.3s ease;
  outline: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  border-color: #000; 
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


export default Address;