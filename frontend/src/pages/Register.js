import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useGlobalcontext } from "../context";

const Register = () => {
  const { user } = useGlobalcontext();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassowrd] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      return alert("Popuni formu");
    }
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/user/register", {
        username,
        password,
      });
      setUsername("");
      setPassowrd("");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data.code === 11000) {
        alert("Korisnicko ime vec postoji. Molio vas izaberite drugo");
      }
      setLoading(false);
    }
  };
  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <Container className="container-form shadow p-3 mb-5 bg-white rounded">
      <Alert>
        Vec ste registrovan?{" "}
        <Alert.Link as={Link} to="/login">
          Prijavite se
        </Alert.Link>
      </Alert>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Korisnicko ime</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Korisnicko ime"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Lozinka</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassowrd(e.target.value)}
            placeholder="Lozinka"
          />
        </Form.Group>
        <div className="d-grid">
          <Button
            className="p-3 mt-3"
            variant="primary"
            type="submit"
            disabled={loading}
          >
            {loading ? "Ucitavanje..." : "Napravi novi nalog"}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Register;
