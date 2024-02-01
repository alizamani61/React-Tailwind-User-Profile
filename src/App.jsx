import { useEffect, useState } from "react";

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from "./Pages/Auth/Login";
import Home from "./Pages/Home";
import Layout from "./Layout";
import Register from "./Pages/Auth/Register";
import Edit from "./Pages/Profile/Edit";
import Images from "./Pages/Profile/Images";
import Skills from "./Pages/Profile/Skills";
import Portfolio from "./Pages/Profile/Portfolio";
import MyReducer from "./Pages/MyReducer";
import Hoc from "./Pages/Hoc";

const App = props => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        setIsLoading(false);
    }, []);


    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/profile" element={<Edit />} />
                        <Route path="/profile/images" element={<Images />} />
                        <Route path="/profile/skills" element={<Skills />} />
                        <Route path="/profile/portfolio" element={<Portfolio />} />
                        <Route path="/reducer" element={<MyReducer />} />
                        <Route path="/hoc" element={<Hoc />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Router>
        </>
    )
};
export default App;

