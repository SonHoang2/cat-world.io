import Header from "./component/Header"
import Footer from "./component/Footer"
import { Link } from "react-router-dom"

export default function CatDetail(props) {
    function stadiums(item) {
        const arr = []
        const remain = 5 - item

        for (let i = 0; i < item; i++) {
            arr.push((
                <div className="stadium stadium--active">
                </div>
            ))
        }
        for (let i = 0; i < remain; i++) {
            arr.push((
                <div className="stadium stadium--inactive">
                </div>
            ))
        }
        return arr
    }
    function cards () {
        const arr = []
        for (let i = 0; i < 9; i++) {
            if (props.catData[i].id !== props.id) {
                arr.push(
                    <div className="card-img-container">
                        <Link to={'/' + props.catData[i].name}>
                            <div 
                                className="card-img" 
                                style={{backgroundImage: `url(${props.catData[i].image.url})`}}
                            />
                        </Link>
                    </div>
                )
            }
        }
        return arr;
    }

    return (
        <div className="app">
            <Header />
            <div className="cat-detail">
                <div className="cat-detail-img-holder">
                    <div
                        className='cat-detail-img'
                        style={{backgroundImage: `url(${props.image.url})`}} 
                    />
                </div>
                <div className="cat-detail-info">
                    <h3 className="cat-detail-name">{props.name}</h3>
                    <p className="cat-detail-description">{props.description}</p>
                    <p className="font-bold"> Temperament:
                        <span className="font-light">
                            {props.temperament}
                        </span>
                    </p>
                    <p className="font-bold"> Origin:
                        <span className="font-light">
                            {props.origin}
                        </span>
                    </p>
                    <p className="font-bold"> Life Span:
                        <span className="font-light">
                            {props.life_span} years
                        </span> 
                    </p>
                    <div className="font-bold cat-detail-evaluate"> Adaptability:
                        <div className="cat-detail-stadiums">
                            {stadiums(props.adaptability)}
                        </div>
                    </div>
                    <div className="font-bold cat-detail-evaluate"> Affection level:
                        <div className="cat-detail-stadiums">
                            {stadiums(props.affection_level)}
                        </div>
                    </div>
                    <div className="font-bold cat-detail-evaluate"> Child Friendly:
                        <div className="cat-detail-stadiums">
                            {stadiums(props.child_friendly)}
                        </div>
                    </div>
                    <div className="font-bold cat-detail-evaluate"> Grooming:
                        <div className="cat-detail-stadiums">
                            {stadiums(props.grooming)}
                        </div>
                    </div>
                    <div className="font-bold cat-detail-evaluate"> Intelligence:
                        <div className="cat-detail-stadiums">
                            {stadiums(props.intelligence)}
                        </div>
                    </div>
                    <div className="font-bold cat-detail-evaluate"> Health issues:
                        <div className="cat-detail-stadiums">
                            {stadiums(props.health_issues)}
                        </div>
                    </div>
                    <div className="font-bold cat-detail-evaluate"> Social needs:
                        <div className="cat-detail-stadiums">
                            {stadiums(props.social_needs)}
                        </div>
                    </div>
                    <div className="font-bold cat-detail-evaluate"> Stranger friendly:
                        <div className="cat-detail-stadiums">
                            {stadiums(props.stranger_friendly)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="cat-relevant">
                <div className="cat-relevant-title">Other photos</div>
                <div className="cat-breeds-content">
                    {cards()}
                </div>
            </div>
            <Footer />
        </div>
    )
}