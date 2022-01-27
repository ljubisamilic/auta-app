import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

const AddBrand = () => {
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmitt = async (e) => {
    e.preventDefault();
    console.log("nesot");
    if (!company || !country) {
      return alert("Popuni formu");
    }
    console.log(company);
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/api/brand",
        {
          company,
          country,
        },
        { headers: { authorization: localStorage.getItem("token") } }
      );
      setCompany("");
      setCountry("");
      alert("Uspjesno ste dodali novi brend");
    } catch (error) {
      if (error.response.data.code === 11000) {
        alert("Ovaj brend imamo u bazu podataka");
      }
    }
    setLoading(false);
  };
  return (
    <Container className="shadow p-3 mb-5 bg-white rounded">
      <h1 className="mb-5">Dodaj proizvodjaca</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formGroupProizvodjac">
          <Form.Label>Proizvodjac</Form.Label>
          <Form.Control
            type="text"
            value={company}
            name="company"
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Proizvodjac"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupDrzava">
          <Form.Label>Drzava</Form.Label>
          <Form.Control
            type="text"
            value={country}
            name="country"
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Drzava"
          />
        </Form.Group>
        <div className="d-grid mt-5">
          <Button
            onClick={handleSubmitt}
            variant="primary"
            size="lg"
            disabled={loading}
          >
            {loading ? "Ucitavanje..." : "Dodaj"}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddBrand;
