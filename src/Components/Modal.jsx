import { useEffect, useRef, useState } from "react";
import { BsX } from 'react-icons/bs';

const Modal = ({ title, closeModalHandler, fullScreen, children }) => {

    //modal top and left in pixel
    //set width and height in full screen mode only (width(%) and height(vh))
    const [dimension, setDimension] = useState({ top: 120, left: 0, width: 0, height: 0 });

    //When a user clicks down on the header area
    //this state variable will be set to true
    const [startMoving, setStartMoving] = useState(false);

    //////////////////////////////////////////////////////////////////////////////////////////////////////
    //oldState is a state variable keeping the user first click dimension
    //before starting drag and drop
    const [oldState, setOldState] = useState({ x: 0, y: 0 });
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    //to control drag and drop or resize modal box
    const ref = useRef(null);
    
    /////////////////////////////////////////////////useEffect////////////////////////////////////////////
    useEffect(() => {
        if (!ref.current) return;

        if (fullScreen) {
            //user cannot change modal dimention 
            //in full screen mode
            setDimension({ top: 0, left: 0, width: 100, height: 2000 })
        }
    },[fullScreen]);
    /////////////////////////////////////////////end useEffect////////////////////////////////////////////

    /**
     * When a user clicks down on the header area
     * this event will be fired
     * @param {MouseEvent} e 
     */
    const onStartMoving = (e) => {
        //oldState is a state variable keeping the user first click dimension
        setOldState({ x: e.clientX, y: e.clientY });

        //set startMoving state to true 
        //this state variable will be using by onEndMoving Event  
        setStartMoving(true);
    };


    /**
     * When a user release click then this event will be fired
     * @param {MouseEvent} e 
     * @returns 
     */
    const onEndMoving = (e) => {
        //stop drag and drop in full screen mode
        if (fullScreen) return;

        //When a user clicks down on the header area
        //this state variable will be set to true
        if (!startMoving) return;

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //oldState is a state variable keeping the user first click dimension
        let vleft = ref.current.offsetLeft + (e.clientX - oldState.x);
        let vtop = ref.current.offsetTop + (e.clientY - oldState.y);
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        //correcting right side
        if ((vleft + ref.current.offsetWidth) > document.body.offsetWidth)
            vleft = document.body.offsetWidth - ref.current.offsetWidth


        //setting new dimension
        //Modal Window shouldn't go outside of web browser//////////////////////////////////////////////////////////////////
        setDimension({...dimension, left: (vleft <= 0 ? 0 : vleft), top: (vtop <= 0 ? 0 : vtop)});
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        //startMoving will set to false 
        //because the modal window shouln't stick to the mouse after release!
        setStartMoving(false);
        //console.log(vtop);

    };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Destructuring
    const {top, left, width, height} = dimension;
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //if width and height was specified then 
    //set modal box mode to full screen
    const style = (width > 0 && height > 0) ? { left: `${left}px`, top: `${top}px`, width: `${width}%`, height: `${height}px`, borderRadius: `0px` } : { left: `${left}px`, top: `${top}px` }

    return (

        <div>
            {/* ///////////////////////////////////////Modal///////////////////////////////////////// */}
            <div className="fixed z-[1002] opacity-50 bg-slate-900 top-[0px] right-[0px] w-full h-[1000px]" onMouseUp={onEndMoving}></div >
            <div ref={ref} onMouseUp={onEndMoving} style={style} className="absolute z-[1003] top-[150px] w-full md:w-9/12 mx-auto bg-white h-50 shadow-xl rounded-md flex flex-col p-5 border border-slate-100">
                <div onMouseDown={onStartMoving} onMouseUp={onEndMoving} className="w-full leading-5 flex flex-row border-b border-slate-100 select-none cursor-move">
                    <div className="ml-2">
                        <BsX onClick={closeModalHandler} size={20} className="feather feather-x cursor-pointer hover:text-green-400 rounded-full mt-0" />
                    </div>
                    <h6 className={`mb-3`}>{title}</h6>
                </div>
                <div className="flex flex-col w-full pt-5">
                    <div className="mb-5">
                        {children}
                        <div className="clear-both"></div>
                    </div>

                </div>
            </div>

            {/* ///////////////////////////////////////Modal///////////////////////////////////////// */}
        </div>
    )
};

export default Modal;