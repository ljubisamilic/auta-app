import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const Search = ({ brands, setLoading, setCars }) => {
  const [query, setQuery] = useState("");
  const [company, setCompany] = useState("");
  const [price, setPrice] = useState(0);

  const findCar = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await axios.get(
      `http://localhost:5000/api/car/search/?query=${query}${
        company ? `&company=${company}` : ""
      }${price ? `&price=${price}` : ""}`,
      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );
    setCars(response.data.cars);
    setLoading(false);
  };

  return (
    <Form className="mt-5">
      <Form.Floating className="mb-3">
        <Form.Control
          id="floatingInputCustom"
          type="text"
          placeholder="trazi"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <label htmlFor="floatingInputCustom">Trazi</label>
      </Form.Floating>
      <Row>
        <Col>
          <FloatingLabel
            controlId="floatingSelectGrid"
            label="Izaberi proizvodjaca"
          >
            <Form.Select
              aria-label="Floating label select example"
              onChange={(e) => setCompany(e.target.value)}
            >
              <option value="">Izaberi...</option>
              {brands.map((brand) => {
                return (
                  <option key={brand._id} value={brand._id}>
                    {brand.company}
                  </option>
                );
              })}
            </Form.Select>
          </FloatingLabel>
        </Col>
        <Col>
          <Form.Floating className="mb-3">
            <Form.Control
              id="floatingInputCustom"
              type="number"
              placeholder="Cijena"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <label htmlFor="floatingInputCustom">Cijena do</label>
          </Form.Floating>
        </Col>
        <Col>
          <Form.Floating className="mb-3">
            <div className="d-grid">
              <Button
                style={{ paddingTop: "16px", paddingBottom: "15px" }}
                type="submit"
                onClick={findCar}
              >
                Trazi
              </Button>
            </div>
          </Form.Floating>
        </Col>
      </Row>
    </Form>
  );
};

export default Search;
