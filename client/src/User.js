import Header from "./component/Header";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function User(props) {
    console.log(props);
    return (
        <div>
            <Header 
                {...props}
            />
            <div className="pt-5"/>
            <div className="pt-5"/>
            <div className="user-profile container-md">
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
                            <img className="img-fluid user-img" src="./img/user-image.png"/>
                        </div>
                    </div>
                    <div className="d-flex border-bottom border-end border-start border-dark border-opacity-25 py-4 px-5">
                        <h5 className="d-flex align-content-center text-secondary text-opacity-75 col-6 col-sm-4">NAME</h5>
                        <h5>{props.name}</h5>
                    </div>
                    <div className="d-flex border-bottom border-end border-start border-dark border-opacity-25 py-4 px-5">
                        <h5 className="d-flex align-content-center text-secondary text-opacity-75 col-6 col-sm-4">BIO</h5>
                        <h5>{props.bio}</h5>
                    </div>
                    <div className="d-flex border-bottom border-end border-start border-dark border-opacity-25 py-4 px-5">
                        <h5 className="d-flex align-content-center text-secondary text-opacity-75 col-6 col-sm-4">PHONE</h5>
                        <h5>{props.phone}</h5>
                    </div>
                    <div className="d-flex border-bottom border-end border-start border-dark border-opacity-25 py-4 px-5">
                        <h5 className="d-flex align-content-center text-secondary text-opacity-75 col-6 col-sm-4">EMAIL</h5>
                        <h5>{props.email}</h5>
                    </div>
                    <div className="d-flex border-bottom border-end border-start border-dark border-opacity-25 py-4 px-5 rounded-bottom">
                        <h5 className="d-flex align-content-center text-secondary text-opacity-75 col-6 col-sm-4">PASSWORD</h5>
                        <h5>************</h5>
                    </div>
                </div>
            </div>
            <div className="py-5"></div>
        </div>
    )
}