import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import ImageGallery from "react-image-gallery";

const Car = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [car, setCar] = useState();
  const getSingleCar = async () => {
    setLoading(true);
    await axios
      .get(`http://localhost:5000/api/car/${id}`, {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        setLoading(false);
        setCar(res.data.car);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setCar(null);
      });
  };
  useEffect(() => {
    getSingleCar();
  }, []);

  if (loading) {
    return <h2 className="text-center">Loading</h2>;
  }
  if (!car) {
    return <p>greska</p>;
  }

  const images = car.images.map((image) => {
    return {
      original: `http://localhost:5000/${image.imagePath}`,
      originalAlt: image.imageName,
    };
  });

  console.log(images);
  return (
    <Container className="my-5">
      <Card className="mt-5 my-5" style={{ maxWidth: "600px", margin: "auto" }}>
        <Card.Body>
          <Card.Title>
            Detalji za auto: {car.manufacturer.company} {car.model}
          </Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>
            <strong>Model: </strong>
            {car.model}
          </ListGroupItem>
          <ListGroupItem>
            <strong>Proizvodjac: </strong>
            {car.manufacturer.company}
          </ListGroupItem>
          <ListGroupItem>
            <strong>Zemlja porijekla: </strong>
            {car.manufacturer.country}
          </ListGroupItem>
          <ListGroupItem>
            <strong>Godiste: </strong>
            {car.productionYear}
          </ListGroupItem>
          <ListGroupItem>
            <strong>Kilometraza: </strong>
            {car.mileage} km
          </ListGroupItem>
          <ListGroupItem>
            <strong>Cijena: </strong>
            {car.price.toLocaleString("de-DE")} BAM
          </ListGroupItem>
          <ListGroupItem>
            <strong>Vlasnik: </strong>
            {car.createdBy.username}
          </ListGroupItem>
        </ListGroup>
        <Button onClick={() => navigate("/")}>Nazad</Button>
      </Card>
      <ImageGallery
        items={images}
        showThumbnails={false}
        showPlayButton={false}
        showIndex={true}
      />
    </Container>
  );
};

export default Car;
