import React from 'react';
import {Nav, Navbar} from "react-bootstrap";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchLogout, fetchUserProfile} from "../store/reducers/userReducer";

const MoviesNavbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const nickName = useSelector(state => state.userReducer.nickName);
    const token = useSelector(state => state.userReducer.token);
    const location = useLocation();

    const logoutHandler = () => {
        dispatch(fetchLogout(token));
        navigate("/");
    }

    React.useEffect(() => {
        if (token !== null) {
            dispatch(fetchUserProfile(token));
        }
    }, [token, nickName, dispatch])

    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand as={Link} to="/movies" className="ms-4">Movies Catalog</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/movies" {...(location.pathname.includes("/movies")
                            ? {active: true} : {active: false})}>Фильмы</Nav.Link>
                        <Nav.Link as={Link} to="/favourite" {...(location.pathname.includes("/favourite")
                            ? {active: true} : {active: false})}>Избранное</Nav.Link>
                        <Nav.Link as={Link} to="/profile" {...(location.pathname.includes("/profile")
                            ? {active: true} : {active: false})}>Мой
                            профиль</Nav.Link>
                    </Nav>
                    <Nav className="me-3">
                        <Nav.Link active="true" {...(nickName ? {disabled: true} : {
                            as: Link,
                            to: "/log-in"
                        })}>{nickName !== null ? "Авторизован как - ".concat(nickName) : "Вход"}</Nav.Link>
                        <Nav.Link active="true" {...(nickName ? {onClick : logoutHandler} : {
                            as: Link,
                            to: "/registration"
                        })}>{nickName !== null ? "Выход" : "Регистрация"}</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default MoviesNavbar;