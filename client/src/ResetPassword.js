import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { baseURL } from "./App";
import { useNavigate } from "react-router-dom";

export function ResetPassword () {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [passwordType, setPasswordType] = useState("password");
    const [isSuccess, setIsSuccess] = useState(false)
    const token_P = localStorage.getItem('token_P')
    const email = localStorage.getItem('email');
    const navigate = useNavigate()

    useEffect(() => {
        if (!token_P) navigate('/login')
    })
    async function handleSubmit(e) {
        try {
            e.preventDefault();
            const res = await fetch(baseURL + '/reset-password', {
                method: 'POST',
                body: JSON.stringify({email, password, confirmPassword, token_P}),
                credentials: 'include', 
                headers: {'Content-Type': 'application/json'},
            });
            const data = await res.json();
            console.log(data);
            if (data.errors) {
                setPasswordError(data.errors.password)
                setConfirmPasswordError(data.errors.confirmPassword)
            } else {
                setIsSuccess(true)
                localStorage.removeItem('email')
                localStorage.removeItem('token_P')
                localStorage.setItem('jwt', data.jwt)
                navigate('/')
            }
        } catch (err) {
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
            {isSuccess ?
                <div className='authen border border-secondary rounded-5 shadow p-5'>
                    <div className="d-flex justify-content-center pb-4">
                        <img className="icon" src="/img/tick.png"/>
                    </div>
                    <h4 className="fw-semibold text-center mb-3"> Password changed successfully!</h4>
                    <button type="submit" className="btn btn-primary w-100 mt-4" onClick={() => {
                        navigate('/')
                    }}>Go to homepage</button>
                </div> :
                <div className='authen border border-secondary rounded-5 shadow p-5'>
                    <h3 className="text-center pb-3 fw-semibold ">Set new password</h3>
                    <h5 className="text-center">Must be at least 6 characters</h5>
                    <form onSubmit={handleSubmit}>
                        <div className='w-100 border border-secondary rounded-3 d-flex align-items-center mt-4 position-relative'>
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
                        <div className='w-100 border border-secondary rounded-3 d-flex align-items-center mt-3 position-relative'>
                                <label className='d-flex py-2' htmlFor="Confirm-password">
                                    <i className="material-symbols-outlined icon px-2">lock</i>
                                </label>
                                <input 
                                    className='authen__input rounded-3 py-2 border-0 h-100 flex-grow-1' 
                                    type={passwordType}
                                    placeholder='Confirm password' 
                                    id='Confirm-password' 
                                    name='Confirm-password'
                                    autoComplete="on"
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    required
                                />
                                {confirmPassword.length >= 1 &&
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
                        <div className="invalid-feedback d-block">{confirmPasswordError}</div>
                        <button type="submit" className="btn btn-primary w-100 mt-3">Reset Password</button>
                    </form>
                </div>
            }
        </motion.div>
    )
}