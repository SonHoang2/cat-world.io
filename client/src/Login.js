import { Link, useNavigate } from "react-router-dom";
import { useState} from "react";
import { baseURL } from "./App";
import { motion } from "framer-motion";
import { useGoogleLogin } from '@react-oauth/google';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordType, setPasswordType] = useState("password");
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await fetch(baseURL + '/login', {
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
            if (data.jwt) {
                localStorage.setItem('jwt', data.jwt);
                navigate('/');
            }   
        }
        catch(err) {
            console.log(err);
        }
    }

    const login = useGoogleLogin({
        onSuccess: async tokenResponse => {
            const res = await fetch (`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${tokenResponse.access_token}`,
                    Accept: 'application/json'
                }
            })
            const data = await res.json();
            googleLogin(data)
        },
        flow: 'implicit',
        onError: () => {
            console.log('Login Failed');
        },
    })

    const googleLogin = async userData => {
        try {
            const {name, email} = userData;
            const res = await fetch(baseURL + '/login/google', {
                method: 'POST',
                body: JSON.stringify({name, email}),
                credentials: 'include', 
                headers: {'Content-Type': 'application/json'},
            });
            const data = await res.json();
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
                <h2 className='mb-5 fw-semibold text-center'>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className='w-100 border border-secondary rounded-3 d-flex align-items-center mt-3'>
                        <label className='d-flex py-2' htmlFor="email">
                            <i className="material-symbols-outlined icon px-2">mail</i>
                        </label>
                        <input 
                            className='authen__input rounded-3 py-2 border-0 h-100 flex-grow-1' 
                            type="text" 
                            placeholder='Email' 
                            id='email' 
                            name='email'
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
                            placeholder='Password' 
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
                    <motion.input
                        whileHover={{ opacity: 0.8 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        value='Login'
                        className='w-100 bg-primary text-white border-0 rounded-3 py-2 mt-3 mb-2'
                    />
                    <div className="d-flex justify-content-center py-3">
                        <Link to='/forgot-password' className='mx-2'>Forgot password?</Link>
                    </div>
                </form>
                <h5 className='text-center mb-3 text-gray'>or continue with these social profile</h5>
                <div className="social-contact d-flex justify-content-center mb-3">
                    <button className="btn btn-light border shadow-sm  w-100 d-flex align-items-center justify-content-center" onClick={() => login()}>
                        <img className="google-icon" src="/img/google-logo.png"/>
                        <span className="ps-2">Sign in with google</span>
                    </button>
                </div>
                <h5 className='text-center text-gray'>Don’t have an account yet? 
                    <Link to='/signup' className='mx-2'>Signup</Link>
                </h5>
            </div>
        </motion.div>
    )
}