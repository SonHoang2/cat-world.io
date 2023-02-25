import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import CatDetail from './CatDetail';
import './style.scss';
import Card from "./component/Card"
import MobileSearch from "./MobileSearch";
import Login from "./Login";
import Signup from "./Signup"

export const baseURL = "https://cat-world-io.vercel.app/";

export default function App() {
    const [catData, setCatData] = useState([])
    const [seeMore, setSeeMore] = useState(true)
    
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
    useEffect(() => {
        async function getCatData() {
            const res = await fetch(baseURL + '/show', {
                method: "GET",
            })
            const data = await res.json()
            setCatData(data)
        }
        getCatData()
    }, [seeMore])

    return (
        <BrowserRouter>
            <Routes>
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
                            />
                        }
                    />
                ))}
                <Route 
                    path='/login'   
                    element={<Login />}
                />
                <Route 
                    path='/signup'   
                    element={<Signup />}
                />
            </Routes>
        </BrowserRouter>
    )
}