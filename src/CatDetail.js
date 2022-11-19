import Header from "./component/Header"
import Footer from "./component/Footer"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import Evaluate from "./component/Evaluate"

export default function CatDetail(props) {
    useEffect(() => {
        window.scrollTo(0, 0)
    })

    function stadiums(item) {
        const arr = []
        const remain = 5 - item

        for (let i = 0; i < item; i++) {
            arr.push((
                <div className="stadium stadium--active me-1 me-sm-2">
                </div>
            ))
        }
        for (let i = 0; i < remain; i++) {
            arr.push((
                <div className="stadium stadium--inactive me-1 me-sm-2">
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
                    <div className="col-md-6 col-lg-3 p-3">
                        <Link to={'/' + props.catData[i].name}>
                            <div 
                                className="cat-img" 
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
        <div className="app mx-lg-5">
            <Header />
            <div className="container-fluid mt-5 d-flex flex-column flex-lg-row ">
                <div className="col-lg-5 px-lg-5">
                    <div>
                        <div
                            className='cat-img '
                            style={{backgroundImage: `url(${props.image.url})`}} 
                        />
                    </div>
                </div>
                <div className="col-lg-7">
                    <h2 className="py-3 pt-lg-0 fw-semibold">{props.name}</h2>
                    <p className="pb-3">{props.description}</p>

                    <Evaluate name="Temperament:" data={props.temperament}/>
                    <Evaluate name="Origin:" data={props.origin}/>
                    <Evaluate name="Life Span:" data={props.life_span} extra='years'/>
                    <Evaluate name="Adaptability:" stadiums={stadiums(props.adaptability)} />
                    <Evaluate name="Affection level:" stadiums={stadiums(props.affection_level)} />
                    <Evaluate name="Child Friendly:" stadiums={stadiums(props.child_friendly)} />
                    <Evaluate name="Grooming:" stadiums={stadiums(props.grooming)} />
                    <Evaluate name="Intelligence:" stadiums={stadiums(props.intelligence)} />
                    <Evaluate name="Health issues:" stadiums={stadiums(props.health_issues)} />
                    <Evaluate name="Social needs:" stadiums={stadiums(props.social_needs)} />
                    <Evaluate name="Stranger friendly:" stadiums={stadiums(props.stranger_friendly)} />

                </div>
            </div>
            <div className="container-fluid my-5">
                <h2 className="fw-semibold">Other photos</h2>
                <div className="row">
                    {cards()}
                </div>
            </div>
            <Footer />
        </div>
    )
}
