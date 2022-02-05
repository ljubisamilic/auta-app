import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/button";
import EmpyList from "./EmpyList";
import Col from "react-bootstrap/Col";
import { useNavigate, useLocation } from "react-router-dom";

const Cars = ({ car, removeCar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const updateCar = (id) => {
    navigate(`/updatecar/${id}`);
  };
  const getCarDetails = (id) => {
    navigate(`/car/${id}`);
  };
  if (!car) {
    return <EmpyList />;
  }
  return (
    <Col md={3} className="mt-5">
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={`http://localhost:5000/${car.images[0].imagePath}`}
        />
        <Card.Body>
          <h4>{car.price.toLocaleString("de-DE")} BAM</h4>
          <Card.Title>
            {car.manufacturer.company} {car.model}
          </Card.Title>
          <p style={{ margin: "0" }}>
            Kilometraza: {car.mileage.toLocaleString("de-DE")} km
          </p>
          <p>Godiste: {car.productionYear}</p>
          <div className="d-grid">
            <Button variant="secondary" onClick={() => getCarDetails(car._id)}>
              Pogledaj
            </Button>
            {location.pathname === "/mycars" ? (
              <>
                <Button
                  className="mt-2"
                  variant="warning"
                  onClick={() => updateCar(car._id)}
                >
                  Izmjeni
                </Button>
                <Button
                  className="mt-2"
                  variant="danger"
                  onClick={() => removeCar(car._id)}
                >
                  Izbrisi
                </Button>
              </>
            ) : (
              ""
            )}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Cars;
