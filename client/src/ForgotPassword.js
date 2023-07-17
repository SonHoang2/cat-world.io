import { motion } from "framer-motion";
import { useState } from "react";
import { baseURL } from "./App";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword () {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const navigate = useNavigate();

    async function handleSubmit (e) {
        try {
            e.preventDefault();
            const res = await fetch(baseURL + '/forgot-password', {
                method: 'POST',
                body: JSON.stringify({email}),
                credentials: 'include', 
                headers: {'Content-Type': 'application/json'},
            });
            const data = await res.json();
            if (data.errors) {
                setEmailError(data.errors.email);
            } else {
                setEmailError("");
                navigate('/verification-code');
                localStorage.setItem('email', email);
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
            <div className='authen border border-secondary rounded-5 shadow p-5'>
                <h3 className='mb-3 fw-semibold text-center'>Find your account</h3>
                <h5 className="text-secondary">Enter the email associated with your account to change your password.</h5>
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
                    <div className="p-3"></div>
                    <button type="submit" className="btn btn-primary w-100">Next</button>
                </form>
            </div>
        </motion.div>
    )
}