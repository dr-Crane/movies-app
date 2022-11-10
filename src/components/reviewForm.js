import React, {useState} from 'react';
import {Button, Card, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {fetchPostReview} from "../store/reducers/movieReducer";

const ReviewForm = (id) => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.userReducer.token);
    const [text, setText] = useState("");
    const [rating, setRating] = useState(10);
    const [anonymous, setAnonymous] = useState(false);

    const handleReview = () => {
        dispatch(fetchPostReview({
            id : id,
            token : token,
            review : {
                reviewText : text,
                rating : rating,
                isAnonymous : anonymous
            }
        }));
    }

    return (
        <Card>
            <Card.Header>Добавить отзыв</Card.Header>
            <Card.Body>
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
                    <Button variant={"primary"} onClick={handleReview}>Сохранить</Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default ReviewForm;