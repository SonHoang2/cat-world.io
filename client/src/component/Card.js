import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Card(props) {
    return (
        <div className="pt-4 col-12 col-md-6 col-lg-3">
            <div className="pb-2">
                <Link to={'/' + props.name}> 
                    <motion.div
                        className="cat-img"
                        initial={{ opacity: 0 }}
                        animate={{opacity: 1}}
                        transition={{duration: 0.2}}
                        whileHover={{filter: "grayscale(100%)"}}
                        whileTap={{ scale: 0.95 }}
                        style={{backgroundImage: `url(img/${props.image_url}.jpg)`}}
                    />
                </Link>
            </div>
            <p className="text-center text-dark fw-bold">{props.name}</p>
        </div>
    )  
}