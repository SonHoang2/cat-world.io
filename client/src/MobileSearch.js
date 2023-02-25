import { Link } from "react-router-dom"
import { useState } from "react"

export default function MobileSearch(props) {
    const [searchValue, setSearchValue] = useState("")

    const onSearch = searchTerm => {
        setSearchValue(searchTerm)
    }

    return (
        <div className="m-3">
            <div className="d-flex justify-content-end">
                <Link to='/'>
                    <span className="material-symbols-outlined p-2 bg-gray rounded text-dark">close</span>
                </Link>
            </div>
            <div className="search-bar mt-5">
                <input 
                    type="text" 
                    placeholder='Enter your breed'
                    name="catSearch"
                    value={searchValue}
                    className='search__input ps-3 pe-5'
                    onChange={event => setSearchValue(event.target.value)}
                />
                <div className="search-icon-holder mx-2 mx-sm-3">
                    <Link to={'/' + searchValue} className="d-flex text-decoration-none">
                        <span className="material-symbols-outlined text-black">search</span>
                    </Link>
                </div>
                <div className="mt-4">
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
    )
}