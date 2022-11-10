import React from 'react';
import {Container, ListGroup} from "react-bootstrap";
import Navbar from "../components/navbar";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import FavouriteItem from "../components/favouriteItem";
import {fetchGetFavourites} from "../store/reducers/favouritesReducer";

const Favourite = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.userReducer.token);
    const movies = useSelector(state => state.favouritesReducer.movies);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (token === null) {
            navigate("/log-in");
        }
        if (token !== null){
            dispatch(fetchGetFavourites(token));
        }
    }, [navigate, token, movies, dispatch])

    return (
        <div>
            <Navbar/>
            <Container>
                <ListGroup className={"mt-3"}>
                    {
                        movies.length === 0
                            ? <h1>There's no movies yet.</h1>
                            : movies.map(value => {
                                let rating = 0;
                                for (let i = 0; i < value.reviews.length; i++) {
                                    rating = rating + value.reviews[i].rating;
                                }
                                rating = value.reviews.length > 0 ? (rating / value.reviews.length).toFixed(1) : 0;
                                let genres = []
                                for (let i = 0; i < value.genres.length; i++) {
                                    genres.push(value.genres[i].name);
                                }
                                return <FavouriteItem poster={value.poster} name={value.name} year={value.year}
                                                      country={value.country} genres={genres.join()} rating={rating}
                                                      key={value.poster} id={value.id}/>
                            })
                    }
                </ListGroup>
            </Container>
        </div>
    );
};

export default Favourite;