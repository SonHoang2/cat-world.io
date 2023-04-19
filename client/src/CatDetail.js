import Header from "./component/Header"
import Footer from "./component/Footer"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import Evaluate from "./component/Evaluate"
import { motion } from "framer-motion"

export default function CatDetail(props) {
    const [count, setCount] = useState(1)
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    const stadiums = item => {
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
    const cards = () => {
        const arr = []
        for (let i = 0; i < 9; i++) {
            if (props.catData[i].id !== props.id) {
                arr.push(
                    <div className="col-md-6 col-lg-3 p-3 hover-img">
                        <Link to={'/' + props.catData[i].name}>
                            <motion.div 
                                whileHover={{y: -20}}
                                whileTap={{ scale: 1.1 }}
                                className="cat-img"
                                style={{backgroundImage: `url(img/${props.catData[i].image_url}.jpg)`}}
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
            <motion.div 
                className="mx-lg-5 pt-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{opacity: 0}}
            >
                <div className="container-fluid mt-3 pt-5 d-flex flex-column flex-lg-row ">
                    <div className="col-lg-5 px-lg-5">
                        <div>
                            <div
                                className='cat-img'
                                style={{backgroundImage: `url(img/${props.image_url}.jpg)`}} 
                            />
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <h2 className="py-3 pt-lg-0 fw-semibold">{props.name}</h2>
                        <p className="pb-3">{props.description}</p>
                        <Evaluate name="Temperament:" data={props.temperament}/>
                        <Evaluate name="Origin:" data={props.origin}/>
                        <Evaluate name="Life Span:" data={props.life_span} extra='years'/>
                        <Evaluate name="Price: " data={props.price} extra='$'/>
                        <Evaluate name="Goods in stock: " data={props.quantity}/>
                        <Evaluate name="Adaptability:" stadiums={stadiums(props.adaptability)} />
                        <Evaluate name="Affection level:" stadiums={stadiums(props.affection_level)} />
                        <Evaluate name="Child Friendly:" stadiums={stadiums(props.child_friendly)} />
                        <Evaluate name="Grooming:" stadiums={stadiums(props.grooming)} />
                        <Evaluate name="Intelligence:" stadiums={stadiums(props.intelligence)} />
                        <Evaluate name="Health issues:" stadiums={stadiums(props.health_issues)} />
                        <Evaluate name="Social needs:" stadiums={stadiums(props.social_needs)} />
                        <Evaluate name="Stranger friendly:" stadiums={stadiums(props.stranger_friendly)} />
                        <div className="">
                            <div className="d-flex align-items-center pb-3">
                                <h5 className="fw-bold d-inline pe-3">Quantity: </h5>
                                <button type="button" class="btn btn-primary py-0 border border-dark" onClick={() => {
                                    if (count > 1) {
                                        setCount(prev => prev - 1)
                                    }
                                }}>-</button>
                                <h4 className="px-2 mx-1 border border-dark rounded" >{count}</h4>
                                <button type="button" class="btn btn-primary py-0 border border-dark" onClick={() => {
                                    if (count < props.quantity) {
                                        setCount(prev => prev + 1)                               
                                    }
                                }}>+</button>
                            </div>
                            <motion.button 
                                whileHover={{ opacity: 0.8 }}
                                whileTap={{ scale: 0.95 }}
                                type="button" 
                                className="btn btn-primary d-flex align-items-center" 
                                onClick={() => {
                                    const item = {product: {id: props.id, name: props.name , price: props.price, image: props.image_url}, quantity: count, goodInStock: props.quantity}
                                    props.setCart(prev => {
                                        let newCart
                                        const found = prev.find(element => {
                                            return element.product.id === item.product.id
                                        });
                                        // cộng thêm số lượng hàng 
                                        if (found) {
                                            found.quantity += 1;
                                            newCart = [...prev]
                                        } else {
                                            newCart = [...prev, item]
                                        }
                                        // save to local storage
                                        const jsonCart = JSON.stringify(newCart)
                                        localStorage.setItem('Cart', jsonCart)
                                        return newCart
                                    }) 
                                }}
                            >
                                <span className="material-symbols-outlined pe-2">add_shopping_cart</span>
                                Add to cart
                            </motion.button>
                        </div>
                    </div>
                </div>
                <div className="container-fluid my-5">
                    <h2 className="fw-semibold">Other photos</h2>
                    <div className="row">
                        {cards()}
                    </div>
                </div>
                <Footer />
            </motion.div>
        </div>
    )
}
