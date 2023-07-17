import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { baseURL } from "./App";
import { motion } from "framer-motion";


export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordType, setPasswordType] = useState("password");
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const res = await fetch(baseURL + '/signup', {
                method: 'POST',
                body: JSON.stringify({name, email, password}),
                credentials: 'include', 
                headers: {'Content-Type': 'application/json'},
            });
            const data = await res.json();
            if (data.errors) {
                setEmailError(data.errors.email);
                setPasswordError(data.errors.password);
            }
            if (data.jwt) {
                localStorage.setItem('jwt', data.jwt);
                navigate('/');
            }    
        }
        catch(err) {
            console.log(err);
        }
    }

    return (
        <motion.div 
            className='container-authen d-flex align-items-center justify-content-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{opacity: 0}}
        >
            <div className='authen border border-secondary rounded-5 shadow p-5'>
            <h2 className='mb-5 fw-semibold text-center'>Sign up</h2>
                <form onSubmit={handleSubmit}>
                    <div className='w-100 border border-secondary rounded-3 d-flex align-items-center mt-3'>
                        <label className='d-flex py-2' htmlFor="Name">
                            <i className="material-symbols-outlined icon px-2">person</i>
                        </label>
                        <input 
                            className='authen__input rounded-3 py-2 border-0 h-100 flex-grow-1' 
                            type="text" 
                            placeholder='Name' 
                            id='Name' 
                            name='Name'
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className='w-100 border border-secondary rounded-3 d-flex align-items-center mt-3'>
                        <label className='d-flex py-2' htmlFor="Email">
                            <i className="material-symbols-outlined icon px-2">mail</i>
                        </label>
                        <input 
                            className='authen__input rounded-3 py-2 border-0 h-100 flex-grow-1' 
                            type="text" 
                            placeholder='Email' 
                            id='Email' 
                            name='Email'
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="invalid-feedback d-block">{emailError}</div>
                    <div className='w-100 border border-secondary rounded-3 d-flex align-items-center mt-3 position-relative'>
                        <label className='d-flex py-2' htmlFor="Password">
                            <i className="material-symbols-outlined icon px-2">lock</i>
                        </label>
                        <input 
                            className='authen__input rounded-3 py-2 border-0 h-100 flex-grow-1' 
                            type={passwordType}
                            placeholder='New password' 
                            id='Password' 
                            name='Password'
                            autoComplete="on"
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                        {password.length >= 1 &&
                            <div className="position-absolute top-25 end-0 me-2" >
                                {
                                    passwordType === "text" ?
                                    <button type="button" className="btn btn-light d-flex p-0 rounded-circle" onClick={() => {
                                        setPasswordType(prev => (prev === "password" ? "text" : "password"))
                                    }}>
                                        <span className="material-symbols-outlined">visibility</span>
                                    </button> : 
                                    <button type="button" className="btn btn-light d-flex p-0 rounded-circle" onClick={() => {
                                        setPasswordType(prev => (prev === "password" ? "text" : "password"))
                                    }}>
                                        <span className="material-symbols-outlined">visibility_off</span>
                                    </button>
                                }
                            </div>
                        }
                    </div>
                    <div className="invalid-feedback d-block">{passwordError}</div>
                    <input 
                        type="submit"
                        value='Sign in'
                        className='w-100 bg-primary text-white border-0 rounded-3 py-2 my-4'
                    />
                </form>
                <h5 className='text-center text-gray'>Adready a member? 
                    <Link to='/login' className="mx-2"> Login</Link>
                </h5>
            </div>
        </motion.div>
    )
}
