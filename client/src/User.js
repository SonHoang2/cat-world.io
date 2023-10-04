import Header from "./component/Header";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext} from "./App";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function User() {
    const {userData} = useContext(UserContext);
    const navigate = useNavigate();
    const checkPermission = () => {
        const jwt = localStorage.getItem('jwt')
        if (!jwt) {
            navigate('/login')
        }
    }
    useEffect(() => {
        checkPermission()
    }, [])
    
    return (
        <div>
            <Header />
            <div className="pt-5"/>
            <div className="pt-5"/>
            <motion.div 
                className="user-profile container-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{opacity: 0}}
            >
                <div className="text-center user-profile">
                    <h1 className="fw-normal pb-2">Personal info</h1>
                    <h4 className="fw-light">Basic info, like your name and photo</h4>
                </div>
                <div className="mt-5">
                    <div className="border border-dark border-opacity-25 rounded-top py-4 px-5 d-flex justify-content-between align-items-center">
                        <div>
                            <h3 className="pb-2">Profile</h3>
                            <h5 className="text-secondary">Some info may be visible to other people</h5>
                        </div>
                        <Link to="/user/edit">
                            <motion.button 
                                type="button" 
                                className="btn btn-primary btn-lg"
                                whileHover={{ opacity: 0.8 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 300}}
                            >
                                Edit
                            </motion.button>
                        </Link>
                    </div>
                    <div className="d-flex border-bottom border-end border-start border-dark border-opacity-25 py-4 px-5">
                        <h5 className="d-flex flex-wrap align-content-center text-secondary text-opacity-75 col-6 col-sm-4">PHOTO</h5>
                        <div>
                            <img className="img-fluid user-img rounded" src={userData.avatar} referrerPolicy="no-referrer"/>
                        </div>
                    </div>
                    <div className="d-flex border-bottom border-end border-start border-dark border-opacity-25 py-4 px-5">
                        <h5 className="d-flex align-content-center text-secondary text-opacity-75 col-6 col-sm-4">NAME</h5>
                        <h5>{userData.name}</h5>
                    </div>
                    <div className="d-flex border-bottom border-end border-start border-dark border-opacity-25 py-4 px-5">
                        <h5 className="d-flex align-content-center text-secondary text-opacity-75 col-6 col-sm-4">ADDRESS</h5>
                        <h5>{userData.address}</h5>
                    </div>
                    <div className="d-flex border-bottom border-end border-start border-dark border-opacity-25 py-4 px-5">
                        <h5 className="d-flex align-content-center text-secondary text-opacity-75 col-6 col-sm-4">PHONE</h5>
                        <h5>{userData.phone}</h5>
                    </div>
                    <div className="d-flex border-bottom border-end border-start border-dark border-opacity-25 py-4 px-5">
                        <h5 className="d-flex align-content-center text-secondary text-opacity-75 col-6 col-sm-4">EMAIL</h5>
                        <h5>{userData.email}</h5>
                    </div>
                    <div className="d-flex border-bottom border-end border-start border-dark border-opacity-25 py-4 px-5 rounded-bottom">
                        <h5 className="d-flex align-content-center text-secondary text-opacity-75 col-6 col-sm-4">PASSWORD</h5>
                        <h5>************</h5>
                    </div>
                </div>
            </motion.div>
            <div className="py-5"></div>
        </div>
    )
}