import React, { useState } from "react";
import styled from "styled-components";
import { useStateValue } from "../StateProvider";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Navbar({ products, setFilteredProducts }) {
  
  const [searchInput, setSearchInput] = useState("");
  const[{basket ,user}, dispatch] =useStateValue();
  const navigate = useNavigate();

  const signOut = () => {
    dispatch({
      type: "SET_USER",
      user: null,
    });

    localStorage.removeItem("user");
    navigate("/");
  };

  const handleSearch = () => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
    if (event.target.value === "") {
      setFilteredProducts(products); 
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Container>
      <Inner>
        <Logo>
          <Link to="/">
            <img src="./amazon_logo1.png" alt="" />
          </Link>
        </Logo>
         <SearchBar>
          <input 
            type="text" 
            placeholder="Ara.." 
            value={searchInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <SearchIcon onClick={handleSearch}>
            <img src="./SearchIcon.png" alt="" />
          </SearchIcon>
        </SearchBar>

        <RightContainer>
          <NavButton 
             onClick={user ? () => signOut() : () => navigate("/login")}
          >
            <p>Merhaba,</p>
            <p>{user ? user?.fullName : "Misafir"}</p>
          </NavButton>
          <NavButton onClick={() => navigate("/orders")}>
            <p>İade</p>
            <p>& Siparişler</p>
          </NavButton>
          <BasketButton onClick={() => navigate("/checkout")}>
            <img src="./basket-icon.png" alt="" />
            <p>{basket.length}</p>
          </BasketButton>
        </RightContainer>
      </Inner>
      <MobileSearchbar>
           <input 
            type="text" 
            placeholder="Ara.." 
            value={searchInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <SearchIcon onClick={handleSearch}>
            <img src="./SearchIcon.png" alt="" />
          </SearchIcon>
      </MobileSearchbar>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 60px;
  background-color: #131921;
  display: flex;
  align-items: center;
  position: relative;

  @media only screen and (max-width: 767px) {
    height: 120px;
    flex-direction: column;
  }
`;
const Inner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 767px) {
    justify-content: space-between;
  }
`;


const Logo = styled.div`
  margin-left: 20px;
  cursor: pointer;
  img {
    width: 100px;
    margin-top: 10px;
  }
`;

const SearchBar = styled.div`
  height: 35px;
  flex: 1;
  margin: 0px 15px;
  display: flex;
  align-items: center;

  input {
    flex: 1;
    width:  calc(100% - 30px);
    height: 100%;
    border: none;
    border-radius: 5px 0px 0px 5px;
    padding-left: 5px;

    &::placeholder {
      padding-left: 5px;
    }
  }

  @media only screen and (max-width: 767px) {
    display: none;
  }
`;

const MobileSearchbar = styled.div`
  height: 35px;
  width: 90%;
  display: flex;
  align-items: center;
  padding: 10px;

  input {
    flex: 1;
    width:  calc(100% - 40px);
    height: 100%;
    border: none;
    border-radius: 5px 0px 0px 5px;
    padding-left: 10px;

    &::placeholder {
      padding-left: 10px;
    }
  }

  @media only screen and (min-width: 768px) {
    display: none;
  }
`;


const SearchIcon = styled.div`
  background-color: #febd69;
  height: 100%;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 0px 5px 5px 0px;
  cursor: pointer; 
  transition: border 0.3s; 

  &:hover {
    border: 1px solid black; 
  }
  img {
    width: 22px;
  }
`;
const RightContainer = styled.div`
    display: flex;
    align-items: center;
    width: fit-content;
    justify-content: space-around;
    height: 100%;
    padding: 5px 15px;
`;

const NavButton = styled.div`
    color: #fff;
    padding: 5px;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    margin-right: 15px;

    p {
        margin: 0;
        padding: 2px 0; 
        line-height: 1.2; 

        &:nth-child(1) {
            font-size: 12px;
        }

        &:nth-child(2) {
            font-size: 14px;
            font-weight: 600;
        }
    }

    &:hover {
      border: 2px solid white;
      border-radius: 5px;
      padding: 3px; 
    }
`;


const BasketButton= styled.div`
    display: flex;
    align-items: center;
    height: 90%;
    cursor: pointer;

    img {
        width: 30px;
        margin-right: 10px;
    }

    p {
        color: #fff;
        font-weight: 500;
    }

    &:hover {
        border: 2px solid white;
        border-radius: 5px;
        padding: 5px;
    }
`;

export default Navbar