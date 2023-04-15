import Header from "./component/Header"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { baseURL } from "./App";
import { useState } from "react"

export default function EditUserProfile () {
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const userID = localStorage.getItem('user')
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await fetch(baseURL + '/user/edit', {
                method: 'POST',
                body: JSON.stringify({userID, name, bio, phone, email, password}),
                credentials: 'include', 
                headers: {'Content-Type': 'application/json'},
            });
            const data = await res.json();
            navigate("/login")
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
            <div className="container-md">
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
                            <img className="user-img" src="/img/user-image.png"/>
                        </div>
                        <button type="button" className="btn btn-primary">CHANGE PHOTO</button>
                    </div>
                    <div className="pt-4 d-flex flex-column">
                        <label className="form-label" htmlFor="user-name">Name</label>
                        <input 
                            type="text"
                            id='user-name'
                            className="form-control"
                            onChange={e => setName(e.target.value)}
                            placeholder='Enter your name...' 
                        />
                    </div>
                    <div className="pt-4 d-flex flex-column">
                        <label className="form-label" htmlFor="user-bio">Bio</label>
                        <input 
                            type="text" 
                            id='user-bio'
                            className="form-control"
                            onChange={e => setBio(e.target.value)}
                            placeholder='Enter your bio...' 
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
                        />
                    </div>
                    <div className="pt-4 d-flex flex-column">
                        <label className="form-label" htmlFor="user-email">Email</label>
                        <input
                            type="text" 
                            id='user-email'
                            className="form-control"
                            onChange={e => setEmail(e.target.value)}
                            placeholder='Enter your bio...' 
                        />
                    </div>
                    <div className="pt-4 d-flex flex-column">
                        <label className="form-label" htmlFor="user-password">Password</label>
                        <input
                            type="text" 
                            id='user-password'
                            className="form-control"
                            onChange={e => setPassword(e.target.value)}
                            placeholder='Enter your bio...' 
                        />
                    </div>
                    <motion.input
                        whileHover={{ opacity: 0.8 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        value='Save'
                        className='bg-primary text-white border-0 rounded-3 px-4 py-2 my-4'
                    />
                </form>
            </div>
        </div>
    )
}