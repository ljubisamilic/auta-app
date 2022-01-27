import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/button";
import { useNavigate } from "react-router-dom";

const EmpyList = () => {
  const navigate = useNavigate();
  return (
    <Card className="text-center my-5">
      <Card.Body>
        <Card.Title>Lista je prazna</Card.Title>
        <Card.Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat,
          eligendi.
        </Card.Text>
        <Button variant="primary" onClick={() => navigate("/addcar")}>
          Dodajte auto
        </Button>
      </Card.Body>
    </Card>
  );
};

export default EmpyList;
