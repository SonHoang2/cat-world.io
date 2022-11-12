import Header from "./component/Header"
import Footer from "./component/Footer"
import { useState } from "react"
import { Link } from "react-router-dom"

export default function Home(props) {
    const [searchValue, setSearchValue] = useState("")

    const onSearch = searchTerm => {
        setSearchValue(searchTerm)
      }


    return (
        <div className="app">
            <Header />
            <div className="container">
                <div className="cat-wiki">
                    <div className="cat-wiki-content">
                        <img src="/img/CatwikiLogo.svg" className="cat-wiki-title" />
                        <div className="cat-wiki-text">Get to know more about your cat breed</div>
                        <div className="cat-wiki-search">
                            <a target='_blank'></a>
                            <input 
                                type="text" 
                                placeholder={window.innerWidth < 600 ? 'Search' : 'Enter your breed'}
                                name="catSearch"
                                value={searchValue}
                                onChange={event => setSearchValue(event.target.value)}
                            />
                            <div className="search-icon-holder">
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
                <div className="cat-breeds">
                    <h2 className="cat-breeds-top">Most Searched Breeds</h2>
                    <div className="cat-breeds-heading">
                        <h1 className="cat-breeds-title">66+ Breeds For you <br/> to discover</h1>
                        <div className="more-info more-info--bottom-left">
                            <button className="more-info--btn" onClick={() => props.setSeeMore(prev => !prev)}>
                                <h2 className="more-info-text">SEE MORE</h2>
                                <img src="/img/trending-flat.svg" className="more-info-icon"></img>
                            </button>
                        </div>
                    </div>
                    <div className="cat-breeds-content">
                        {props.cards}
                    </div>
                </div>
                <div className="cat-reason">
                    <div className="cat-reason-content">
                        <h1 className="cat-reason-content-title">Why should you have a cat?</h1>
                        <p className="cat-reason-content-text">
                            Having a cat around you can actually trigger the release of calming chemicals in your body which lower your stress and anxiety leves
                        </p>
                        <div className="more-info">
                            <a href="https://animalkind.org/blog/top-5-reasons-cat/" target='_blank'>
                                <div className="more-info--btn">
                                    <h2 className="more-info-text">READ MORE</h2>
                                    <img src="/img/trending-flat.svg" className="more-info-icon"></img>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="cat-reason-img-container">
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