import {Badge, Card, Col, Image, ListGroup, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

function MoviesItem(props) {
    return (
        <ListGroup.Item>
            <Row className="g-0">
                <Col md={1}>
                    <Link style={{textDecoration: "none", color: "inherit"}} to={'/movie/' + props.id}>
                        <Image src={props.poster} className='img-fluid'></Image>
                    </Link>
                </Col>
                <Col md={11}>
                    <Card.Body>
                        <div className={"ms-md-3 d-md-flex justify-content-md-between"}>
                            <div>
                                <Link style={{textDecoration: "none", color: "inherit"}} to={'/movie/' + props.id}>
                                    <h5 className='card-title'>{props.name}</h5>
                                </Link>
                                <span className='card-subtitle'>{props.year}</span>
                                <div className='card-text'>
                                    <span>{props.country}</span>
                                    <span>&bull;</span>
                                    <span>{props.genres}</span>
                                </div>
                            </div>
                            <div className={"my-auto"}>
                                <Badge bg={"primary"}>Средняя оценка - {props.rating}</Badge>
                            </div>
                        </div>
                    </Card.Body>
                </Col>
            </Row>
        </ListGroup.Item>
    );
}

export default MoviesItem;