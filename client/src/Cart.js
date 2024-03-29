import Header from "./component/Header"
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseURL } from "./App";

export default function Cart(props) {
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [popup, setPopup] = useState(false);
    const [buyErr, setBuyErr] = useState('');
    const [display, setDisplay] = useState({
        windowInnerWidth: window.innerWidth,
    })
    const navigate = useNavigate();
    const checkPermission = () => {
        const jwt = localStorage.getItem('jwt')
        if (!jwt) {
            navigate('/login')
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setPopup(false)
        }, 3000)
    }, [popup])

    useEffect(() => {
        window.addEventListener("resize", () => setDisplay({
            windowInnerWidth: window.innerWidth,
        }));
        checkPermission()
    }, []);

    const recalculation = (item) => {
        const recalculation = isCheck.some(element => element.id === item.product.id);
        if (recalculation) {
            setIsCheck(prev => {
                let newCart;
                const found = prev.find(element => {
                    return element.id === item.product.id
                });
                found.quantity = item.quantity
                newCart = [...prev]
                
                const sum = newCart.reduce((accumulator, currentValue) => {
                    return accumulator + currentValue.price * currentValue.quantity
                }, 0)
                setSubtotal(sum);
                setTotal(sum)

                return newCart
            })
        }
    }

    const cartListWebsite = () => {
        const arr = props.cart.map(item => (
            <div key={item.product.id} className="d-flex pb-4 align-items-center">
                <div className="col-5 d-flex">
                    <div className="d-flex align-items-center col-1">
                        <input 
                            className="form-check-input" 
                            type="checkbox"
                            // trả về true nếu phần tử được click
                            checked={isCheck.some(element => element.id === item.product.id)}
                            onChange={(e) => {
                                const { checked } = e.target;
                                const obj = {id: item.product.id, price: item.product.price, quantity: item.quantity}
                                setIsCheck([...isCheck, obj]);
                                if (!checked) {
                                    // trả về toàn bộ phần tử khác với phần tử được click
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
                <div className="d-flex col-7 align-items-center">
                    <h4 className="col-3">{item.product.price}$</h4>
                    <div className="col-5 d-flex align-items-center increase-decrease-btn">
                        <button type="button"  disabled={item.decreaseButton}  className="btn btn-primary py-0 border border-dark" onClick={() => {
                            props.setCart(prev => {
                                let newCart;
                                // trừ số lượng mèo
                                if (item.quantity > 2) {
                                    item.quantity -= 1;
                                    item.decreaseButton = false;
                                    item.increaseButton = false;
                                } else if (item.quantity === 2) {
                                    item.quantity -= 1;
                                    item.decreaseButton = true;
                                    item.increaseButton = false;
                                }
                                else {
                                    item.decreaseButton = true;
                                }
                                newCart = [...prev]
                                // save to local storage
                                const jsonCart = JSON.stringify(newCart)
                                localStorage.setItem('Cart', jsonCart)
                                return newCart
                            })
                            recalculation(item)
                        }}>-</button>
                        <input 
                            type="number" 
                            className="px-2 mx-1 border border-dark rounded text-center" 
                            value={item.quantity} 
                            onChange={(e) => {
                                const number = Number(e.target.value);
                                const quantity = Number(item.goodInStock)
                                e.target.value = number
                                props.setCart(prev => {
                                    let newCart;
                                    if (number >= quantity) {
                                        item.quantity = quantity;
                                        item.decreaseButton = false;
                                        item.increaseButton = true;
                                    } else {
                                        item.quantity = number;
                                        item.decreaseButton = false;
                                        item.increaseButton = false;
                                    }
                                    newCart = [...prev]
                                    return newCart
                                })                          
                            }}
                            onBlur={e => {
                                const number = Number(e.target.value);
                                e.target.value = number
                                if (number < 1) {
                                    item.quantity = 1
                                    item.decreaseButton = true;
                                }
                                props.setCart(prev => {
                                    let newCart;
                                    if (number < 1) {
                                        item.quantity = 1
                                    }
                                    newCart = [...prev]

                                    // save to local storage
                                    const jsonCart = JSON.stringify(newCart)
                                    localStorage.setItem('Cart', jsonCart)
                                    return newCart
                                })
                                recalculation(item)
                            }}
                        />
                        <button type="button" disabled={item.increaseButton} className="btn btn-primary py-0 border border-dark" onClick={() => {
                            props.setCart(prev => {
                                let newCart;
                                // cộng thêm số lượng hàng
                                if (item.quantity < item.goodInStock - 1) {
                                    item.quantity += 1;
                                    item.decreaseButton = false;
                                    item.increaseButton = false;
                                } else if (item.quantity  === item.goodInStock - 1) {
                                    item.quantity += 1;
                                    item.decreaseButton = false;
                                    item.increaseButton = true;
                                }
                                else {
                                    item.increaseButton = true;
                                }
                                newCart = [...prev];
                                // save to local storage
                                const jsonCart = JSON.stringify(newCart);
                                localStorage.setItem('Cart', jsonCart);
                                return newCart;
                            })
                            recalculation(item)
                        }}>+</button>
                    </div>
                    <h4 className="col-3 text-danger">{item.quantity * item.product.price}$</h4>
                    <motion.button 
                        type="button" 
                        className="btn btn-light p-1 col-1"
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
            </div>
        ))
        return arr
    }

    const cartListMobile = () => {
        const arr = props.cart.map(item => (
            <div key={item.product.id} className="d-flex pb-4">
                <div className="col-5 d-flex">
                    <div className="d-flex col-3">
                        <input 
                            className="form-check-input" 
                            type="checkbox"
                            // trả về true nếu phần tử được click
                            checked={isCheck.some(element => element.id === item.product.id)}
                            onChange={(e) => {
                                const { checked } = e.target;
                                const obj = {id: item.product.id, price: item.product.price, quantity: item.quantity}
                                setIsCheck([...isCheck, obj]);
                                if (!checked) {
                                    // trả về toàn bộ phần tử khác với phần tử được click
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
                    </Link>
                </div>
                <div className="d-flex col-5 flex-column">
                    <h4 className="pb-1">{item.product.name}</h4>
                    <h5 className="py-1">Price: {item.product.price}$</h5>
                    <div className="py-1 d-flex align-items-center increase-decrease-btn">
                        <button type="button"  disabled={item.decreaseButton}  className="btn btn-primary py-0 px-2 border border-dark" onClick={() => {
                            props.setCart(prev => {
                                let newCart;
                                // trừ số lượng mèo
                                if (item.quantity > 2) {
                                    item.quantity -= 1;
                                    item.decreaseButton = false;
                                    item.increaseButton = false;
                                } else if (item.quantity === 2) {
                                    item.quantity -= 1;
                                    item.decreaseButton = true;
                                    item.increaseButton = false;
                                }
                                else {
                                    item.decreaseButton = true;
                                }
                                newCart = [...prev]
                                // save to local storage
                                const jsonCart = JSON.stringify(newCart)
                                localStorage.setItem('Cart', jsonCart)
                                return newCart
                            })
                            recalculation(item)
                        }}>-</button>
                        <input 
                            type="number" 
                            className="mx-1 border border-dark rounded text-center" 
                            value={item.quantity} 
                            onChange={(e) => {
                                const number = Number(e.target.value);
                                const quantity = Number(item.goodInStock)
                                e.target.value = number
                                props.setCart(prev => {
                                    let newCart;
                                    if (number >= quantity) {
                                        item.quantity = quantity;
                                        item.decreaseButton = false;
                                        item.increaseButton = true;
                                    } else {
                                        item.quantity = number;
                                        item.decreaseButton = false;
                                        item.increaseButton = false;
                                    }
                                    newCart = [...prev]
                                    return newCart
                                })                          
                            }}
                            onBlur={e => {
                                const number = Number(e.target.value);
                                e.target.value = number
                                if (number < 1) {
                                    item.quantity = 1
                                    item.decreaseButton = true;
                                }
                                props.setCart(prev => {
                                    let newCart;
                                    if (number < 1) {
                                        item.quantity = 1
                                    }
                                    newCart = [...prev]

                                    // save to local storage
                                    const jsonCart = JSON.stringify(newCart)
                                    localStorage.setItem('Cart', jsonCart)
                                    return newCart
                                })
                                recalculation(item)
                            }}
                        />
                        <button type="button" disabled={item.increaseButton} className="btn btn-primary py-0 px-2 border border-dark" onClick={() => {
                            props.setCart(prev => {
                                let newCart;
                                // cộng thêm số lượng hàng
                                if (item.quantity < item.goodInStock - 1) {
                                    item.quantity += 1;
                                    item.decreaseButton = false;
                                    item.increaseButton = false;
                                } else if (item.quantity  === item.goodInStock - 1) {
                                    item.quantity += 1;
                                    item.decreaseButton = false;
                                    item.increaseButton = true;
                                }
                                else {
                                    item.increaseButton = true;
                                }
                                newCart = [...prev];
                                // save to local storage
                                const jsonCart = JSON.stringify(newCart);
                                localStorage.setItem('Cart', jsonCart);
                                return newCart;
                            })
                            recalculation(item)
                        }}>+</button>
                    </div>
                </div>
                <div className="d-flex col-2 justify-content-end align-items-center">
                    <motion.button 
                        type="button" 
                        className="btn btn-light p-1 h-50"
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
            </div>
        ))
        return arr
    }

    const putCart = async () => {
        try {
            const catInCart = isCheck;
            const res = await fetch(baseURL + '/update/catdata', {
                method: "PUT",
                body: JSON.stringify({catInCart}),
                credentials: 'include', 
                headers: {'Content-Type': 'application/json'},
            })
            const data = await res.json();
            if (data === 'success') {
                setPopup(true);
                deleteAll();
            } else {
                throw Error()
            }
        } catch {
            alert("buying error or sold out");
        }
    }

    const deleteAll = () => {
        setSubtotal(0);
        setTotal(0);
        setIsCheck([]);
        setIsCheckAll(false);
        props.setCart([]);
        localStorage.removeItem('Cart')
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
                <div className="d-flex flex-column flex-lg-row">
                    <div className="col-lg-9">
                        <div className="d-flex p-3 mb-4 bg-white rounded">
                            <div className="col-5 d-flex">
                                <div className="col-lg-1 col-3">
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
                            {
                            display.windowInnerWidth >= 768 ? 
                            <div className="d-flex col-7">
                                <h4 className="col-3 pe-xl-5">Price</h4>
                                <h4 className="col-5 pe-xl-5">Quantity</h4>
                                <h4 className="col-3 pe-xl-5">Total</h4>
                                <motion.button 
                                    type="button"
                                    className="btn btn-light p-1"
                                    whileHover={{ opacity: 0.8 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 300}}
                                    onClick={() => deleteAll()}
                                >
                                    <span className="material-symbols-outlined">delete</span>
                                </motion.button>
                            </div> : 
                            <div className="d-flex col-7 justify-content-end">
                                <motion.button 
                                    type="button"
                                    className="btn btn-light p-1"
                                    whileHover={{ opacity: 0.8 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 300}}
                                    onClick={() => deleteAll()}
                                >
                                    <span className="material-symbols-outlined">delete</span>
                                </motion.button>
                            </div> 
                            }
                        </div>
                        <div className="bg-white rounded p-3">
                            {
                                display.windowInnerWidth >= 768 ? 
                                cartListWebsite() :
                                cartListMobile()
                            }
                        </div>
                    </div>
                    <div className="col-lg-3 ps-lg-4 pt-4 pt-lg-0">
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
                                    // cập nhật giỏ hàng ở server
                                    putCart()
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