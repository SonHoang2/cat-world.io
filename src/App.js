import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import CatDetail from './catDetail';
import './style.css';
import Card from "./component/Card"

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
            const res = await fetch(`https://api.thecatapi.com/v1/breeds?limit=12&page=0`)
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
            </Routes>
        </BrowserRouter>
    )
}