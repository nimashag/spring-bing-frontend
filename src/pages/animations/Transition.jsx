import { motion } from "framer-motion";
//import './Transition.css';


const calculatRandomBlockDelay = (rowIndex, totalRows) => {
    const blockDelay = Math.random() * 0.5;
    const rowDelay = (totalRows - rowIndex - 1) * 0.05;
    return blockDelay + rowDelay;
};
  

const Transition = (Page) => {
    return () => (
        <>
            <Page 
            />

            <div className="blocks-container transition-in">
                {Array.from({ length: 10 }).map((_, rowIndex) => (
                    <div className="row" key={rowIndex}>
                        {Array.from({ length: 11}).map((_, blockIndex) => (
                            <motion.div
                            key={blockIndex}
                            className="block"
                            initial={{ scaleY: 1 }}
                            animate={{ scaleY: 0 }}
                            exit={{ scaleY: 0 }}
                            transition={{
                                duration: 1,
                                ease: [0.22, 1, 0.36, 1],
                                delay: calculatRandomBlockDelay(rowIndex, 10),
                            }}
                            >

                            </motion.div>
                        ))}
                    </div>
                ))}
            </div>


            <div className="blocks-container transition-out">
                {Array.from({ length: 10 }).map((_, rowIndex) => (
                    <div className="row" key={rowIndex}>
                        {Array.from({ length: 11}).map((_, blockIndex) => (
                            <motion.div
                            key={blockIndex}
                            className="block"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 0 }}
                            exit={{ scaleY: 1 }}
                            transition={{
                                duration: 1,
                                ease: [0.22, 1, 0.36, 1],
                                delay: calculatRandomBlockDelay(rowIndex, 10),
                            }}
                            >

                            </motion.div>
                        ))}
                    </div>
                ))}
            </div>

            {/* me tika css ekata dapan

            .blocks-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh; 
                display: flex;
                flex-direction: column;
                pointer-events: none;
            }

            .row {
                flex: 1;
                width: 100%;
                display: flex;
            }

            .block {
                position: fixed;
                flex: 1;
                background: #667067;
                margin: -0.25px;
            }

            .transition-in .block {
                transform-origin: top;
            }

            .transition-out .block {
                transform-origin: bottom;
            }


            */}
        </>
    )
}

export default Transition;


