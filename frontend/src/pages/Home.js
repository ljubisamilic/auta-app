import axios from "axios";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Cars from "../components/Cars";
import Search from "../components/Search";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState([]);
  const [brands, setBrends] = useState([]);

  // get all cars
  const getCars = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/car/getall", {
        headers: { authorization: localStorage.getItem("token") },
      });
      if (response.data) {
        setCars(response.data.cars);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCars();
  }, []);

  useEffect(() => {
    const getBrands = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/brand", {
          headers: { authorization: localStorage.getItem("token") },
        });
        setBrends(response.data.carBrends);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getBrands();
  }, []);

  if (loading) {
    return <h1 className="text-center">Loading</h1>;
  }

  return (
    <Container>
      <Search brands={brands} setCars={setCars} setLoading={setLoading} />
      <Row md={4}>
        {cars.map((car) => {
          return <Cars key={car._id} car={car} />;
        })}
      </Row>
    </Container>
  );
};

export default Home;
