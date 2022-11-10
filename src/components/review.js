import React, {useState} from 'react';
import {Badge, Button, Card, Col, Form, Image, Modal, Row} from "react-bootstrap";
import anonAvatar from "../images/userAvatar.jpg"
import {useDispatch, useSelector} from "react-redux";
import {fetchEditReview, fetchRemoveReview} from "../store/reducers/movieReducer";

const Review = (props) => {
    const dispatch = useDispatch();
    const nickName = useSelector(state => state.userReducer.nickName);
    const token = useSelector(state => state.userReducer.token);

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [text, setText] = useState("");
    const [rating, setRating] = useState(10);
    const [anonymous, setAnonymous] = useState(false);

    const onRemoveHandler = () => {
        dispatch(fetchRemoveReview({
            token : token,
            reviewId : props.reviewId,
            movieId : props.movieId
        }));
    }

    const onEditHandler = () => {
        dispatch(fetchEditReview({
            reviewId : props.reviewId,
            movieId : props.movieId,
            token : token,
            review : {
                reviewText: text,
                rating : rating,
                isAnonymous: anonymous
            }
        }));
        handleClose();
    }

    return (
        <Row className={"mt-3"}>
            <Col>
                <Card border={Number(props.rating) > 5 ? "success" : "danger"}>
                    <Card.Header>
                        <div className={"d-flex justify-content-between"}>
                            <div className={"my-auto"}>
                                <Image src={props.isAnonymous || props.author.avatar === null
                                    ? anonAvatar : props.author.avatar}
                                       className={"col rounded-circle"} style={{width: 50, height: 50}}/>
                                <span
                                    className={"col my-auto ms-3"}><b>{props.isAnonymous
                                    ? "Анонимный пользователь" : props?.author.nickName}</b></span>
                            </div>
                            <div className={"my-auto"}>
                                <div>Оценка: <Badge
                                    bg={Number(props.rating) > 5 ? "success" : "danger"}>{Number(props.rating)}</Badge>
                                </div>
                                <div>Дата отзыва: {new Date(Date.parse(props.dateTime)).toLocaleDateString("ru")}</div>
                            </div>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <div className={Number(props.rating) > 5 ? "text-success" : "text-danger"}>
                            {props.reviewText}
                        </div>
                    </Card.Body>
                    {
                        (nickName !== null && nickName === props.author?.nickName)
                        &&
                        <Card.Footer>
                            <Button variant={"warning"} onClick={handleShow}>
                                Редактировать
                            </Button>
                            <Button variant={"danger"} className={"ms-1"} onClick={onRemoveHandler}>
                                Удалить
                            </Button>

                            <Modal size={"lg"} centered={true} show={show} onHide={handleClose}>
                                <Modal.Header closeButton={true}>
                                    <Modal.Title>Редактировать отзыв</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label><b>Текст отзыва</b></Form.Label>
                                            <Form.Control as={"textarea"} rows={2} value={text}
                                                          onChange={(e) => setText(e.target.value)}/>
                                        </Form.Group>

                                        <Form.Group className={"mb-3"}>
                                            <Form.Label><b>Оценка</b></Form.Label>
                                            <Form.Select value={rating}
                                                         onChange={(e) => setRating(Number(e.target.value))}>
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                                <option value={4}>4</option>
                                                <option value={5}>5</option>
                                                <option value={6}>6</option>
                                                <option value={7}>7</option>
                                                <option value={8}>8</option>
                                                <option value={9}>9</option>
                                                <option value={10}>10</option>
                                            </Form.Select>
                                        </Form.Group>

                                        <Form.Check type={"checkbox"} value={anonymous}
                                                    onChange={(e) => setAnonymous(e.target.checked)}
                                                    label={"Оставить анонимный отзыв"}/>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant={"primary"} onClick={onEditHandler}>Сохранить</Button>
                                    <Button variant={"secondary"} onClick={handleClose}>Отмена</Button>
                                </Modal.Footer>
                            </Modal>
                        </Card.Footer>
                    }
                </Card>
            </Col>
        </Row>
    );
};

export default Review;