import { Container, Row, Col, Form, Button, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react"
import { loginRequest } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const Login = () => {
    const { token, loading, error } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState('');

    const validate = () => {
        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = 'El campo email es obligatorio.';
        }
        if (!password) {
            newErrors.password = 'El campo contraseña es obligatorio.';
        }

        // 2. Validación de formato de Email (Regex simple)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.trim() && !emailRegex.test(email)) {
            newErrors.email = 'El formato del email no es válido.';
        }

        // 3. Validación de longitud de Contraseña
        if (password.length > 0 && password.length < 8) {
            newErrors.password = 'La contraseña debe tener al menos 8 caracteres.';
        }

        setErrors(newErrors);
        // Devuelve true si no hay errores (el objeto está vacío)
        return Object.keys(newErrors).length === 0;
    };

    const handlesubmit = (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }
        dispatch(loginRequest({ email, password }))
        setEmail('')
        setPassword('')
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    useEffect(() => {
        if (token) {
            navigate("/profile");
        }
    }, [token, navigate]);

    return (

        <Container className="page auth-page">
            <Row className="justify-content-md-center">
                <Col xs={12} md={6} lg={4}>
                    <Card className="auth-card">
                        <h1 className="auth-card__title">Iniciar sesion</h1>
                        <Form onSubmit={handlesubmit} className="auth-form">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="email@ejemplo.com" isInvalid={!!errors.email} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Mínimo 8 caracteres" isInvalid={!!errors.password} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Button variant="primary" type="submit" size="lg" className="w-100" disabled={loading}>
                                {loading
                                    ? <ClipLoader
                                        color="#FFFFFF" // Usa un color que contraste con el primario (azul)
                                        size={20}
                                    />
                                    : "Iniciar sesion"
                                }
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>

    )
}

export default Login