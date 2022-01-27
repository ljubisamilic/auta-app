import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/button";
import EmpyList from "./EmpyList";

const Cars = ({ cars }) => {
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
              <td>{car.price} BAM</td>
              <td className="d-flex justify-content-end">
                <Button className="mx-2">Detalji</Button>
                <Button className="mx-2" variant="warning">
                  Izmjeni
                </Button>
                <Button variant="danger">Ukloni</Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default Cars;