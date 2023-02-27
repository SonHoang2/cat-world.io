import { Link } from "react-router-dom";
import Cookies from 'js-cookie'
import { useState } from "react";

export default function Header () {
    const [token, setToken] = useState(Cookies.get('jwt'));
    const [userBox, setUserBox] = useState(false)

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
                {token ?
                    <div className="user position-relative">
                        <div className="user__container-img" onClick={() => setUserBox(prev => !prev)}>
                            <img src="/img/user-image.jpg" className="user-img rounded-circle"/>
                        </div>
                        {userBox && 
                            <div className="user-box position-absolute bg-white rounded-3">
                                <div className="user-info d-flex align-items-center p-3">
                                    <img src="/img/user-image.jpg" className="user-img rounded-circle"/>
                                    <h4 className="user-name ps-3">Son Hoang</h4>
                                </div>
                                <div className="user-box__item--hover d-flex align-items-center p-3 rounded-3" onClick={() => {
                                    Cookies.remove('jwt');
                                    window.location.reload();
                                }}>
                                    <span className="material-symbols-outlined">logout</span>
                                    <h5 className="ps-2">Log Out</h5>
                                </div>
                            </div>
                        }
                    </div> :
                    <Link to="/login" className="text-decoration-none">
                        <div className="rounded btn">
                            <h4 className="text-white">Login</h4>
                        </div>
                    </Link>
                }
            </div>
        </div>
    )
}
