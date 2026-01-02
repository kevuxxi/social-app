import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { loginRequest } from "../redux/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { fetchUserRequest } from "../redux/slices/usersSlice";

const Login = () => {
  const { user, token, loading, error } = useSelector((state) => state.auth);
  const authUserId = useSelector((state) => state.auth.user?.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

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
    dispatch(loginRequest({ email, password }));
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (!token || !authUserId) return;

    toast.success(`Bienvenido de nuevo, ${user?.name ?? user?.email ?? "usuario"}!`);
    dispatch(fetchUserRequest(authUserId));
    navigate("/profile");
  }, [token, navigate, user, dispatch, authUserId]);

  return (
    <Container className="page auth-page">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6} lg={4}>
          <Card className="auth-card">
            <h1 className="auth-card__title">Iniciar sesion</h1>
            <Form onSubmit={handleSubmit} className="auth-form">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="form-label">Email</Form.Label>
                <Form.Control
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

              <Button variant="primary" type="submit" size="lg" className="w-100" disabled={loading}>
                {loading ? <ClipLoader color="#FFFFFF" size={20} /> : "Iniciar sesion"}
              </Button>
            </Form>
            <div className="auth-card__footer">
              <Link to="/register" className="auth-card__link">
                No tienes cuenta? Registrate
              </Link>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
