import { Link } from "react-router-dom";

export default function Header () {
    return (
        <div className="header container-fluid my-3">
            <Link to= '/'>
                <img src="/img/CatwikiLogo.svg"/>
            </Link>
        </div>
    )
}
