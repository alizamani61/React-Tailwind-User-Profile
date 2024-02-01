import { useEffect, useRef, useState } from "react";
import { BsPencil, BsPhone, BsImage } from 'react-icons/bs';
import { Link } from "react-router-dom";
import nprogress from "nprogress";
import progstype from "../Styles/nprogress.css";
import MultiSelect from "./MultiSelect";
import Calendar from "./Calendar";


const PortfolioDetail = ({ errors, setFormDetail, cancelHandler, acceptHandler }) => {

    /**
     * State For MultiSelect Component
     */
    const [selectedList, setSelectedList] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [isShowCalendar, setShowCalendar] = useState(false);

    const [dataList, setDataList] = useState([
        { id: 1, text: "Javascript" },
        { id: 2, text: "PHP" },
        { id: 3, text: "C#" },
        { id: 4, text: "Java" },
        { id: 5, text: "Python" },
        { id: 6, text: "Ruby" },
        { id: 7, text: "C++" },
        { id: 8, text: "Pascal" },
        { id: 9, text: "Visual Basic" },
        { id: 10, text: "F#" },
        { id: 11, text: "C" },
        { id: 12, text: "SQL" },
        { id: 13, text: "HTML" },
    ]);

    /**
     * End State MultiSelect Component
     */


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //a reference to user portfolio picture upload button
    const portfolioImage = useRef(null);

    //a reference to user portfolio picture thumbnail
    const portfolioImageThumb = useRef(null);
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {

        //update parent skills state whenever selectedList changed.
        setFormDetail((prevState) => ({ ...prevState, skills: selectedList }));

    }, [selectedList]);


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const onSubmitForm = (e) => {
        e.preventDefault();

        acceptHandler();
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //when user clicks on the user profile image upload
    const uploadPortfolioImageClick = (e) => {
        portfolioImage.current.click();
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //this event will be fired when a user select an image 
    const onSelectImage = (e) => {

        //updating parent state
        setFormDetail((prevState) => ({ ...prevState, file: e.target.files }));

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //Reading image file content and convert it to an embedded image
        //then show it in the picture box
        var reader = new FileReader();

        reader.onload = (e) => portfolioImageThumb.current.src = e.target.result;

        reader.readAsDataURL(e.target.files[0]);
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        portfolioImageThumb.current.style.height = "400px"
    }

    const onSelectDay = (date) => {
        console.log(date);

        setSelectedDate(date);
        setShowCalendar(false);
    }
    return (
        <>
            <input type="text" value={selectedDate} onFocus={e => setShowCalendar(true)} />
            <div className="relative">
                {isShowCalendar ?
                    <Calendar onSelectDay={onSelectDay} /> :
                    null
                }
            </div>

            <form onSubmit={onSubmitForm} className="w-full">
                <div className="flex flex-col md:flex-row items-center">

                    {/********************************************Form area*******************************************************************************************/}
                    <div className="w-full md:flex-1">

                        {/***************************************portfolio Title********************************************************************************************/}
                        <div className={`group field-group`}>
                            <label>عنوان</label>
                            <BsPencil className="group-focus-within:text-green-500" aria-hidden="true" size={25} />
                            <input className={`placeholder-style`} onChange={e => setFormDetail((prevState) => ({ ...prevState, title: e.target.value }))} type="text" aria-label="عنوان" placeholder="عنوان" />
                        </div>
                        {errors?.title &&
                            <div className="alert">
                                {errors?.title}
                                <div className="arrow"></div>
                            </div>
                        }

                        {/***************************************portfolio Title********************************************************************************************/}

                        <div className={`group field-group`}>
                            <label>توضیحات</label>
                            <BsPencil className="group-focus-within:text-green-500" aria-hidden="true" size={25} />
                            <textarea className={`placeholder-style`} onChange={e => setFormDetail((prevState) => ({ ...prevState, desc: e.target.value }))} rows="8" aria-label="توضیحات" placeholder="توضیحات" />
                        </div>
                        {errors?.desc &&
                            <div className="alert">
                                {errors?.desc}
                                <div className="arrow"></div>
                            </div>
                        }

                        {/***************************************portfolio Skills********************************************************************************************/}

                        <div className={`group`}>
                            <label className="text-xs">مهارت های مربوط به نمونه کار</label>
                            <div className={`w-full`}>
                                <MultiSelect
                                    data={dataList}
                                    DataHandler={setDataList}
                                    selected={selectedList}
                                    SelectedHandler={setSelectedList}
                                    title="جستجوی مهارت"
                                />
                            </div>
                        </div>
                    </div>

                    {/********************************************Image Upload area*******************************************************************************************/}
                    <div className="w-full md:flex-1">
                        <div className="mt-5 md:pl-10 md:pr-10 w-full">
                            <h5>تصویر نمونه کار  ( برای بهترین نتیجه تصویر را در سایز ۱۱۷۰ در ۲۲۰ درست کنید)</h5>
                            <div className="relative h-[400px] w-full bg-slate-200 outline outline-offset-1 outline-dashed outline-slate-300 mt-5 flex flex-col items-center justify-center">

                                {/***************************Upload button***************************************************************************************************************************/}
                                <button className={`btn btn-default mt-5 bg-white`} type="button" onClick={uploadPortfolioImageClick}><BsImage className="ml-2" /><span>آپلود تصویر</span></button>
                                <input type="file" className="hidden" ref={portfolioImage} onChange={onSelectImage} />
                                {/***************************Upload button***************************************************************************************************************************/}

                                <p className="text-xs text-slate-400 font-thin leading-6">
                                    فقط فایل های jpg, jpeg, png ، حداکثر حجم 2MB
                                    <br />
                                    حداقل سایز تصویر انتخابی باید 1170px X 220px باشد.
                                </p>
                                <img ref={portfolioImageThumb} className="absolute top-0 left-0 w-full" />
                            </div>

                        </div>


                    </div>
                </div>

                <div className="group flex flex-row items-start text-xs gap-2 mt-6">
                    <div className="fcckeckbox">
                        <input type="checkbox" value="" id="slideThree" name="check" onClick={e => { e.target.checked ? setFormDetail((prevState) => ({ ...prevState, rules: true })) : setFormDetail((prevState) => ({ ...prevState, rules: false })) }} />
                        <label htmlFor="slideThree"></label>
                    </div>
                    <label className="cursor-pointer" htmlFor="slideThree">قوانین ثبت نمونه کار را مطالعه کرده و با آن موافقم.</label>
                </div>

                <div className="w-full border-t border-slate-100">

                    {/* ////////////////////////////////////////Button////////////////////////////////////// */}
                    <button className={`float-left btn btn-default mt-5`} type="button" onClick={cancelHandler}>انصراف</button>
                    <button className={`float-left btn mt-5`} type="submit">انجام</button>
                    {/* //////////////////////////////////////////////////////////////////////////////////// */}
                </div>
            </form>
        </>
    )
};

export default PortfolioDetail;