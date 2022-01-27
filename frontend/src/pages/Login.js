import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { useGlobalcontext } from "../context";
import axios from "axios";
import { useNavigate, Navigate, Link, useLocation } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser, setUserData } = useGlobalcontext();
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      return alert("Popuni formu");
    }
    setLoading(true);
    console.log(username);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        { username, password }
      );
      if (response.data) {
        localStorage.setItem("token", response.data.token);
        setUser(true);
        setUserData(response.data.user);
        navigate(state?.path || "/");
      }
      setUsername("");
      setPassword("");
      setLoading(false);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <Container className="container-form shadow p-3 mb-5 bg-white rounded">
      <Alert>
        Nemate registrovan korisnicki nalog{" "}
        <Alert.Link as={Link} to="/register">
          Registrujte se
        </Alert.Link>
      </Alert>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Korisnicko ime</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Korisnicko ime"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Lozinka</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Lozinka"
          />
        </Form.Group>
        <div className="d-grid">
          <Button className="p-3 mt-3" variant="primary" type="submit">
            {loading ? "Ucitavanje..." : "Prijavite se"}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Login;
