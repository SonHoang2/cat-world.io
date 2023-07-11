import Header from "./component/Header"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { baseURL } from "./App";
import { useState, useContext, useEffect } from "react"
import { UserContext } from "./App";

export default function EditUserProfile () {
    const {userData} = useContext(UserContext);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [change, setChange] = useState({
        name: false,
        address: false,
        phone: false,
        email: false,
        password: false,
    })
    const navigate = useNavigate();
    const jwt = localStorage.getItem('jwt')

    useEffect(() => {
        setName(userData.name);
        setAddress(userData.address);
        setPhone(userData.phone);
        setEmail(userData.email);
        setPassword(userData.password);
    }, [Object.keys(userData).length])

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const id = userData.id;
            const res = await fetch(baseURL + '/user/edit', {
                method: 'POST',
                body: JSON.stringify({id, name, address, phone, email, password}),
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
                localStorage.removeItem('jwt')
                navigate("/login")
            }
        }
        catch(err) {
            console.log(err);
        }
    }
    if (!jwt) {
        localStorage.removeItem('jwt')
        navigate('/login');
    }
    return (
        <div>
            <Header/>
            <div className="pt-5"/>
            <div className="pt-5"/>
            <div className="pt-5"/>
            <motion.div 
                className="container-md edit-user-profile"
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
                            <img className="user-img rounded" src={userData.avatar} referrerPolicy="no-referrer"/>
                        </div>
                        <Link to = "/upload/img">
                            <button type="button" className="btn btn-primary">CHANGE PHOTO</button>
                        </Link>
                    </div>
                    <div className="pt-4 d-flex flex-column">
                        {
                            change.name ?
                            <div className="d-flex flex-column">
                                <label className="form-label" htmlFor="user-name">Name</label>
                                <div className="d-flex">
                                    <input 
                                        type="text"
                                        id='user-name'
                                        className="form-control me-4"
                                        onChange={e => setName(e.target.value)}
                                        placeholder='Enter your name...' 
                                        required
                                    /> 
                                    <button type="button" className="btn btn-primary" onClick={() => setChange(prev => ({...prev, name: !prev.name}))}>Edit</button>
                                </div>
                            </div>:
                            <div className="d-flex align-items-center">
                                <label className="form-label m-0 me-5" htmlFor="user-name">Name</label>
                                <div className="d-flex align-items-center justify-content-between flex-grow-1">
                                    <h5>{userData.name}</h5>
                                    <button type="button" className="btn btn-primary" onClick={() => setChange(prev => ({...prev, name: !prev.name}))}>Edit</button>
                                </div>
                            </div>

                        }
                    </div>
                    <div className="pt-4 d-flex flex-column">
                        {
                            change.address ?
                            <div className="d-flex flex-column">
                                <label className="form-label" htmlFor="user-address">Address</label>
                                <div className="d-flex">
                                    <input 
                                        type="text"
                                        id='user-address'
                                        className="form-control me-4"
                                        onChange={e => setAddress(e.target.value)}
                                        placeholder='Enter your address...' 
                                        required
                                    />
                                    <button type="button" className="btn btn-primary" onClick={() => setChange(prev => ({...prev, address: !prev.address}))}>Edit</button>
                                </div>
                            </div>:
                            <div className="d-flex align-items-center">
                                <label className="form-label m-0 me-5" htmlFor="user-address">Address</label>
                                <div className="d-flex align-items-center justify-content-between flex-grow-1">
                                    <h5>{userData.address}</h5>
                                    <button type="button" className="btn btn-primary" onClick={() => setChange(prev => ({...prev, address: !prev.address}))}>Edit</button>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="pt-4 d-flex flex-column">
                        {
                            change.phone ?
                            <div className="d-flex flex-column">
                                <label className="form-label" htmlFor="user-phone">Phone</label>
                                <div className="d-flex">
                                    <input 
                                        type="text"
                                        id='user-phone'
                                        className="form-control me-4"
                                        onChange={e => setPhone(e.target.value)}
                                        placeholder='Enter your phone...' 
                                        required
                                    />
                                    <button type="button" className="btn btn-primary" onClick={() => setChange(prev => ({...prev, phone: !prev.phone}))}>Edit</button>
                                </div>
                            </div> :
                            <div className="d-flex align-items-center">
                                <label className="form-label m-0 me-5" htmlFor="user-phone">Phone</label>
                                <div className="d-flex align-items-center justify-content-between flex-grow-1">
                                    <h5>{userData.phone}</h5>
                                    <button type="button" className="btn btn-primary" onClick={() => setChange(prev => ({...prev, phone: !prev.phone}))}>Edit</button>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="pt-4 d-flex flex-column"> 
                    {
                            change.email ?
                            <div className="d-flex flex-column">
                                <label className="form-label" htmlFor="user-email">Email</label>
                                <div className="d-flex">
                                    <input 
                                        type="text"
                                        id='user-email'
                                        className="form-control me-4"
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder='Enter your email...' 
                                        required
                                    />
                                    <button type="button" className="btn btn-primary" onClick={() => setChange(prev => ({...prev, email: !prev.email}))}>Edit</button>
                                </div>
                            </div> :
                            <div className="d-flex align-items-center">
                                <label className="form-label m-0 me-5" htmlFor="user-email">Email</label>
                                <div className="d-flex align-items-center justify-content-between flex-grow-1">
                                    <h5>{userData.email}</h5>
                                    <button type="button" className="btn btn-primary" onClick={() => setChange(prev => ({...prev, email: !prev.email}))}>Edit</button>
                                </div>
                            </div>
                    }
                    </div>
                    <div className="invalid-feedback d-block">{emailError}</div>
                    <div className="pt-4 d-flex flex-column"> 
                    {       
                            change.password ?
                            <div className="d-flex flex-column">
                                <label className="form-label" htmlFor="user-password">Password</label>
                                <div className="d-flex">
                                    <input 
                                        type="text"
                                        id='user-password'
                                        className="form-control me-4"
                                        onChange={e => setPassword(e.target.value)}
                                        placeholder='Enter your password...' 
                                        required
                                    />
                                    <button type="button" className="btn btn-primary" onClick={() => setChange(prev => ({...prev, password: !prev.password}))}>Edit</button>
                                </div>
                            </div> :
                            <div className="d-flex align-items-center">
                                <label className="form-label m-0 me-5" htmlFor="user-password">Password</label>
                                <div className="d-flex align-items-center justify-content-between flex-grow-1">
                                    <h5>**********</h5>
                                    <button type="button" className="btn btn-primary" onClick={() => setChange(prev => ({...prev, password: !prev.password}))}>Edit</button>
                                </div>
                            </div>
                    }
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