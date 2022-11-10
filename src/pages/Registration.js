import React, {useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {fetchRegisterUser} from "../store/reducers/userReducer";
import {useNavigate} from "react-router-dom";
import Navbar from "../components/navbar";

const Registration = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const status = useSelector(state => state.userReducer.status);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userName, setNick] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [gender, setGender] = useState(3);


    const handleRegister = () => {
        if (!email || !password || !gender || !userName || !name || !birthDate) {
            alert("Заполните все поля");
            return;
        }
        if (confirmPassword !== password) {
            alert("Пароли не совпадают");
            return;
        }
        if (gender === 3) {
            alert("Не выбран пол")
            return;
        }
        dispatch(fetchRegisterUser({
            userName: userName,
            password: password,
            birthDate: birthDate,
            gender: gender,
            email: email,
            name: name
        }));
    }
    
    React.useEffect(() => {
        if(status === 'resolved') {
            navigate("/");
        }
    }, [dispatch, navigate, status])


    return (
        <div>
            <Navbar/>
            <Container className={"mt-3"}>
                <Card>
                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label><b>Логин</b></Form.Label>
                                <Form.Control type={"login"} value={userName} onChange={(e) => setNick(e.target.value)}/>
                            </Form.Group>

                            <Row>
                                <Form.Group className="mb-3 col-md">
                                    <Form.Label><b>Пароль</b></Form.Label>
                                    <Form.Control type={"password"} autoComplete={"off"} value={password}
                                                  onChange={(e) => setPassword(e.target.value)}/>
                                </Form.Group>
                                <Form.Group className="mb-3 col-md">
                                    <Form.Label><b>Подтверждение пароля</b></Form.Label>
                                    <Form.Control type={"password"} autoComplete={"off"} value={confirmPassword}
                                                  onChange={(e) => setConfirmPassword((e.target.value))}/>
                                </Form.Group>
                            </Row>

                            <Row>
                                <Form.Group className="mb-3 col-md">
                                    <Form.Label><b>Email</b></Form.Label>
                                    <Form.Control type={"email"} value={email} onChange={(e) => setEmail(e.target.value)}/>
                                </Form.Group>
                                <Form.Group className="mb-3 col">
                                    <Form.Label><b>ФИО</b></Form.Label>
                                    <Form.Control type={"text"} value={name} onChange={(e) => setName(e.target.value)}/>
                                </Form.Group>
                            </Row>

                            <Row>
                                <Form.Group className={"mb-3 col-md"}>
                                    <Form.Label><b>Дата рождения</b></Form.Label>
                                    <Form.Control type={"date"} value={birthDate}
                                                  onChange={(e) => setBirthDate(e.target.value)}/>
                                </Form.Group>
                                <Form.Group className={"mb-3 col-md"}>
                                    <Form.Label><b>Пол</b></Form.Label>
                                    <Form.Select value={gender} onChange={(e) => setGender(Number(e.target.value))}>
                                        <option value={3}>-</option>
                                        <option value={0}>Женщина</option>
                                        <option value={1}>Мужчина</option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            <Button variant={"primary"} onClick={handleRegister}>Зарегистрироваться</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default Registration;