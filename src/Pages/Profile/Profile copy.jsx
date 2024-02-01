import { useEffect, useState } from "react";
import { BsPencil, BsPhone, BsImage } from 'react-icons/bs';
import { FcTab, Notification } from "../../Components/Elements";
import MultiSelect from "../../Components/MultiSelect";
import useToken from "../../Services/tokenService";

const ProfileOLD = props => {

    const [isLoading, setIsLoading] = useState(false);
    const [first_name, setFirst_name] = useState();
    const [last_name, setLast_name] = useState();
    const [nationalcode, setNationalcode] = useState();
    const [mobile, setMobile] = useState();
    const [errors, setErrors] = useState();
    const [formData, setFormData] = useState();
    const [success, setSuccess] = useState(null);
    const [activeTab, setActiveTab] = useState(1);

    const { token } = useToken();


    /**
     * State For MultiSelect Component
     */
    const [selectedList, setSelectedList] = useState([]);

    const [dataList, setDstaList] = useState([
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

    useEffect(() => {
        setIsLoading(false);
    }, [errors, success]);

    const onSubmitForm = async (e) => {
        e.preventDefault();

        console.log(token.user.token);
        //const myFile = document.querySelector("input[type=file]").files[0];
        const formdata = JSON.stringify({
            first_name: first_name,
            last_name: last_name,
            nationalcode: nationalcode,
            mobile: mobile
        });

        await fetch(`${process.env.REACT_APP_BASE_URL}/api/profile`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token.user.token}`,
                'Content-Type': 'application/json'
            },
            body: formdata
        }).then((response) => {

            if (response.status === 200)
                //if everything is ok and response does'nt have any error
                //we show a successfull notification to user
                setSuccess(`عملیات با موفقیت انجام شد`);

            return response.json();
        }).then(data => {
            //fill the error state
            setErrors(data.errors);
            console.log(data);
        }).catch(err => {
            //fill the error state
            setErrors({ message: ` ${err}: خطای نامشخص` });
        });
    }

    const onSelectList = (obj) => {
        setSelectedList(obj);
        alert(1);
    }

    return (
        <div className={`card`}>



            {/* ---===============================================================================- */}
            <h5 className="card-header">
                <BsPencil className={`header-icon float-right ml-2`} size={20} />                پروفایل
            </h5>
            <hr className={`header-line`} />
            <div className={`card-body`}>

                <div className={`fctab`}>
                    <ul className={`links`}>
                        <li onClick={() => setActiveTab(1)}>
                            <a className={`${activeTab == 1 && "active"} `} href="#">ویرایش</a>
                        </li>
                        <li onClick={() => setActiveTab(2)}>
                            <a className={`${activeTab == 2 && "active"} `} href="#">تصاویر</a>
                        </li>
                        <li onClick={() => setActiveTab(3)}>
                            <a className={`${activeTab == 3 && "active"} `} href="#">مهارت ها</a>
                        </li>
                        <li onClick={() => setActiveTab(4)}>
                            <a className={`${activeTab == 4 && "active"} `} href="#">نمونه کار</a>
                        </li>
                        <li onClick={() => setActiveTab(5)}>
                            <a className={`${activeTab == 5 && "active"} `} href="#">رزومه</a>
                        </li>
                        <li onClick={() => setActiveTab(6)}>
                            <a className={`${activeTab == 6 && "active"} `} href="#">معرف</a>
                        </li>
                    </ul>
                    <div className='contents'>
                        <div className={`${activeTab != 1 && 'hidden'} content`}>
                            <div className="flex flex-col items-center">
                                <div className="p-2 md:pl-10 md:pr-10 md:pt-5 md:pb-2 w-full flex flex-col items-center justify-center text-center">
                                    <img className="rounded-full" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAFwAXAMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAADBgQFBwIBCP/EADYQAAIBAwMCBAMGBAcAAAAAAAECAwAEEQUSIQZBMVFhcRMigQcUMkKRsTNSodEjQ2JyouHx/8QAGAEAAwEBAAAAAAAAAAAAAAAAAAECBAP/xAAeEQACAwADAAMAAAAAAAAAAAAAAQIRIQMSMUFRYf/aAAwDAQACEQMRAD8AdFFFUVwooi1RJ2KTuveqG0tY7C0kKXE343Ucxr6eRNOXgCT25r5/1nUrm76juboF3eSUhUJ/KOAMeWBUyZUVbGZo1uRFPpo33ULhjvYhmOORn18eaDqurSwq8qtNYXDAfEhmj+Vz5ggnB+nvUnROm9Xu3EptltgwAyCwyPbOP6U1t0E15Aq6jcyyBfBc+FcOyO/Qy+46ru7pTFfJHPEwwy4xn1B7Gq2z1GfT7kXGnXc0UmfTBHkfOtSufs40+OA4DB+cH9qS+q+lDo0cc0XKAjcDTjONilxujSumr+fUdLSW7KmYcMVXGasJFpF+zbV2luH048p8PePMEYz9OafXFaEcGQ3WgMOaluKjsOaYi7U0VaCtFU0gPZg7QSCI4kKnaT2OOKyH7NdMTUOoppbtQ3wV7+AJNbDkgEjxrKel7O/TULxdN+LFExl3p8u92UjaPDgbW8xyDUT8OnH6bGlzplntSW4hVhwAXFTxe2bpkOu3zrEtS0vWL2YbrbT1kGc7mLyg/WrK30zqmDp/UbqGeyWGzGTHMjtI3yhmCkEDwPHr5Vxr6O7/AE0O+1bSVcobuAP/AClxms++0ueKTS3+AVdXU8qc0pXmnanIRPNZ2py3+YVDn1y2aiXhvTCikMI5G2Mv4htAOcH2FHTQ7Yw/2U5PU7Dstu/6ZFa69Zb9mJgt76/ljL8hUjL4B25Pj68CtQDB0BFaUZWCcVHYc1IegMBmmItVoi0FDRVNAwyml7SrOOx1y93vu3zCdOSpQkY8f1/XFXwNKvWDNZ3VtdxuVMrCJ/LuQf3rnNYdOOST0atQvtse1ZJDI4wqhUy3/Gpn3WOLQntQyjevzEtuyfEknvyfGsy0nUpdN1GW71ZZwrEqkjD5FHnn14pMvtd1m1Wa0ttSma1dm2f4mSqk+Ga4K2aHSNW0o77X7vcs+6M4xlHGO2CRyPWl7rV7S1tWcFmlCMFBCjH6AeVLWl67fDSLezgWWWeHc29fmwCc4Pp2qJ1DqErSGK4LFsjcM+HfH7URTuglJUD6ZufuT+RbGfp/7Wp6Ndi4tlOcmsXhnYzbj37VofSV4fhqhNao+GOT0cXoLDmiFsjNCbxpiLBDRlNRlNFU0DDA0rdfIZdMKr+IMCvvTMDS91ghksSB5ikADoi8+/6e0DkFh8pV+ce9ROp9B1GW6QRWVv8AA5ORxj6Uny3N9ouqSXFnIUyeR2arGTrfUZIjvYZxwewrNT+DWp1jCao82haQ8YCJLLxtWka4lklYNJk7vmye586n311darcBp5ixyeOwHeo2pqFeLHC7MD6GrgqZym3LQMIy6+9OugsYthpMtf4i+9Oel/wxXc4Md7WXfEp9KKTzVVp82EANT92aAJ6GiqahxvU20hlupBHAhZj/AEoGdg+tQdWspbi23MpWM9z39qdNP0KKAB7jEsnl+UVx1JaG4sTJCOYxyoHaok3WFRSvTIdX09ZQSRSvd6NHj8RAHatCvY8Ehu4pevUGTxWZOjW0mLdvYrEuFHLcVLm0qO5jRHHsR2qdHFucYGavbLTncKdhocnYuqqhbseh7q4jeW0nVnj52OMbvY1Lt7O6sCI7y3khb/UOD9a1DStP+52io4xI/wAzDyqxa0hmj+HLGrqfEEZrTFutMkkrwzK2k2kVYrKSPGr/AFHo+GQmSwkMLfyHlf8AqqGbSdSt5DG1rI2PzIMg1dk0Mmi6LLdqs1zmOLsv5m/sKb7O3htUCQoFA8qGnA4oqsamyqJQfzoUw8WUj27GuCxxQXY880gKTVdDtrss0bCCQ/lP4SaVb/pC6Z+MN/tYU+uxOc81EljXPAx7cVLgmWuSSFOw6WeIqZFCBe7MKZLGxt7YBkAkkHg2PlHt511sUHO0Z86NGSfGhQSBzbPT4+frRUrivc8VRAcHiuGxmhbzQ2dtxHl/agD/2Q==" alt="" />
                                    <p className="p-5 text-slate-400">
                                        پروفایل خود را تکمیل کنید تا شما را به کارفرمایان بیشتری معرفی کنیم.
                                        برای دریافت نشان کاربر تایید شده  باید در بخش تنظیمات اطلاعات شخصی (نام و شماره تماس) خود را تایید کنید.
                                    </p>
                                </div>
                                <div className="p-2 md:pl-10 md:pr-10 md:pt-2 md:pb-2 w-full flex items-center">
                                    <form onSubmit={onSubmitForm} className="w-full">
                                        <div className={`group field-group`}>
                                            <label>نام</label>
                                            <BsPencil className="group-focus-within:text-green-500" aria-hidden="true" size={25} />
                                            <input className={`placeholder-style`} onChange={e => setFirst_name(e.target.value)} type="text" aria-label="نام" placeholder="نام" />
                                        </div>
                                        {errors?.first_name &&
                                            <div className="alert">
                                                {errors?.first_name}
                                                <div className="arrow"></div>
                                            </div>
                                        }
                                        <div className={`group field-group`}>
                                            <label>نام خانوادگی</label>
                                            <BsPencil className="group-focus-within:text-green-500" aria-hidden="true" size={25} />
                                            <input className={`placeholder-style`} onChange={e => setLast_name(e.target.value)} type="text" aria-label="نام خانوادگی" placeholder="نام خانوادگی" />

                                        </div>
                                        {errors?.last_name &&
                                            <div className="alert">
                                                {errors?.last_name}
                                                <div className="arrow"></div>
                                            </div>
                                        }

                                        <div className={`group field-group`}>
                                            <label>کدملی</label>
                                            <BsPencil className="group-focus-within:text-green-500" aria-hidden="true" size={25} />
                                            <input className={`placeholder-style`} onChange={e => setNationalcode(e.target.value)} type="text" aria-label="کد ملی" placeholder="کد ملی" />
                                        </div>
                                        {errors?.nationalcode &&
                                            <div className="alert">
                                                {errors?.nationalcode}
                                                <div className="arrow"></div>
                                            </div>
                                        }
                                        <div className={`group field-group`}>
                                            <label>شماره همراه</label>
                                            <BsPhone className="group-focus-within:text-green-500" aria-hidden="true" size={25} />
                                            <input className={`placeholder-style`} onChange={e => setMobile(e.target.value)} type="text" aria-label="شماره همراه" placeholder="شماره همراه" />
                                        </div>
                                        {errors?.mobile &&
                                            <div className="alert">
                                                {errors?.mobile}
                                                <div className="arrow"></div>
                                            </div>
                                        }



                                        <div className="group flex flex-row items-start text-xs gap-2 mt-6">
                                            <div className="fcckeckbox">
                                                <input type="checkbox" value="" id="slideThree" name="check" />
                                                <label htmlFor="slideThree"></label>
                                            </div>
                                            <label className="cursor-pointer" htmlFor="slideThree">حالت تعطیلات فعال شود؟</label>
                                        </div>


                                        {/* ////////////////////////////////////////////////////// */}


                                        <button className={`float-left btn mt-5`} type="submit">بروزرسانی پروفایل</button>
                                        <div className="clear-both"></div>
                                        {errors?.message &&
                                            <Notification Type="danger" Handler={setErrors}>{errors?.message}</Notification>
                                        }
                                        {success &&
                                            <Notification Type="success" Handler={setSuccess}>{success}</Notification>
                                        }



                                    </form>
                                </div>

                            </div>
                        </div>
                        <div className={`${activeTab != 2 && 'hidden'} content`}>
                            <div className="flex flex-col items-center justify-center">
                                <div className="p-2 md:pl-10 md:pr-10 md:pt-5 md:pb-2 w-full flex flex-col items-center justify-center text-center">
                                    <img className="rounded-full" src="data:image/jpeg;base64,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" alt="" />
                                    <p className="p-5 text-slate-400">
                                        پروفایل خود را تکمیل کنید تا شما را به کارفرمایان بیشتری معرفی کنیم.
                                        برای دریافت نشان کاربر تایید شده  باید در بخش تنظیمات اطلاعات شخصی (نام و شماره تماس) خود را تایید کنید.
                                    </p>
                                </div>
                                <div className="h-[120px] w-[100px] bg-slate-200 outline outline-offset-1 outline-dashed outline-slate-300">

                                </div>
                                <div>
                                    <button className={`btn btn-default mt-5`} type="submit"><BsImage className="ml-2" /><span>آپلود تصویر</span></button>
                                </div>

                                <div className="mt-5 w-full">
                                    <h5>تصویر عکس روی جلد ( برای بهترین نتیجه تصویر را در سایز ۱۱۷۰ در ۲۲۰ درست کنید)</h5>
                                    <div className="h-[120px] w-full bg-slate-200 outline outline-offset-1 outline-dashed outline-slate-300 mt-5 flex flex-row items-center">
                                        <button className={`btn btn-default`} type="submit"><BsImage className="ml-2" /><span>آپلود تصویر</span></button>
                                        <p className="text-xs text-slate-400 font-thin leading-6">
                                            فقط فایل های jpg, jpeg, png ، حداکثر حجم 2MB
                                            <br />
                                            حداقل سایز تصویر انتخابی باید 1170px X 220px باشد.
                                        </p>
                                    </div>
                                    <div className="flex items-center p-1">
                                        <div className="flex items-center justify-center w-full h-[220px] mt-10 bg-slate-900 outline outline-offset-2 outline-slate-400">
                                            تصویر 1170 * 220
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="clear-both"></div>
                        </div>
                        <div className={`${activeTab != 3 && 'hidden'} content`}>
                            <div className="p-2 md:pl-10 md:pr-10 md:pt-5 md:pb-2 w-full flex flex-col items-center justify-center text-center">
                                <img className="rounded-full" src="data:image/jpeg;base64,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" alt="" />
                                <p className="p-5 text-slate-400">
                                    پروفایل خود را تکمیل کنید تا شما را به کارفرمایان بیشتری معرفی کنیم.
                                    برای دریافت نشان کاربر تایید شده  باید در بخش تنظیمات اطلاعات شخصی (نام و شماره تماس) خود را تایید کنید.
                                </p>
                            </div>
                            <div className={`mb-100`}>
                                <MultiSelect
                                    data={dataList}
                                    DataHandler={setDstaList}
                                    selected={selectedList}
                                    SelectedHandler={setSelectedList}
                                    title="جستجوی مهارت"
                                />
                            </div>
                            <p className="h-[300px]"></p>
                        </div>
                        <div className={`${activeTab != 4 && 'hidden'} content`}>04</div>
                        <div className={`${activeTab != 5 && 'hidden'} content`}>05</div>
                        <div className={`${activeTab != 6 && 'hidden'} content`}>05</div>

                    </div>


                </div>






            </div>


        </div >

    )
};

export default ProfileOLD;