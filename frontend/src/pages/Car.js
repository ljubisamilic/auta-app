import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ImageGallery from "react-image-gallery";

const Car = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [car, setCar] = useState();
  const getSingleCar = async () => {
    setLoading(true);
    await axios
      .get(`http://localhost:5000/api/car/getone/${id}`, {
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

  return (
    <Container className="my-5">
      <Card className="mt-5 my-5" style={{ margin: "auto" }}>
        <Card.Header>
          Detalji za auto: {car.manufacturer.company} {car.model}
        </Card.Header>
        <Card.Body>
          <Row className="mb-4">
            <Col>
              <strong>Model: </strong>
              {car.model}
            </Col>
            <Col>
              <strong>Proizvodjac: </strong>
              {car.manufacturer.company}
            </Col>
            <Col>
              <strong>Zemlja porijekla: </strong>
              {car.manufacturer.country}
            </Col>
          </Row>
          <Row>
            <Col>
              <strong>Godiste: </strong>
              {car.productionYear}
            </Col>
            <Col>
              <strong>Kilometraza: </strong>
              {car.mileage} km
            </Col>
            <Col>
              <strong>Cijena: </strong>
              {car.price.toLocaleString("de-DE")} BAM
            </Col>
          </Row>
        </Card.Body>
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
