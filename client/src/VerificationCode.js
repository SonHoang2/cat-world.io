import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { baseURL } from "./App";
import { useNavigate } from "react-router-dom";

export function VerificationCode () {
    const email = localStorage.getItem('email');
    const [OTP, setOTP] = useState('');
    const [OTPError, setOTPError] = useState('');
    const navigate = useNavigate();
    // const [expiredTime, setExpiredTime] = useState(0);

    useEffect(() => {
        if (!email) {
            navigate('/login');
        }
    })

    async function handleSubmit (e) {
        try {
            e.preventDefault();
            const res = await fetch(baseURL + '/check-verification-code', {
                method: 'POST',
                body: JSON.stringify({email, OTP}),
                credentials: 'include', 
                headers: {'Content-Type': 'application/json'},
            });
            const data = await res.json();
            if (data.errors) {
                setOTPError(data.errors.OTP)
            } else {
                localStorage.setItem('token_P', data.token_P);
                navigate('/reset-password')
                console.log(data);
                // setExpiredTime(120)
            }
        } catch (err) {
            console.log(err);
        }
    }

    function handleChange(e) {
        const {value} = e.target
        const result = value.replace(/\D/g, '');
        setOTP(result)
    }
    return (
        <motion.div 
            className='container-authen d-flex align-items-center justify-content-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{opacity: 0}}
        >
            <div className='authen border border-secondary rounded-5 shadow p-5'>
                <h3 className='mb-3 fw-semibold text-center'>Enter verification code</h3>
                <h5 className="text-secondary pb-3">We've sent a code to {email}</h5>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        inputMode="numeric"
                        maxLength='6'
                        className="w-100 text-center rounded border border-secondary"
                        onChange={(e) => handleChange(e)}
                        value={OTP}
                        placeholder="Enter the code"
                    />
                    <div className="invalid-feedback d-block">{OTPError}</div>
                    <h5 className="pt-3">The OTP will be expired in 120 sec </h5>
                    <button type="submit" className="btn btn-primary w-100 mt-3">Verify</button>
                </form> 
            </div>
        </motion.div>
    )
}