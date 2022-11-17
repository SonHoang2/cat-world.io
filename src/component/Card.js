import { Link } from "react-router-dom";

export default function Card(props) {
    return (
        <div className="pt-4 col-12 col-md-6 col-lg-3">
            <div className="pb-2 ">
                <Link to={'/' + props.name}> 
                    <div 
                        className="cat-img" 
                        style={{backgroundImage: `url(${props.image.url})`}}
                    />
                </Link>
            </div>
            <p className="text-center fw-bold">{props.name}</p>
        </div>
    )  
}