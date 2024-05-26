import React,{useState, useEffect} from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Card from "./Card";
import axios from "axios"

const products = [
  {
    id: '1',
    title: 'Apple iPhone 13 (128 GB) - Gece Yarısı',
    price: 36299,
    image: 'https://m.media-amazon.com/images/I/61Z2+N8dQKL._AC_SX342_SY445_.jpg',
    rating: 4.5,
  },
  {
    id: '2',
    title: 'Apple 20W USB-C Güç Adaptörü MHJE3TU/A',
    price: 740,
    image: 'https://m.media-amazon.com/images/I/41TkDqRzhAL._AC_SX522_.jpg',
    rating: 5,
  },
  {
    id: '3',
    title: 'Xiaomi Mi TV Stick 1080p Android TV Media Player, Siyah',
    price: 1456,
    image: 'https://m.media-amazon.com/images/I/51QlmXNlo6L._AC_SX425_.jpg',
    rating: 4.5,
  },
  {
    id: '5',
    title: 'Philips HD9243/90 Airfryer Fritöz, 0.8 kg, 4.1 L Kapasite',
    price: 2349,
    image: 'https://m.media-amazon.com/images/I/61l9glvBagL.__AC_SX300_SY300_QL70_ML2_.jpg',
    rating: 3.5,
  },
  {
    id: '6',
    title: 'Electrolux E4TB1-6ST Sürahili Blender, 800 W, 1.5 Litre Sürahili, Çoklu Hız Ayarlı, Paslanmaz Çelik',
    price: 2149,
    image: 'https://m.media-amazon.com/images/I/71T19KcwjJS.__AC_SX300_SY300_QL70_ML2_.jpg',
    rating: 2.5,
  },
  {
    id: '7',
    title: 'Stanley Klasik Trigger-Action Termos Bardak, 0,35 lt',
    price: 1099,
    image: 'https://m.media-amazon.com/images/I/71Nvcr+m9xL._AC_SY355_.jpg',
    rating: 4.5,
  },
  {
    id: '8',
    title: 'Apple AirPods Pro (2. nesil) ve MagSafe Şarj Kutusu (USB-C)',
    price: 7599,
    image: 'https://m.media-amazon.com/images/I/61SUj2aKoEL.__AC_SY445_SX342_QL70_ML2_.jpg',
    rating: 5,
  }
];

function Home() {
  const [filteredProducts, setFilteredProducts] = useState(products);

  return (
    <Container>
      <Navbar products={products} setFilteredProducts={setFilteredProducts} />
      <Banner>
        <img src="./71Rj59bYksL._SX3000_.jpg" alt="" />
        <img src="./mobile_71Rj59bYksL._SX3000_ - .jpg" alt="" />
      </Banner>
      <Main>
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            image={product.image}
            price={product.price}
            rating={product.rating}
            title={product.title}
          />
        ))}
      </Main>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  background-color: rgb(234, 237, 237);
  max-width: 1400px;
  margin: auto;
  height: fit-content;
`;

const Banner = styled.div`
  width: 100%;
  img {
    width: 100%;
    -webkit-mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 2),
      rgba(0, 0, 0, 0.95),
      rgba(0, 0, 0, 0.85),
      rgba(0, 0, 0, 0.75),
      rgba(0, 0, 0, 0.55),
      rgba(0, 0, 0, 0)
    );

    &:nth-child(2) {
      display: none;
    }

    @media only screen and (max-width: 767px) {
      &:nth-child(1) {
        display: none;
      }

      &:nth-child(2) {
        display: block;
        -webkit-mask-image: none;
      }
    }
  }
`;

const Main = styled.div`
  display: grid;
  justify-content: center;
  place-items: center;
  width: 100%;
  grid-auto-rows: 420px;
  grid-template-columns: repeat(4, 280px);
  grid-gap: 20px;

  @media only screen and (max-width: 767px) {
    grid-template-columns: repeat(2, 50%);
    grid-gap: 0;
  }

  @media only screen and (min-width: 767px) and (max-width: 1200px) {
    grid-template-columns: repeat(3, 30%);
  }

  @media only screen and (min-width: 767px) {
    margin-top: -130px;
    padding: 10px 0px;
  }
`;

export default Home;
