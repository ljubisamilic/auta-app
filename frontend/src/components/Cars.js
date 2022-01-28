import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/button";
import EmpyList from "./EmpyList";
import { useNavigate } from "react-router-dom";

const Cars = ({ cars, removeCar }) => {
  const navigate = useNavigate();
  const updateCar = (id) => {
    navigate(`/updatecar/${id}`);
  };
  const getCarDetails = (id) => {
    navigate(`/car/${id}`);
  };
  if (!cars.length) {
    return <EmpyList />;
  }
  return (
    <Table striped bordered hover className="mt-5">
      <thead>
        <tr className="align-center">
          <th>Model</th>
          <th>Proizvodjac</th>
          <th>Kilometraza</th>
          <th>Godiste</th>
          <th>Vlasnik</th>
          <th>Cijena</th>
          <th>Opcije</th>
        </tr>
      </thead>
      <tbody>
        {cars.map((car) => {
          return (
            <tr key={car._id}>
              <td>{car.model}</td>
              <td>{car.manufacturer.company}</td>
              <td>{car.mileage} km</td>
              <td>{car.productionYear}</td>
              <td>{car.createdBy.username}</td>
              <td>{car.price.toLocaleString("de-DE")} BAM</td>
              <td className="d-flex justify-content-end">
                <Button onClick={() => getCarDetails(car._id)} className="mx-2">
                  Detalji
                </Button>
                <Button
                  onClick={() => updateCar(car._id)}
                  className="mx-2"
                  variant="warning"
                >
                  Izmjeni
                </Button>
                <Button onClick={() => removeCar(car._id)} variant="danger">
                  Ukloni
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default Cars;
