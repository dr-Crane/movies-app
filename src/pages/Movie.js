import React from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchMovie} from "../store/reducers/movieReducer";
import Review from "../components/review";
import Navbar from "../components/navbar";
import ReviewForm from "../components/reviewForm";
import {fetchAddFavourite, fetchGetFavourites} from "../store/reducers/favouritesReducer";

const Movie = () => {
    const dispatch = useDispatch();
    const movie = useSelector(state => state.movieReducer.movie);
    const token = useSelector(state => state.userReducer.token);
    const nickName = useSelector(state => state.userReducer.nickName);
    const favourites = useSelector(state => state.favouritesReducer.movies);
    const {id} = useParams();

    let genres = [];
    for (let i = 0; i < movie.genres?.length; i++) {
        genres.push(movie?.genres[i].name);
    }

    const onAddFavouriteHandler = () => {
        dispatch(fetchAddFavourite({
            id: id,
            token: token
        }));
    }

    React.useEffect(() => {
        dispatch(fetchMovie(id));
        if (token !== null) {
            dispatch(fetchGetFavourites(token));
        }
    }, [dispatch, id, token, favourites])

    return (
        <div>
            <Navbar/>
            <Container className={"mt-3"}>
                <Card>
                    <Card.Body>
                        <Row>
                            <Image src={movie.poster} className={"col-md-4 img-fluid"}/>
                            <Col md={8}>
                                <h2 className={"card-title"}>{movie.name}</h2>
                                <p className={"card-subtitle"}>{movie.description}</p>
                                {
                                    token && favourites.find(movie => movie.id === id) === undefined
                                        ? <Button variant={"outline-primary"} className={"my-4"}
                                                  onClick={onAddFavouriteHandler}>Добавить в избранное +</Button>
                                        : null
                                }
                                <Row className={"mt-md-5"}>
                                    <Row>
                                        <h4>О фильме</h4>
                                    </Row>
                                    <Row>
                                        <div className={"d-flex justify-content-between"}>
                                            <span>Год производства</span>
                                            <span><b>{movie.year}</b></span>
                                        </div>
                                    </Row>
                                    <hr/>
                                    <Row>
                                        <div className={"d-flex justify-content-between"}>
                                            <span>Страна</span>
                                            <span><b>{movie.country}</b></span>
                                        </div>
                                    </Row>
                                    <hr/>
                                    <Row>
                                        <div className={"d-flex justify-content-between"}>
                                            <span>{genres?.length > 1 ? "Жанры" : "Жанр"}</span>
                                            <span><b>{genres.join(", ")}</b></span>
                                        </div>
                                    </Row>
                                    <hr/>
                                    <Row>
                                        <div className={"d-flex justify-content-between"}>
                                            <span>Время</span>
                                            <span><b>{movie.time} мин</b></span>
                                        </div>
                                    </Row>
                                    <hr/>
                                    <Row>
                                        <div className={"d-flex justify-content-between"}>
                                            <span>Слоган</span>
                                            <span><b>&laquo;{movie.tagline}&raquo;</b></span>
                                        </div>
                                    </Row>
                                    <hr/>
                                    <Row>
                                        <div className={"d-flex justify-content-between"}>
                                            <span>Режиссер</span>
                                            <span><b>{movie.director}</b></span>
                                        </div>
                                    </Row>
                                    <hr/>
                                    <Row>
                                        <div className={"d-flex justify-content-between"}>
                                            <span>Бюджет</span>
                                            <span><b>${new Intl.NumberFormat("ru").format(movie.budget)}</b></span>
                                        </div>
                                    </Row>
                                    <hr/>
                                    <Row>
                                        <div className={"d-flex justify-content-between"}>
                                            <span>Сборы в мире</span>
                                            <span><b>${new Intl.NumberFormat("ru").format(movie.fees)}</b></span>
                                        </div>
                                    </Row>
                                    <hr/>
                                    <Row>
                                        <div className={"d-flex justify-content-between align-items-center"}>
                                            <span>Возраст</span>
                                            <span className={"badge bg-secondary"}><b>{movie.ageLimit} +</b></span>
                                        </div>
                                    </Row>
                                    <hr/>
                                </Row>
                            </Col>
                        </Row>
                        <Row className={"mt-md-3"}>
                            <h4>Отзывы и оценки</h4>
                        </Row>
                        {
                            token !== null && movie?.reviews?.find(
                                review => review?.author?.nickName === nickName
                            ) === undefined
                                ? <Row md={"mt-3"}><Col><ReviewForm id={id}/></Col></Row>
                                : null
                        }
                        {
                            movie?.reviews?.map(value => {
                                return <Review isAnonymous={value.isAnonymous} author={value.author} key={value.id}
                                               nickName={value.nickName} reviewText={value.reviewText}
                                               dateTime={value.createDateTime} rating={value.rating}
                                               reviewId={value.id} movieId={id}/>
                            })
                        }
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default Movie;