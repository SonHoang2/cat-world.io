import { Link } from "react-router-dom";

export default function Card(props) {
    return (
        <div className="card">
            <div className="card-img-container">
                <Link to={'/' + props.name}> 
                    <div 
                        className="card-img" 
                        style={{backgroundImage: `url(${props.image.url})`}}
                    />
                </Link>
            </div>
            <h2 className="card-title">{props.name}</h2>
        </div>
    )  
}