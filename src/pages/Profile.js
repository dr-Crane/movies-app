import React, {useState} from 'react';
import {Button, Card, Col, Container, Form, Image, Row} from "react-bootstrap";
import anonymousAvatar from "../images/userAvatar.jpg";
import Navbar from "../components/navbar";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchUpdateUser} from "../store/reducers/userReducer";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = useSelector(state => state.userReducer.token);
    const id = useSelector(state => state.userReducer.id);
    const name = useSelector(state => state.userReducer.name);
    const nickName = useSelector(state => state.userReducer.nickName);
    const birthDate = useSelector(state => state.userReducer.birthDate);
    const email = useSelector(state => state.userReducer.email);
    const avatarLink = useSelector(state => state.userReducer.avatarLink);
    const gender = useSelector(state => state.userReducer.gender);

    const [newName, setNewName] = useState(name);
    const [newBirthdate, setNewBirthDate] = useState(birthDate);
    const [newEmail, setNewEmail] = useState(email);
    const [newAvatarLink, setNewAvatarLink] = useState(avatarLink);
    const [newGender, setNewGender] = useState(gender);

    const editHandler = () => {
        if (
            newName !== name
            || newBirthdate !== birthDate
            || newEmail !== email
            || newAvatarLink !== avatarLink
            || newGender !== gender
        ) {
            dispatch(fetchUpdateUser({
                token: token,
                userInfo: {
                    id: id,
                    nickName: nickName,
                    email: newEmail,
                    avatarLink: newAvatarLink,
                    name: newName,
                    birthDate: newBirthdate,
                    gender: newGender
                }
            }));
        }
    }

    React.useEffect(() => {
        if (token === null) {
            navigate("/log-in");
        }
    }, [navigate, token, dispatch, newBirthdate])

    return (
        <div>
            <Navbar/>
            <Container className={"mt-3"}>
                <Card>
                    <Card.Body>
                        <Row>
                            <Col md={3}>
                                <Image {...avatarLink === null ? {src: anonymousAvatar} : avatarLink}
                                       className={"img-fluid border"}/>
                            </Col>
                            <Col md={9}>
                                <h1 className={"card-title"}>{nickName}</h1>
                                <Form>
                                    <Row>
                                        <Form.Group className="mb-3 col-md">
                                            <Form.Label><b>Email</b></Form.Label>
                                            <Form.Control value={newEmail === null ? "" : newEmail}
                                                          onChange={(e) => setNewEmail(e.target.value)}
                                                          type={"email"}/>
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group className="mb-3 col-md">
                                            <Form.Label><b>Ссылка на аватар</b></Form.Label>
                                            <Form.Control value={newAvatarLink === null ? "" : newAvatarLink}
                                                          onChange={(e) => setNewAvatarLink(e.target.value)}
                                                          type={"text"}/>
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group className="mb-3 col-md">
                                            <Form.Label><b>ФИО</b></Form.Label>
                                            <Form.Control value={newName === null ? "" : newName}
                                                          onChange={(e) => setNewName(e.target.value)}
                                                          type={"text"}/>
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group className={"mb-3 col-md"}>
                                            <Form.Label><b>Дата рождения</b></Form.Label>
                                            <Form.Control type={"date"}
                                                          value={
                                                              newBirthdate === null
                                                                  ? 0
                                                                  : newBirthdate.split("T")[0]
                                                          }
                                                          onChange={(e) => setNewBirthDate(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group className={"mb-3 col-md"}>
                                            <Form.Label><b>Пол</b></Form.Label>
                                            <Form.Select value={newGender === null ? 0 : newGender}
                                                         onChange={(e) => setNewGender(Navbar(e.target.value))}>
                                                <option value={0}>Женщина</option>
                                                <option value={1}>Мужчина</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Row>
                                    <Button variant="warning" onClick={editHandler}>
                                        Редактировать
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default Profile;