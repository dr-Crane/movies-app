import React from 'react';
import {Badge, Button, Card, Col, Image, ListGroup, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {fetchRemoveFavourite} from "../store/reducers/favouritesReducer";

const FavouriteItem = (props) => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.userReducer.token);

    const onRemoveHandler = () => {
        dispatch(fetchRemoveFavourite({
            id: props.id,
            token: token
        }));
    }

    return (
        <ListGroup.Item>
            <Row className={"g-0"}>
                <Col md={1}>
                    <Image src={props.poster} className={"img-fluid"}/>
                </Col>
                <Col md={11}>
                    <Card.Body>
                        <div className={"ms-md-3 d-md-flex justify-content-between"}>
                            <div>
                                <h3 className={"card-title"}>{props.name}</h3>
                                <div className={"card-subtitle mt-sm-3 fs-md-5"}>{props.year}</div>
                                <div className={"card-text mt-sm-3 fs-md-5"}>
                                    <span>{props.country}  </span>
                                    <span>&bull;</span>
                                    <span>  {props.genres}</span>
                                </div>
                                <Badge bg={"primary"}>Средняя оценка - {props.rating}</Badge>
                            </div>
                            <div className={"my-md-auto"}>
                                <Button variant={"danger"} className={"px-md-5"} onClick={onRemoveHandler}>
                                    Удалить из <br/> избранного
                                </Button>
                            </div>
                        </div>
                    </Card.Body>
                </Col>
            </Row>
        </ListGroup.Item>
    );
};

export default FavouriteItem;