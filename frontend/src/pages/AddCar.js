import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useGlobalcontext } from "../context";
import axios from "axios";

const AddCar = () => {
  const { user } = useGlobalcontext();
  const [loading, setLodaing] = useState(false);
  const [brands, setBrends] = useState([]);
  const [value, setValue] = useState({
    model: "",
    mileage: "",
    manufacturer: "",
    productionYear: "",
    price: "",
  });

  const createValue = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const getBrands = async () => {
    setLodaing(true);
    try {
      const response = await axios.get("http://localhost:5000/api/brand", {
        headers: { authorization: localStorage.getItem("token") },
      });
      setBrends(response.data.brands);
    } catch (error) {
      console.log(error);
    }
    setLodaing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { model, mileage, manufacturer, productionYear, price } = value;
    console.log(model, mileage);
    if (!model || !mileage || !manufacturer || !productionYear || !price) {
      return alert("Molimo vas popunite formu");
    }

    setLodaing(true);
    try {
      await axios.post(
        "http://localhost:5000/api/car",
        { model, mileage, manufacturer, productionYear, price },
        { headers: { authorization: localStorage.getItem("token") } }
      );
      alert("Uspjesno dodano novo auto");
      setValue({
        model: "",
        mileage: "",
        manufacturer: "",
        productionYear: "",
        price: "",
      });
    } catch (error) {
      console.log(error);
    }
    setLodaing(false);
  };

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <Container className="shadow p-3 mb-5 bg-white rounded">
      <h1 className="mb-5">Dodaj auto</h1>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridNaziv">
            <Form.Label>Naziv modela</Form.Label>
            <Form.Control
              type="text"
              name="model"
              value={value.model}
              onChange={createValue}
              placeholder="Naziv modela"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridKilometraza">
            <Form.Label>Kilometraza</Form.Label>
            <Form.Control
              type="number"
              name="mileage"
              value={value.mileage}
              onChange={createValue}
              placeholder="Kilometraza"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridProizvodjac">
            <Form.Label>Proizvodjac</Form.Label>
            <Form.Select
              name="manufacturer"
              value={value.manufacturer}
              onChange={createValue}
            >
              <option value="">Izaberite...</option>
              {brands.length ? (
                brands.map((brand) => {
                  return (
                    <option value={brand._id} key={brand._id}>
                      {brand.company}
                    </option>
                  );
                })
              ) : (
                <option value="">...</option>
              )}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridGodiste">
            <Form.Label>Godina proizvodnje</Form.Label>
            <Form.Control
              type="number"
              name="productionYear"
              value={value.productionYear}
              onChange={createValue}
              placeholder="Godina proizvodnje"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridCijena">
            <Form.Label>Cijena</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={value.price}
              onChange={createValue}
              placeholder="Cijena"
            />
          </Form.Group>
        </Row>
        <div className="d-grid mt-5">
          <Button
            onClick={handleSubmit}
            variant="primary"
            size="lg"
            disabled={loading}
          >
            {loading ? "Ucitavanje" : "Dodaj"}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddCar;