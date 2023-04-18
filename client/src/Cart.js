import Header from "./component/Header"
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart(props) {
    const navigate = useNavigate();
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
    
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
                    <div className="pe-3">
                        <img src={`/img/` + item.product.image + '.jpg'} className="product-img rounded"/>
                    </div>
                    <h4 className="pt-1">{item.product.name}</h4>
                </div>
                <h4 className="col-2">{item.product.price}$</h4>
                <h4 className="col-2">{item.quantity}</h4>
                <h4 className="col-2">{item.quantity * item.product.price}$</h4>
            </div>
        ))
        return arr
    }
    return (
        <div className="cart">
            <Header /> 
            <div className="pt-5"/>
            <div className="pt-3"/>
            <motion.div 
                className="user-profile container-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{opacity: 0}}
            >
                <h3 className="py-3">Cart</h3>
                {props.cart ? 
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
                                                console.log(accumulator, currentValue);
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
                                setSubtotal(0)
                                setTotal(0)
                                setIsCheck([])
                                setIsCheckAll(false);
                            }}
                        >
                            Buy
                        </motion.button>
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