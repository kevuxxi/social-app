import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerRequest } from "../redux/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const Register = () => {
  const { token, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = "El nombre de usuario es obligatorio.";
    }
    if (!email.trim()) {
      newErrors.email = "El campo email es obligatorio.";
    }
    if (!password) {
      newErrors.password = "El campo contrasena es obligatorio.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() && !emailRegex.test(email)) {
      newErrors.email = "El formato del email no es valido.";
    }

    if (password.length > 0 && password.length < 8) {
      newErrors.password = "La contrasena debe tener al menos 8 caracteres.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }
    dispatch(registerRequest({ user_name: username, email, password }));
    setEmail("");
    setPassword("");
    setUsername("");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (token) {
      toast.success("Usuario registrado");
      navigate("/feed");
    }
  }, [token, navigate]);

  return (
    <Container className="page register-page">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6} lg={4}>
          <Card className="register-card">
            <h1 className="register-card__title">Crear cuenta</h1>
            <Form onSubmit={handleSubmit} className="register-form">
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label className="form-label">Usuario</Form.Label>
                <Form.Control
                  className="register-form__input"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  type="text"
                  placeholder="Tu nombre de usuario"
                  isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="form-label">Email</Form.Label>
                <Form.Control
                  className="register-form__input"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="email@ejemplo.com"
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="form-label">Contrasena</Form.Label>
                <Form.Control
                  className="register-form__input"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="Minimo 8 caracteres"
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                size="lg"
                className="w-100 btn btn--primary register-form__submit"
                disabled={loading}
              >
                {loading ? <ClipLoader color="#FFFFFF" size={20} /> : "Registrarse"}
              </Button>
            </Form>
            <div className="auth-card__footer">
              <Link to="/login" className="auth-card__link">
                Ya tienes cuenta? Inicia sesion
              </Link>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
