import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [value, setValue] = useState({
    model: "",
    mileage: "",
    manufacturer: "",
    productionYear: "",
    price: "",
  });

  const getSingleCar = async () => {
    setLoading(true);
    await axios
      .get(`http://localhost:5000/api/car/${id}`, {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        setLoading(false);
        const { model, mileage, manufacturer, price, productionYear, _id } =
          res.data.car;
        setValue({
          model,
          mileage,
          manufacturer: manufacturer._id,
          price,
          productionYear,
          _id,
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setValue(null);
      });
  };
  const getBrands = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/brand", {
        headers: { authorization: localStorage.getItem("token") },
      });
      setBrands(response.data.carBrends);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const createValue = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  // update car
  const handleUpdate = async (e) => {
    e.preventDefault();
    const { model, mileage, manufacturer, productionYear, price } = value;
    if (!model || !mileage || !manufacturer || !productionYear || !price) {
      return alert("Molimo vas popunite formu");
    }
    console.log("neso");
    setLoading(true);
    try {
      await axios.patch(
        `http://localhost:5000/api/car/${id}`,
        { model, mileage, manufacturer, productionYear, price },
        { headers: { authorization: localStorage.getItem("token") } }
      );
      alert("Uspjesno izmjena podataka");
      setValue({
        model: "",
        mileage: "",
        manufacturer: "",
        productionYear: "",
        price: "",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getBrands();
    getSingleCar();
  }, []);

  if (loading) {
    return <h2 className="text-center">Loading</h2>;
  }
  console.log(value);
  return (
    <Container className="shadow p-3 mb-5 bg-white rounded">
      <h1 className="mb-5">Izmjena podataka za auto id: {id}</h1>
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
            onClick={handleUpdate}
            variant="primary"
            size="lg"
            disabled={loading}
          >
            {loading ? "Ucitavanje" : "Izmjeni"}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default UpdateCar;
