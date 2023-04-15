import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { baseURL } from "./App";
import { motion } from "framer-motion";


export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const res = await fetch(baseURL + '/signup', {
                method: 'POST',
                body: JSON.stringify({email, password}),
                credentials: 'include', 
                headers: {'Content-Type': 'application/json'},
            });
            const data = await res.json();
            if (data.errors) {
                setEmailError(data.errors.email);
                setPasswordError(data.errors.password);
            }
            if (data.user) {
                localStorage.setItem('user', data.user);
                navigate('/');
            }   
        }
        catch(err) {
            console.log(err);
        }
    }

    return (
        <motion.div 
            className='container-login d-flex align-items-center justify-content-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{opacity: 0}}
        >
            <div className='login p-5'>
            <h2 className='mb-5 fw-semibold text-center'>Sign up</h2>
                <form onSubmit={handleSubmit}>
                    <div className='w-100 border border-secondary rounded-3 d-flex align-items-center mt-3'>
                        <label className='d-flex py-2' htmlFor="email">
                            <i className="material-symbols-outlined icon px-2">mail</i>
                        </label>
                        <input 
                            className='login__input rounded-3 py-2 border-0 h-100 flex-grow-1' 
                            type="text" 
                            placeholder='Email' 
                            id='email' 
                            name='email'
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="invalid-feedback d-block">{emailError}</div>
                    <div className='w-100 border border-secondary rounded-3 d-flex align-items-center mt-3'>
                        <label className='d-flex py-2' htmlFor="Password">
                            <i className="material-symbols-outlined icon px-2">lock</i>
                        </label>
                        <input 
                            className='login__input rounded-3 py-2 border-0 h-100 flex-grow-1' 
                            type="text" 
                            placeholder='Password' 
                            id='Password' 
                            name='Password'
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="invalid-feedback d-block">{passwordError}</div>
                    <input 
                        type="submit"
                        value='Sign in'
                        className='w-100 bg-primary text-white border-0 rounded-3 py-2 my-4'
                    />
                </form>
                <h5 className='text-center mb-3 text-gray'>or continue with these social profile</h5>
                <div className="social-contact d-flex justify-content-center mb-3">
                    <div className='mx-2'>
                        <img src="./img/Google.svg" alt="" />
                    </div>
                    <div className='mx-2'>
                        <img src="./img/Facebook.svg" alt="" />
                    </div>
                    <div className='mx-2'>
                        <img src="./img/Gihub.svg" alt="" />
                    </div>
                    <div className='mx-2'>
                        <img src="./img/Twitter.svg" alt="" />
                    </div>
                </div>
                <h5 className='text-center text-gray'>Adready a member? 
                    <Link to='/login' className="mx-2"> 
                        Login
                    </Link>
                </h5>
            </div>
        </motion.div>
    )
}
