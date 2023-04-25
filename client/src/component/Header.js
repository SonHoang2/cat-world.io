import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useContext } from "react";
import { UserContext } from "../App";

export default function Header () {
    const [userBox, setUserBox] = useState(false)
    const jwt = localStorage.getItem('jwt');
    const user = useContext(UserContext);

    return (
        <div className="header container-fluid position-fixed bg-white py-2">
            <div className="mx-lg-5 d-flex align-items-center justify-content-between">
                <div>
                    <Link to='/' className="text-decoration-none text-black" onClick={() => window.scrollTo(0, 0)}>
                        <div className="d-flex align-items-baseline text-decoration-none">
                            <h2 className="cat-logo__text pe-1">CatWorld</h2>
                            <img src="/img/cat-world-logo.png" className="cat-logo__img"/>
                        </div>
                    </Link>
                </div>
                {jwt ?
                    <div className="user position-relative d-flex">
                        <motion.div 
                            whileTap={{ scale: 0.95 }}
                            transition={{duration: 0.1}}
                            className="d-flex align-items-center p-1 rounded hover-gray" 
                            onClick={() => setUserBox(prev => !prev)}
                        >
                            <div>
                                <img src={user.avatar || user.picture} className="user-img rounded-circle" referrerPolicy="no-referrer"/>
                            </div>
                            <h5 className="ps-2">{user.name}</h5>
                        </motion.div>
                        {userBox && 
                            <motion.div 
                                initial={{ opacity: 0.6 }}
                                animate={{ opacity: 1 }}
                                className="user-box position-absolute bg-white rounded-3 p-2"
                            >
                                <Link to='/user' className="text-decoration-none text-reset">
                                    <motion.div 
                                        whileTap={{ scale: 0.95 }}
                                        transition={{duration: 0.1}}
                                        className="hover-gray user-info d-flex align-items-center p-3 rounded-3"
                                    >   
                                        <span className="material-symbols-outlined">account_circle</span>
                                        <h5 className="ps-2">Profile</h5>
                                    </motion.div>
                                </Link>
                                <motion.div 
                                    whileTap={{ scale: 0.95 }}
                                    transition={{duration: 0.1}}
                                    className="hover-gray d-flex align-items-center p-3 rounded-3" 
                                    onClick={() => {
                                        localStorage.removeItem('jwt');
                                        window.location.reload(false);
                                    }}
                                >
                                    <span className="material-symbols-outlined text-danger">logout</span>
                                    <h5 className="ps-2 text-danger">Log Out</h5>
                                </motion.div>
                            </motion.div>
                        }
                        <div className="border m-3"></div>
                        <Link to="/cart" className="text-decoration-none text-reset">
                            <motion.div 
                                whileTap={{ scale: 0.95 }}
                                transition={{duration: 0.1}}
                                className="hover-gray user-info d-flex align-items-center p-3 rounded-3">
                                <span className="material-symbols-outlined">shopping_cart</span>
                            </motion.div>
                        </Link>
                    </div> :
                    <Link to="/login" className="text-decoration-none">
                        <motion.button 
                            className="rounded btn btn-primary d-flex align-items-center py-2"
                            whileHover={{ opacity: 0.8 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <h4 className="text-white">Login</h4>
                        </motion.button>
                    </Link>
                }
            </div>
        </div>
    )
}
