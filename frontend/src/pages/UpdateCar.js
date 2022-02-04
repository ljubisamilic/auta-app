import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
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
      .get(`http://localhost:5000/api/car/auth/getone/${id}`, {
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
        setImages(res.data.car.images);
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
    if (!images.length && !newImages.length) {
      return alert("Molimo vas dodajte slike");
    }

    const formData = new FormData();
    formData.append("model", model);
    formData.append("mileage", mileage);
    formData.append("manufacturer", manufacturer);
    formData.append("productionYear", productionYear);
    formData.append("price", price);
    formData.append("images", JSON.stringify(images));

    if (newImages.length) {
      for (let i = 0; i < newImages.length; i++) {
        formData.append("newimages", newImages[i]);
      }
    }
    setLoading(true);
    try {
      await axios.patch(
        `http://localhost:5000/api/car/update/${id}`,
        formData,
        {
          headers: { authorization: localStorage.getItem("token") },
        }
      );
      alert("Uspjesno izmjena podataka");
      setLoading(false);
      navigate("/mycars");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getBrands();
    getSingleCar();
  }, []);

  if (loading) {
    return <h2 className="text-center">Loading</h2>;
  }
  return (
    <Container className="shadow p-3 mb-5 bg-white rounded">
      <h1 className="mb-5">Izmjena podataka za auto id: {id}</h1>
      <Form encType="multipart/form-data">
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

          <Form.Group as={Col} controlId="formGridSlika">
            <Form.Label>Slike</Form.Label>
            <Form.Control
              type="file"
              name="newimages"
              onChange={(e) => setNewImages(e.target.files)}
              multiple
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
        <Stack direction="horizontal" gap={3} style={{ flexWrap: "wrap" }}>
          {images.map((image) => {
            return (
              <div
                key={image.imagePath}
                className="bg-light border update-images"
                style={{ width: "19%" }}
              >
                <div className="image-hower">
                  <Button
                    variant="outline-light"
                    className="position-absolute top-50 start-50 translate-middle"
                    onClick={() =>
                      setImages(
                        images.filter(
                          (img) => img.imagePath !== image.imagePath
                        )
                      )
                    }
                  >
                    X
                  </Button>
                </div>
                <img
                  src={`http://localhost:5000/${image.imagePath}`}
                  alt={image.imageName}
                  style={{ width: "100%" }}
                />
              </div>
            );
          })}
        </Stack>
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
