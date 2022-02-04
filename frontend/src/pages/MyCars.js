import axios from "axios";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Cars from "../components/Cars";

const MyCars = () => {
  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState([]);

  // get all cars
  const getCars = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/car/auth/getall",
        {
          headers: { authorization: localStorage.getItem("token") },
        }
      );
      if (response.data) {
        setCars(response.data.cars);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  // remove car
  const removeCar = async (id) => {
    setLoading(true);
    await axios
      .delete(
        `http://localhost:5000/api/car/delete/${id}`,
        {
          headers: { authorization: localStorage.getItem("token") },
        },
        {}
      )
      .then((res) => {
        setLoading(false);
        setCars(cars.filter((car) => car._id !== id));
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getCars();
  }, []);

  if (loading) {
    return <h1 className="text-center">Loading</h1>;
  }
  console.log(cars);

  return (
    <Container>
      <Row md={4}>
        {cars.map((car) => {
          console.log(car);
          return <Cars key={car._id} car={car} removeCar={removeCar} />;
        })}
      </Row>
    </Container>
  );
};

export default MyCars;
