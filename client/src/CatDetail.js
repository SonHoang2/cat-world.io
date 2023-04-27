import Header from "./component/Header"
import Footer from "./component/Footer"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import Evaluate from "./component/Evaluate"
import { motion } from "framer-motion"
import Slider from "react-slick"

export default function CatDetail(props) {
    const [increaseButton, setIncreaseButton] = useState(false);
    const [decreaseButton, setDecreaseButton] = useState(true);
    const [count, setCount] = useState(1);
    const [popup, setPopup] = useState(false);

    useEffect(() => {
        if(props.quantity == 1) {
            setIncreaseButton(true)
        }
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setPopup(false)
        }, 1000)
    }, [popup])

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
        const array = props.catData.map(item => {
            if (item.id !== props.id) {
                return (
                    <div className="px-4">
                        <div className="pb-2">
                            <Link to={'/' + item.name}> 
                                <motion.div
                                    className="cat-img"
                                    initial={{ opacity: 0 }}
                                    animate={{opacity: 1}}
                                    transition={{duration: 0.2}}
                                    whileHover={{filter: "grayscale(100%)"}}
                                    whileTap={{ scale: 0.95 }}
                                    style={{backgroundImage: `url(img/${item.image_url}.jpg)`}}
                                />
                            </Link>
                        </div>
                        <p className="text-center text-dark fw-bold">{item.name}</p>
                    </div>
                )  
            }
        })
        return array;
    }

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    arrows: false,
                    
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    arrows: false,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                }
            }
        ]
    };
  

    return (
        <div className="app">
            <Header />
            {   popup &&
                <div className="position-fixed w-100 h-100 d-flex justify-content-center align-items-center pop-up opacity-75 top-0">
                    <div className="p-4 bg-dark rounded">
                        <div className="d-flex justify-content-center pb-3">
                            <img className="icon" src="/img/tick.png"/>
                        </div>
                        <h5 className="text-white">The product has been added to cart</h5>
                    </div>
                </div>
            }
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
                                <div className="d-flex align-items-center increase-decrease-btn">
                                    <button type="button" disabled={decreaseButton} className="btn btn-primary py-0 border border-dark" onClick={() => {
                                        if (count > 2) {
                                            setCount(prev => prev - 1)
                                            setDecreaseButton(false);
                                            setIncreaseButton(false);
                                        } else if (count === 2) {
                                            setCount(prev => prev - 1);
                                            setIncreaseButton(false);
                                            setDecreaseButton(true);
                                        }
                                        else {
                                            setDecreaseButton(true);
                                        }
                                    }}>-</button>
                                    <input 
                                        type="number" 
                                        className="px-2 mx-1 border border-dark rounded text-center" 
                                        value={count} 
                                        onChange={(e) => {
                                            const number = Number(e.target.value);
                                            const quantity = Number(props.quantity)
                                            e.target.value = number
                                            console.log(e.target.value);
                                            if (number >= quantity) {
                                                setCount(quantity)
                                                setDecreaseButton(false);
                                                setIncreaseButton(true);
                                            } else {
                                                setCount(number)
                                                setDecreaseButton(false);
                                                setIncreaseButton(false);
                                        }}}
                                        onBlur={e => {
                                            const number = Number(e.target.value);
                                            e.target.value = number
                                            if (number < 1) {
                                                setCount(1)
                                                setDecreaseButton(true);
                                            } 
                                        }}
                                    />
                                    <button type="button" disabled={increaseButton} className="btn btn-primary py-0 border border-dark" onClick={() => {
                                        const quantity = Number(props.quantity)
                                        if (count < quantity - 1) {
                                            setCount(prev => prev + 1)
                                            setDecreaseButton(false);
                                            setIncreaseButton(false);
                                        } else if (count == quantity - 1) {
                                            setCount(prev => prev + 1);
                                            setIncreaseButton(true);
                                            setDecreaseButton(false);
                                        }
                                        else {
                                            setIncreaseButton(true);
                                        }
                                    }}>+</button>
                                </div>
                            </div>
                            <motion.button 
                                whileHover={{ opacity: 0.8 }}
                                whileTap={{ scale: 0.95 }}
                                type="button" 
                                className="btn btn-primary d-flex align-items-center" 
                                onClick={() => {
                                    const item = {product: {id: props.id, name: props.name , price: props.price, image: props.image_url}, quantity: count, goodInStock: props.quantity, decreaseButton: decreaseButton, increaseButton: increaseButton}
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
                                    // xuất hiện thông báo
                                    setPopup(true)
                                }}
                            >
                                <span className="material-symbols-outlined pe-2">add_shopping_cart</span>
                                Add to cart
                            </motion.button>
                        </div>
                    </div>
                </div>
                <div className="container-fluid my-5">
                    <h4 className="fw-semibold pb-3">Other photos</h4>
                    <Slider {...settings}> 
                        {cards()}
                    </Slider> 
                </div>
                <Footer />
            </motion.div>
        </div>
    )
}
