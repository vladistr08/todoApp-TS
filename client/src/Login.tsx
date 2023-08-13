import React, { FC, useState } from 'react';
import { loginUser } from "./api";
import { Link, Outlet, useNavigate } from "react-router-dom";

export const Login: FC = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = async () => {
        const result = await loginUser(username, password);
        console.log(result);
        if (result === undefined)
            navigate("/register");
        else
            navigate("/home", {
                state: {
                    userId: result
                }
            });
    };

    return (
        <>
        <div >
            <div className="section"></div>
            <main>
                <center>
                    <div className="section"></div>

                    <h5 className="blue-grey-text text-darken-4">Please, login into your account</h5>
                    <div className="section"></div>

                    <div className="container">
                        <div className="z-depth-1 blue-grey lighten-5 row">

                            <form className="col s12 blue-grey" method="post">
                                <div className='row'>
                                    <div className='col s12'>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='input-field col s12'>
                                        <input
                                            placeholder="Enter your username"
                                            className='input white-text'
                                            type='text'
                                            name='username'
                                            id='username'
                                            onChange={(e) => { setUsername(e.target.value) }}
                                        />
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='input-field col s12'>
                                        <input
                                            placeholder="Enter your password"
                                            className='input white-text'
                                            type='password'
                                            name='password'
                                            id='password'
                                            onChange={(e) => { setPassword(e.target.value) }}
                                        />
                                    </div>
                                </div>

                                <br />
                                <center>
                                    <div className='row center'>
                                        <div className="col s4 section"></div>
                                        <button type='button' name='btn_login' onClick={handleLogin}
                                                className='col s4 btn btn-large waves-effect blue-grey darken-3'>Login
                                        </button>
                                        <div className="col s4 section"></div>
                                    </div>
                                </center>
                            </form>
                        </div>
                    </div>
                    <Link to='/register' className="btn blue-grey darken-3 white-text">
                        Register
                    </Link>

                </center>

                <div className="section"></div>
                <div className="section"></div>
            </main>
        </div>
    <Outlet/>
</>
);
};
