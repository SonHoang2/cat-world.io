import Header from "./component/Header"
import Footer from "./component/Footer"
import { useState } from "react"
import { useEffect} from "react"
import MobileSearch from "./MobileSearch";
import { Link } from "react-router-dom"

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
                    <div className="cat-wiki-content p-4 p-md-5 col-lg-6">
                        <img src="/img/CatwikiLogo.svg" className="cat-wiki-title" />
                        <p className="cat-wiki__text search-bar-mw mt-1 lh-sm">Get to know more about your cat breed</p>
                        <div className="search-bar search-bar-mw my-3">
                            {
                                window.innerWidth < 576 ?
                                    <Link to='/mobile-search'>
                                        <input 
                                            type="text" 
                                            placeholder='Search'
                                            name="catSearch"
                                            value={searchValue}
                                            className='search__input ps-3 pe-5 border-0'
                                            onChange={event => setSearchValue(event.target.value)}
                                        />
                                    </Link> : 
                                        <input 
                                            type="text" 
                                            placeholder='Enter your breed'
                                            name="catSearch"
                                            value={searchValue}
                                            className='search__input ps-3 pe-5 border-0'
                                            onChange={event => setSearchValue(event.target.value)}
                                        />
                            }
                            <div className="search-icon-holder mx-2 mx-sm-3">
                                <Link to={'/' + searchValue} className="d-flex text-decoration-none">
                                    <span class="material-symbols-outlined text-black">search</span>
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
                        <div>
                            <button className="border-0 bg-transparent d-flex align-items-center hover-effect" onClick={() => props.setSeeMore(prev => !prev)}>
                                <p className="color-btn p-1 fw-bold">SEE MORE</p>
                                <span className="material-symbols-outlined color-btn">trending_flat</span>
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
                        <div className="more-info d-inline-block mt-4">
                            <a className="text-decoration-none" href="https://animalkind.org/blog/top-5-reasons-cat/" target='_blank'>
                                <div className="border-0 d-flex align-items-center flex-row hover-effect">
                                    <p className="color-btn p-1 fw-bold">READ MORE</p>
                                    <span className="material-symbols-outlined color-btn">trending_flat</span>
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