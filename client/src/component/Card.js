import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Card(props) {
    return (
        <motion.div 
            className="pt-4 col-12 col-md-6 col-lg-3 position-relative"
            initial={{ opacity: 0 }}
            animate={{opacity: 1}}
            transition={{duration: 0.2}}
            whileHover={{filter: "grayscale(100%)"}}
            whileTap={{ scale: 0.95 }}
        >
            <div className="pb-2">
                <Link to={'/' + props.name}> 
                    <div
                        className="cat-img"
                        style={{backgroundImage: `url(img/${props.image_url}.jpg)`}}
                    />
                </Link>
            </div>
            <p className="text-center text-light ps-3 pb-4 position-absolute bottom-0 text-shadow">{props.name}</p>
        </motion.div>
    )  
}