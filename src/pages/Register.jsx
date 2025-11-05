import { Container, Row, Col, Form, Button, Card } from "react-bootstrap"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { registerRequest } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const Register = () => {
    const { token, loading, error } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');


    const handlesubmit = (e) => {
        e.preventDefault();
        dispatch(registerRequest({ username, email, password }))
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
            navigate("/profile");
        }
    }, [token, navigate]);

    return (
        <Container className="page register-page">
            <Row className="justify-content-md-center">
                <Col xs={12} md={6} lg={4}>
                    <Card className="register-card">
                        <h1 className="register-card__title">Formulario de Registro</h1>
                        <Form onSubmit={handlesubmit}>
                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control onChange={(e) => setUsername(e.target.value)} value={username} type="text" placeholder="Tu nombre de usuario" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="email@ejemplo.com" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Mínimo 8 caracteres" />
                            </Form.Group>
                            <Button variant="primary" type="submit" size="lg" className="w-100" disabled={loading}>
                                {loading
                                    ? <ClipLoader
                                        color="#FFFFFF" // Usa un color que contraste con el primario (azul)
                                        size={20}
                                    />
                                    : "Registrarse"
                                }
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Register