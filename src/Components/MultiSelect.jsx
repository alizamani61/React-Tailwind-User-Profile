import React, { useEffect, useRef, useState } from "react";
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

const MultiSelect = ({ data, DataHandler, selected, SelectedHandler, mode, title }) => {
    const [searchKey, setSearchKey] = useState("");
    const [showDrop, setShowDrop] = useState(false);
    const searchTextRef = React.useRef();


    useEffect(() => {

        if (selected.length == data.length)
            setShowDrop(false);

    }, [selected, showDrop]);

    const deleteItem = (index) => {
        const sList = selected.filter((list, listIndex) => {
            return listIndex !== index
        })

        SelectedHandler(sList);
    }

    const onDataItemClick = (l) => {

        if (mode == "Single") {
            SelectedHandler([{ id: l.id, text: l.text }]);
            setSearchKey("");
        } else {
            SelectedHandler([...selected, { id: l.id, text: l.text }]);
            searchTextRef.current.focus();
            setShowDrop(true);
        }
    }

    const hideDropDownOnFocusOut = () => {
        setTimeout(() => {
            if (searchTextRef.current !== document.activeElement)
                setShowDrop(false);
        }, 200);
    }


    function inArray(needle, array) {

        for (var i = 0; i < array.length; i++) {
            if (array[i].text.toUpperCase() === needle.toUpperCase()) {
                return true;
            }
        }

        return false;
    }



    return (
        <div className={`w-full flex flex-col items-center h-auto mx-auto clear-both`}>
            <div className={`w-full`}>
                <div className={`flex flex-col items-center relative`}>
                    <div className={`w-full`}>
                        <div className={`my-2 p-1 flex border ${showDrop ? "ring-1 ring-green-500 rounded-b-none" : "ring-1 ring-slate-400"}  bg-white rounded`}>
                            <div className="flex flex-auto flex-wrap">
                                {selected.map((m, index) => {
                                    return (
                                        <div className={`flex justify-center items-center m-1 font-medium py-1 px-2 rounded-sm text-green-700 bg-green-100 border border-green-300`} key={index}>
                                            <div className={`text-xs font-normal leading-none max-w-full flex-initial`}>{m.text}</div>
                                            <div className={`flex flex-auto flex-row-reverse`}>
                                                <div>
                                                    <svg onClick={e => deleteItem(index)} xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x cursor-pointer hover:text-green-400 rounded-full w-4 h-4 mr-2">
                                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}

                                <div className="flex-1">
                                    <input ref={searchTextRef} placeholder={title} className={`bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-slate-600`} onKeyUp={e => setShowDrop(true)} onClick={e => setShowDrop(!showDrop)} onChange={e => setSearchKey(e.target.value)} value={searchKey} onBlur={e => hideDropDownOnFocusOut()} />
                                </div>
                            </div>
                            <div className={`text-gray-300 w-8 py-1 pl-1 pr-2 border-r flex items-center ${showDrop ? "border-green-300" : "border-slate-300"}`}>
                                <button className={`cursor-pointer w-6 h-6 outline-none focus:outline-none ${showDrop ? "text-green-600" : "text-slate-600"}`} >
                                    {!showDrop ?
                                        <BsChevronDown onClick={e => setShowDrop(true)} />
                                        :
                                        <BsChevronUp onClick={e => setShowDrop(false)} />
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={`${!showDrop && "hidden"} absolute shadow-lg p-1 top-[90%] bg-white z-40 w-full left-0 max-h-select overflow-y-auto ${selected.length < data.length ? "ring-1 ring-green-500" : ""}`}>
                        <div className="flex flex-col w-full">

                            {data.filter(f => {
                                return f.text.toUpperCase().indexOf(searchKey.toUpperCase()) >= 0 && !inArray(f.text, selected)
                            }).map((l, index) => {
                                return (
                                    <div className={`cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-green-200`} key={index} onClick={e => onDataItemClick(l)}>
                                        <div className={`flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100`}>
                                            <div className="w-full items-center flex">
                                                <div className="mx-2 leading-6">
                                                    {l.text}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            }


                        </div>
                    </div>
                </div>
            </div>
        </div >

    )
};
export default MultiSelect;