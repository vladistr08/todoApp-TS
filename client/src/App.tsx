import React from "react";
import { Route, Routes} from "react-router-dom";
import {Register} from "./Register";
import {Login} from "./Login";
import Home from "./Home";
import './styles.css'

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/" element={<Login/>}/>
                <Route path="/home" element={<Home />}/>
            </Routes>
        </>

    )
};

export default App;