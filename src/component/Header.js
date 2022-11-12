import { Link } from "react-router-dom";

export default function Header () {
    return (
        <div className="header">
            <Link to= '/'>
                <img src="/img/CatwikiLogo.svg" className="header--logo"/>
            </Link>
        </div>
    )
}
