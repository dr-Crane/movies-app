import React from 'react';
import {Container, ListGroup} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import MoviesItem from "../components/moviesItem";
import {fetchMoviesPage, setCurrentPage} from "../store/reducers/moviesPageReducer";
import Paging from "../components/paging";
import {useParams} from "react-router-dom";
import Navbar from "../components/navbar";

const Movies = () => {
    const dispatch = useDispatch();
    const moviesPage = useSelector(state => state.moviesPageReducer.moviesPage);
    const currentPage = useSelector(state => state.moviesPageReducer.currentPage);
    const totalPage = useSelector(state => state.moviesPageReducer.totalPages);
    const token = useSelector(state => state.userReducer.token);
    const {id} = useParams();
    if(Number(id) !== undefined && Number(id) <= totalPage) {
        dispatch(setCurrentPage(Number(id)));
    }

    React.useEffect(() => {
        dispatch(fetchMoviesPage(currentPage));
    }, [currentPage, dispatch, token]);
    return (
        <div>
            <Navbar />
            <Container>
                <ListGroup className={"mt-3"}>
                    {
                        moviesPage.movies?.map(value => {
                            let rating = 0;
                            for (let i = 0; i < value.reviews.length; i++) {
                                rating = rating + value.reviews[i].rating;
                            }
                            rating = value.reviews.length > 0 ? (rating / value.reviews.length).toFixed(1) : 0;
                            let genres = []
                            for (let i = 0; i < value.genres.length; i++) {
                                genres.push(value.genres[i].name);
                            }
                            return <MoviesItem id={value.id} poster={value.poster} name={value.name} year={value.year}
                                               country={value.country} rating={rating} genres={genres.join()}
                                               key={value.poster}/>
                        })
                    }
                </ListGroup>
                <Paging totalPages={totalPage} currentPage={currentPage} dispatch={dispatch}/>
            </Container>
        </div>
    );
};

export default Movies;