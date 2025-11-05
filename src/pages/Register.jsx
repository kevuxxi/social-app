import { Container, Row, Col, Form, Button, Card } from "react-bootstrap"
import { useState } from "react"

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');


    const handlesubmit = (e) => {
        e.preventDefault();

    }

    return (
        <Container className="page register-page">
            <Row className="justify-content-md-center">
                <Col xs={12} md={6} lg={4}>
                    <Card className="register-card">
                        <h1 className="register-card__title">Formulario de Registro</h1>
                        <Form>
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
                            <Button variant="primary" type="submit" size="lg" className="w-100" >
                                Registrarse
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Register