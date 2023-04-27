import { useState, useEffect, createContext} from "react"
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './Home';
import CatDetail from './CatDetail';
import './style.scss';
import Card from "./component/Card"
import MobileSearch from "./MobileSearch";
import Login from "./Login";
import Signup from "./Signup"
import { AnimatePresence } from "framer-motion";
import Cart from "./Cart"
import User from "./User";
import EditUserProfile from "./EditUserProfile";
import ErrorPage from "./ErrorPage";
import jwt_decode from "jwt-decode";

export const baseURL = process.env.REACT_APP_BASE_URL;
export const UserContext = createContext();

export default function App() {
    const [catData, setCatData] = useState([]);
    const [userData, setUserData] = useState({});
    const [seeMore, setSeeMore] = useState(true);
    const jwt = localStorage.getItem('jwt')
    const location = useLocation();
    // giỏ hàng 
    const [cart, setCart] = useState(() => {
        const storageJob = JSON.parse(localStorage.getItem('Cart'))
        return storageJob ?? []
    });
    const cards = () => {
        const arr = [];
        if (catData.length) {
            if (!seeMore) {
                for(let i = 0; i < 12; i++) {
                    arr.push(catData[i])
                }
            } else {
                for(let i = 0; i < 4; i++) {
                    arr.push(catData[i])
                }
            }
        }
        return arr.length && (
            arr.map(item => (
                <Card
                    key={item.id}
                    {...item}
                />
            ))
        )
    }
    const getCatData = async () => {
        try {
            const res = await fetch(baseURL + '/show', {
                method: "GET",
            })
            const data = await res.json();
            setCatData(data)
        }
        catch(err){
            if (err.message === 'Failed to fetch') {
                setTimeout(getCatData, 2000)
            }
        }
    }
    const getUserData = () => {
        if (jwt) {
            const decoded = jwt_decode(jwt);
            setUserData(decoded);
        }
    }    
    useEffect(() => {
        getCatData();

    }, [seeMore])

    useEffect(() => {
        getUserData();
    }, [jwt])
    return (
        <UserContext.Provider value={userData}>
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route 
                        path='/'
                        element={<Home 
                                    catData={catData}
                                    setCatData={setCatData}
                                    seeMore={seeMore}
                                    setSeeMore={setSeeMore}
                                    cards={cards()}
                                />} 
                    />
                    <Route 
                        path="/mobile-search"
                        element={<MobileSearch
                            catData={catData}
                        />}
                    />
                    {catData.map(item => (
                        <Route 
                            path={'/' + item.name}
                            key={item.name}
                            element={
                                <CatDetail
                                    {...item}
                                    catData={catData} 
                                    setCatData={setCatData}
                                    setCart={setCart}
                                    cart={cart}
                                />
                            }
                        />
                    ))}
                    {
                        jwt &&
                        <Route 
                            path="/cart"
                            element={<Cart cart={cart} setCart={setCart} />}
                        />
                    }
                    <Route 
                        path='/login'   
                        element={<Login />}
                    />
                    <Route 
                        path='/signup'   
                        element={<Signup />}
                    />
                    {
                        jwt &&
                        <Route
                            path='/user'
                            element={
                                <User
                                    {...userData}
                                />}
                        />
                    }
                    <Route 
                        path="/user/edit"
                        element={<EditUserProfile/>}
                    />
                    <Route
                        path='*'
                        element={<ErrorPage />}
                    />
                </Routes>
            </AnimatePresence>
        </UserContext.Provider>
    )
}