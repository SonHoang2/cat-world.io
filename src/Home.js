import Header from "./component/Header"
import Footer from "./component/Footer"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useEffect } from "react"

export default function Home(props) {
    const [searchValue, setSearchValue] = useState("")
    const [display, setDisplay] = useState({
        windowInnerWidth: window.innerWidth,
    })

    const onSearch = searchTerm => {
        setSearchValue(searchTerm)
    }

    useEffect(() => {
        window.addEventListener("resize", () => setDisplay({
            windowInnerWidth: window.innerWidth,
        }));
    }, []);

    return (
        <div className="app mx-lg-5">
            <Header />
            <div className="container-fluid">
                <div className="cat-wiki">
                    <div className="cat-wiki-content p-4 p-md-5">
                        <img src="/img/CatwikiLogo.svg" className="cat-wiki-title" />
                        <p className="cat-wiki__text col-6 col-md-4 mt-1 lh-sm">Get to know more about your cat breed</p>
                        <div className="cat-wiki__search col-5 my-3">
                            <a target='_blank'></a>
                            <input 
                                type="text" 
                                placeholder={window.innerWidth < 768 ? 'Search' : 'Enter your breed'}
                                name="catSearch"
                                value={searchValue}
                                className='cat-wiki__input px-3'
                                onChange={event => setSearchValue(event.target.value)}
                            />
                            <div className="search-icon-holder mx-2 mx-sm-3">
                                <Link to={'/' + searchValue}>
                                    <img className="search-icon" src="/img/search-icon.svg"></img>
                                </Link>
                            </div>
                            <div className="search-dropdown">
                            {
                                props.catData.length &&
                                props.catData
                                    .filter(item => {
                                    const searchTerm = searchValue.toLocaleLowerCase();
                                    const name = item.name.toLocaleLowerCase();
                                
                                    return (
                                        searchTerm &&
                                        name.startsWith(searchTerm) &&
                                        name !== searchTerm
                                    )
                                    })
                                    .slice(0, 10)
                                    .map(item => (
                                    <div 
                                        onClick={() => onSearch(item.name)}
                                        className="search-dropdown-row"
                                        key={item.id}
                                    >
                                        {item.name}
                                    </div>
                                    ))
                            }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cat-breeds p-4 px-md-5">
                    <p className="cat-breeds-top">Most Searched Breeds</p>
                    <div className="cat-breeds-heading d-flex flex-row justify-content-between align-items-end">
                        <h1 className="cat-breeds-title fw-bold mt-3 lh-sm">66+ Breeds For you <br/> to discover</h1>
                        {
                        window.innerWidth > 992 &&
                        <div className="more-info">
                            <button className="more-info--btn bg-transparent d-flex align-items-center" onClick={() => props.setSeeMore(prev => !prev)}>
                                <p className="more-info-text fw-bold">SEE MORE</p>
                                <img src="/img/trending-flat.svg" className="more-info-icon"></img>
                            </button>
                        </div>
                        }
                    </div>
                    <div className="cat-breeds-content row">
                        {props.cards}
                    </div>
                </div>
                <div className="cat-reason mb-4 d-flex flex-column flex-lg-row my-5">
                    <div className="cat-reason-content col-lg-6 p-lg-5 ">
                        <h1 className="fw-bold lh-sm">Why should you have a cat?</h1>
                        <p className="pt-5 lh-sm">
                            Having a cat around you can actually trigger the release of calming chemicals in your body which lower your stress and anxiety leves
                        </p>
                        <div className="more-info col-6 mt-4">
                            <a className="text-decoration-none" href="https://animalkind.org/blog/top-5-reasons-cat/" target='_blank'>
                                <div className="more-info--btn d-flex align-items-center flex-row">
                                    <p className="more-info-text fw-bold">READ MORE</p>
                                    <img src="/img/trending-flat.svg" className="more-info-icon"></img>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="cat-reason-img-container my-5 my-lg-0">
                        <div className="cat-reason-img-container-left">
                            <img src="./img/cat2.png" className="cat-reason-img cat-reason-img--1" />
                            <img src="./img/cat1.png" className="cat-reason-img cat-reason-img--2" />
                        </div>
                        <div className="cat-reason-img-container-right">
                            <img src="./img/cat3.png" className="cat-reason-img cat-reason-img--3" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}