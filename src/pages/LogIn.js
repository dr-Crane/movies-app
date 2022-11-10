import React, {useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import Navbar from "../components/navbar";
import {useDispatch, useSelector} from "react-redux";
import {fetchLoginUser} from "../store/reducers/userReducer";

const LogIn = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.userReducer.token);
    const status = useSelector(state => state.userReducer.status);
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin() {
        if (userName=== "" || password === "") {
            alert("Заполните форму");
        }
        dispatch(fetchLoginUser({
            username : userName,
            password : password
        }))
    }

    React.useEffect(() => {
        if(status === 'resolved') {
            navigate("/");
        }
    }, [dispatch, token, navigate, status]);

    return (
        <div>
            <Navbar/>
            <Container className={"mt-3"}>
                <Card>
                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label><b>Логин</b></Form.Label>
                                <Form.Control type={"login"} value={userName}
                                              onChange={(e) => setUserName(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label><b>Пароль</b></Form.Label>
                                <Form.Control autoComplete={"off"} type={"password"} value={password}
                                              onChange={(e) => setPassword(e.target.value)}/>
                            </Form.Group>
                            <Button variant="primary" onClick={handleLogin}>Войти</Button>
                            <Link to={"/registration"} className={"btn btn-secondary ms-1"}>Зарегистрироваться</Link>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default LogIn;