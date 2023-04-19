import Header from "./component/Header"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { baseURL } from "./App";
import { useState, useContext } from "react"
import { UserContext } from "./App";

export default function EditUserProfile () {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const userID = localStorage.getItem('user')
    const navigate = useNavigate();
    const user = useContext(UserContext);

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await fetch(baseURL + '/user/edit', {
                method: 'POST',
                body: JSON.stringify({userID, name, address, phone, email, password}),
                credentials: 'include', 
                headers: {'Content-Type': 'application/json'},
            });
            const data = await res.json();
            console.log(data);
            if (data.errors) {
                setEmailError(data.errors.email);
                setPasswordError(data.errors.password);
            }
            if (data === "success") {
                localStorage.removeItem('user')
                navigate("/login")
            }
        }
        catch(err) {
            console.log(err);
        }
    }
    if (!userID) {
        navigate('/login');
    }
    return (
        <div className="edit-user-profile">
            <Header/>
            <div className="pt-5"/>
            <div className="pt-5"/>
            <div className="pt-5"/>
            <motion.div 
                className="container-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{opacity: 0}
            }>
                <motion.div 
                    className="pb-4 previous-page"
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300}}
                >
                    <Link to="/user" className="text-decoration-none ">
                        <div className="d-flex">
                            <span className="material-symbols-outlined">navigate_before</span>
                            <h4>Back</h4>
                        </div>
                    </Link>
                </motion.div>
                <form onSubmit={handleSubmit} className="border border-dark border-opacity-25 p-5">
                    <h3 className="pb-2">Change Info</h3>
                    <h5 className="text-secondary">Changes will be reflected to every services</h5>
                    <div className="pt-4 d-flex align-items-center">
                        <div className="pe-5">
                            <img className="user-img rounded" src={user.avatar}/>
                        </div>
                        <button type="button" className="btn btn-primary">CHANGE PHOTO</button>
                    </div>
                    <div className="pt-4 d-flex flex-column">
                        <label className="form-label me-3" htmlFor="user-name">Name</label>
                        <input 
                            type="text"
                            id='user-name'
                            className="form-control"
                            onChange={e => setName(e.target.value)}
                            placeholder='Enter your name...' 
                            required
                        />
                    </div>
                    <div className="pt-4 d-flex flex-column">
                        <label className="form-label" htmlFor="user-address">Address</label>
                        <input 
                            type="text" 
                            id='user-address'
                            className="form-control"
                            onChange={e => setAddress(e.target.value)}
                            placeholder='Enter your address...' 
                        />
                    </div>
                    <div className="pt-4 d-flex flex-column">
                        <label className="form-label" htmlFor="user-phone">Phone</label>
                        <input
                            type="text" 
                            id='user-phone'
                            className="form-control"
                            onChange={e => setPhone(e.target.value)}
                            placeholder='Enter your phone...' 
                            required
                        />
                    </div>
                    <div className="pt-4 d-flex flex-column">
                        <label className="form-label" htmlFor="user-email">Email</label>
                        <input
                            type="text" 
                            id='user-email'
                            className="form-control"
                            onChange={e => setEmail(e.target.value)}
                            placeholder='Enter your Email...' 
                            required
                        />
                    </div>
                    <div className="invalid-feedback d-block">{emailError}</div>
                    <div className="pt-4 d-flex flex-column">
                        <label className="form-label" htmlFor="user-password">Password</label>
                        <input
                            type="text" 
                            id='user-password'
                            className="form-control"
                            onChange={e => setPassword(e.target.value)}
                            placeholder='Enter your Password...' 
                            required
                        />
                    </div>
                    <div className="invalid-feedback d-block">{passwordError}</div>
                    <motion.input
                        whileHover={{ opacity: 0.8 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        value='Save'
                        className='bg-primary text-white border-0 rounded-3 px-4 py-2 my-4'
                    />
                </form>
            </motion.div>
        </div>
    )
}