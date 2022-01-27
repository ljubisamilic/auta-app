import axios from "axios";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Cars from "../components/Cars";
const Home = () => {
  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState([]);

  const getCars = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/car", {
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

  if (loading) {
    return <h1 className="text-center">Loading</h1>;
  }

  return (
    <Container>
      <Cars cars={cars} />
    </Container>
  );
};

export default Home;
