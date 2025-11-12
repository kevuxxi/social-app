import { Container, Row, Col, Form, Button, Card } from "react-bootstrap"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { registerRequest } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";

const Register = () => {
    const { token, loading, error } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!username.trim()) {
            newErrors.username = 'El nombre de usuario es obligatorio.';
        }
        if (!email.trim()) {
            newErrors.email = 'El campo email es obligatorio.';
        }
        if (!password) {
            newErrors.password = 'El campo contraseña es obligatorio.';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.trim() && !emailRegex.test(email)) {
            newErrors.email = 'El formato del email no es válido.';
        }

        if (password.length > 0 && password.length < 8) {
            newErrors.password = 'La contraseña debe tener al menos 8 caracteres.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlesubmit = (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }
        dispatch(registerRequest({ user_name: username, email, password }))
        setEmail('')
        setPassword('')
        setUsername('')
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    useEffect(() => {
        if (token) {
            toast.success('Usuario resgistrado')
            navigate("/profile");
        }
    }, [token, navigate]);

    return (
        <Container className="page register-page">
            <Row className="justify-content-md-center">
                <Col xs={12} md={6} lg={4}>
                    <Card className="register-card">
                        <h1 className="register-card__title">Formulario de Registro</h1>
                        <Form onSubmit={handlesubmit} className="register-form">
                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control className="register-form__input" onChange={(e) => setUsername(e.target.value)} value={username} type="text" placeholder="Tu nombre de usuario" isInvalid={!!errors.username} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.username}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control className="register-form__input" onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="email@ejemplo.com" isInvalid={!!errors.email} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control className="register-form__input" onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Mínimo 8 caracteres" isInvalid={!!errors.password} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="primary" type="submit" size="lg" className="w-100  btn btn--primary register-form__submit" disabled={loading}>
                                {loading
                                    ? <ClipLoader
                                        color="#FFFFFF"
                                        size={20}
                                    />
                                    : "Registrarse"
                                }
                            </Button>
                        </Form>
                        <button><Link to={'/login'}>¿Ya tienes cuenta? Inicia sesión</Link></button>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Register