import Header from "./component/Header"
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Cart(props) {
    const navigate = useNavigate();
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [popup, setPopup] = useState(false);
    const [buyErr, setBuyErr] = useState('')
    useEffect(() => {
        setTimeout(() => {
            setPopup(false)
        }, 3000)
    }, [popup])

    const cartList = () => {
        const arr = props.cart.map(item => (
            <div key={item.product.id} className="d-flex pb-4 align-items-center">
                <div className="col-5 d-flex">
                    <div className="d-flex align-items-center col-1">
                        <input 
                            className="form-check-input" 
                            type="checkbox"
                            checked={isCheck.some(element => element.id === item.product.id)}
                            onChange={(e) => {
                                const { checked } = e.target;
                                const obj = {id: item.product.id, price: item.product.price, quantity: item.quantity}
                                setIsCheck([...isCheck, obj]);
                                if (!checked) {
                                    setIsCheck(isCheck.filter(element => element.id !== obj.id));
                                }
                                if (checked) {
                                    setSubtotal(prev => { 
                                        let recentValue = prev + parseInt(item.quantity * item.product.price);
                                        setTotal(recentValue);
                                        return recentValue;
                                    })
                                } else {
                                    setSubtotal(prev => { 
                                        let recentValue = prev - parseInt(item.quantity * item.product.price);
                                        setTotal(recentValue);
                                        return recentValue;
                                    })
                                }
                        }}/>
                    </div>
                    <Link to={'/' + item.product.name} className="text-reset text-decoration-none d-flex">
                        <div className="pe-3">
                            <img src={`/img/` + item.product.image + '.jpg'} className="product-img rounded"/>
                        </div>
                        <h4 className="pt-1">{item.product.name}</h4>
                    </Link>
                </div>
                <h4 className="col-2">{item.product.price}$</h4>
                <div className="col-2 d-flex align-items-center increase-decrease-btn">
                    <button type="button" className="btn btn-primary py-0 border border-dark" onClick={() => {
                        

                        props.setCart(prev => {
                            let newCart
                            const found = prev.find(element => {
                                return element.product.id === item.product.id
                            });
                            // cộng thêm số lượng hàng
                            if (found.quantity > 0) {
                                found.quantity -= 1
                            }
                            newCart = [...prev]
                            // save to local storage
                            const jsonCart = JSON.stringify(newCart)
                            localStorage.setItem('Cart', jsonCart)
                            return newCart
                        }) 
                    }}>-</button>
                    <h4 className="px-2 mx-1 border border-dark rounded" >{item.quantity}</h4>
                    <button type="button" className="btn btn-primary py-0 border border-dark" onClick={() => {
                        props.setCart(prev => {
                            let newCart
                            const found = prev.find(element => {
                                return element.product.id === item.product.id
                            });
                            // cộng thêm số lượng hàng
                            if (found.quantity < found.goodInStock) {
                                found.quantity += 1
                            }
                            newCart = [...prev]
                            // save to local storage
                            const jsonCart = JSON.stringify(newCart)
                            localStorage.setItem('Cart', jsonCart)
                            return newCart
                        }) 
                    }}>+</button>
                </div>
                <h4 className="col-2">{item.quantity * item.product.price}$</h4>
                <motion.button 
                    type="button" 
                    className="btn btn-light p-1"
                    whileHover={{ opacity: 0.8 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300}}
                    onClick={() => {
                        const newCart = props.cart.filter(element => element.product.id !== item.product.id)
                        props.setCart(newCart)
                        const jsonCart = JSON.stringify(newCart)
                        localStorage.setItem('Cart', jsonCart)
                }}
                >
                    <span className="material-symbols-outlined">delete</span>
                </motion.button>
            </div>
        ))
        return arr
    }
    return (
        <div className="cart">
            <Header /> 
            <div className="pt-5"/>
            <div className="pt-5"/>
            {   popup &&
                <div className="position-fixed w-100 h-100 d-flex justify-content-center align-items-center pop-up opacity-75 top-0">
                    <div className="p-4 bg-dark rounded">
                        <div className="d-flex justify-content-center pb-3">
                            <img className="icon" src="/img/tick.png"/>
                        </div>
                        <h5 className="text-white">Thank for Shopping</h5>
                    </div>
                </div>
            }
            <motion.div 
                className="user-profile container-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{opacity: 0}}
            >
                <h3 className="py-3">Cart</h3>
                {props.cart.length ? 
                <div className="d-flex">
                    <div className="col-9">
                        <div className="d-flex p-3 mb-4 bg-white rounded">
                            <div className="col-5 d-flex">
                                <div className="col-1">
                                    <input className="form-check-input" type="checkbox" id="flexCheckAll" checked={isCheckAll} onChange={() => {
                                        setIsCheckAll(!isCheckAll);
                                        let array = props.cart.map(item => {
                                            const obj = {id: item.product.id, price: item.product.price, quantity: item.quantity}
                                            return obj
                                        })
                                        setIsCheck(array);
                                        if (isCheckAll) {
                                            setIsCheck([]);
                                            setSubtotal(0);
                                            setTotal(0);
                                        } else {
                                            const sum = array.reduce((accumulator, currentValue) => {
                                                return accumulator + currentValue.price * currentValue.quantity
                                            } , 0)
                                            setSubtotal(sum);
                                            setTotal(sum)
                                        }
                                    }}/>
                                </div>
                                <div>
                                    <label className="form-check-label" htmlFor="flexCheckAll">
                                        <h4>All</h4>
                                    </label>
                                </div>
                            </div>
                            <h4 className="pe-5 col-2">Price</h4>
                            <h4 className="pe-5 col-2">Quantity</h4>
                            <h4 className="pe-5 col-2">Total</h4>
                            <span className="material-symbols-outlined">delete</span>
                        </div>
                        <div className="bg-white rounded p-3">
                            {cartList()}
                        </div>
                    </div>
                    <div className="col-3 ps-4">
                        <div className="bg-white rounded p-3 mb-3">
                            <div className="p-3 d-flex justify-content-between">
                                <h5>Subtotal</h5>
                                <h5>{subtotal}$</h5>
                            </div>
                            <div className="p-3 d-flex justify-content-between">
                                <h5>Discount</h5>
                                <h5>0$</h5>
                            </div>
                            <div className="p-3 d-flex justify-content-between">
                                <h5>Total</h5>
                                <h5>{total}$</h5>
                            </div>
                        </div>
                        <motion.button 
                            type="button" className="btn btn-danger w-100"
                            whileHover={{ opacity: 0.8 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300}}
                            onClick={() => {
                                if (isCheck.length > 0) {
                                    setSubtotal(0);
                                    setTotal(0);
                                    setIsCheck([]);
                                    setIsCheckAll(false);
                                    props.setCart([]);
                                    setPopup(true)
                                } else {
                                    setBuyErr('You need to buy at least one a cat');
                                }
                            }}
                        >
                            Buy
                        </motion.button>
                        <div className="invalid-feedback d-block text-center">{buyErr}</div>
                    </div>
                </div>
                :
                <div className="d-flex bg-white p-5 rounded flex-column align-items-center">
                    <div className="d-flex justify-content-center">
                        <img className="empty-shopping-img" src="/img/empty-shopping-list.png"/>
                    </div>
                    <h4 className="py-3 text-center">There are no products in your shopping cart.</h4>
                    <div>
                        <button type="button" className="btn btn-primary" onClick={() => navigate("/")}>
                            GO TO HOMEPAGE
                        </button>
                    </div>
                </div>
                }
            </motion.div>
        </div>
    )
}