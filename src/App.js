import React from "react";
import {Route, Routes} from "react-router-dom";
import Movie from "./pages/Movie";
import Movies from "./pages/Movies";
import Favourite from "./pages/Favourite";
import Profile from "./pages/Profile";
import Registration from "./pages/Registration";
import LogIn from "./pages/LogIn";


function App() {


    return (
        <div>
            <Routes>
                <Route path={'/'} element={<Movies/>}/>
                <Route path={'movies'} element={<Movies/>}/>
                <Route path={'movies/:id'} element={<Movies/>}/>
                <Route path={'movie/:id'} element={<Movie/>}/>
                <Route path={'favourite'} element={<Favourite/>}/>
                <Route path={'registration'} element={<Registration/>}/>
                <Route path={'log-in'} element={<LogIn/>}/>
                <Route path={'profile'} element={<Profile/>}/>
                <Route path={'*'} element={<Movies/>}/>
            </Routes>
        </div>
    );
}

export default App;
