import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { BsSearch, BsLock, BsEnvelope } from 'react-icons/bs';

const Button = props => {
    const eclass = props.class ? props.class : '';
    const buttonType = props.type ? props.type : 'button';
    return (
        <button
            className={`hover:bg-blue-400 group flex justify-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-0 py-2 shadow-sm ${eclass}`}
            onClick={props.onClick}
            type={buttonType}
        >
            {props.Icon ? <props.Icon className="mr-2 w-5 h-5" /> : <span className="mr-1 w-1 h-1"></span>}
            {props.children}
        </button>
    )
};

const TextField = React.forwardRef((props, ref) => {
    const eclass = props.class ? props.class : '';

    return (
        <div className={`flc_group ${eclass}`}>
            {
                props.Icon &&
                <props.Icon className="absolute right-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500" aria-hidden="true" />
            }
            <input
                type="text"
                ref={ref}
                className={`focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pr-10 pl-10 ring-1 ring-slate-300 shadow-sm`}
                aria-label={props.Label}
                placeholder={props.Label}
            />
        </div>
    )
});

const PasswordField = React.forwardRef((props, ref) => {
    const eclass = props.class ? props.class : '';

    return (
        <div className={`flc_group ${eclass}`}>
            {
                props.Icon &&
                <props.Icon className="absolute right-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500" aria-hidden="true" />
            }
            <input
                type="password"
                ref={ref}
                className={`focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pr-10 pl-10 ring-1 ring-slate-300 shadow-sm`}
                aria-label={props.Label}
                placeholder={props.Label}
            />
        </div>
    )
});

const Notification = props => {

    //this is a state to control notification timer
    //and despose it after a few seconds
    const [errTimeChecker, setErrTimeChecker] = useState(null);

    //Object destructuring
    const { Handler, Type, children } = props;

    /**
     * Display a notification for a few seconds
     * 
     * The handler is a function passing from the parent component
     * to clear the error state after 6 seconds
     * @param {function} handler :setErrors function
     */
    const messageHandler = (handler) => {

        if (!errTimeChecker) {
            //Check if another timer is not active currently
            const t = setTimeout(() => {
                //clear the error state and errTimeChecker 
                //for subsequent error messages
                handler(null);
                setErrTimeChecker(null);
            }, 6000);

            //Set errTimeChecker in order to prevent massage firing 
            //before 6 second
            setErrTimeChecker(t);
        }
    }


    messageHandler(Handler);

    const closeNote = () => {
        //when user clicks on close button
        Handler(null);
        //prevent timer overlap
        clearTimeout(errTimeChecker);
        //unset timer checker for subsequent execution
        setErrTimeChecker(null);
    }

    return (
        <div className={`note note-${Type}`}>
            <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd" />
                </svg>
                <p className="mr-1 text-xs text-white">{children}</p>
            </div>
            <span className="inline-flex items-center cursor-pointer">
                <svg onClick={closeNote} xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </span>
        </div>

    )
};


class FcTab extends React.Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() { }

    static Tabs = ({ children }) => <ul className='flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400'>{children}</ul>
    static Item = ({ children, number, onClick }) => <li className='mr-2' onClick={onClick}>{children}</li>
    static Contents = ({ children }) => <div className='contents'>{children}</div>
    static Content = ({ children, active }) => <div className={`${!active && 'hidden'} content`}>{children}</div>
    
    static setActive = (num) => {
        this.setState({active: num});
    }

    render() {
        return (
            <div className='border-b border-gray-200 dark:border-gray-700'>{this.props.children}</div>
        )
    }
}

// FcTab.propTypes = {
//     Tabs: PropTypes.any.isRequired,
//     Item: PropTypes.any.isRequired,
//     //Contents: PropTypes.any.isRequired,
// }

export {
    Button,
    Notification,
    TextField,
    PasswordField,
    FcTab
};
