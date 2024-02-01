import { useEffect, useRef, useState } from "react";
import { BsPencil, BsPhone, BsImage } from 'react-icons/bs';
import { Link } from "react-router-dom";
import ProfileTabs from "../../Components/ProfileTabs";

const Images = props => {
    const [isLoading, setIsLoading] = useState(false);

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //a reference to user avatar picture upload button
    const profileImage = useRef(null);

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        setIsLoading(false);
    }, []);

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //when user clicks on the user profile image upload
    const uploadProfileImageClick = () => {
        profileImage.current.click();
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <div className={`card`}>
            <h5 className="card-header">
                <BsPencil className={`header-icon float-right ml-2`} size={20} />                پروفایل
            </h5>
            <hr className={`header-line`} />
            <div className={`card-body`}>

                <div className={`fctab`}>
                    <ul className={`links`}>
                        <ProfileTabs activePage="images" />
                    </ul>
                    <div className='contents'>

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
                                <button className={`btn btn-default mt-5`} type="button" onClick={uploadProfileImageClick}><BsImage className="ml-2" /><span>آپلود تصویر</span></button>
                                <input type="file" className="hidden" ref={profileImage} />
                            </div>

                            <div className="mt-5 md:pl-10 md:pr-10 w-full">
                                <h5>تصویر عکس روی جلد ( برای بهترین نتیجه تصویر را در سایز ۱۱۷۰ در ۲۲۰ درست کنید)</h5>
                                <div className="h-[120px] w-full bg-slate-200 outline outline-offset-1 outline-dashed outline-slate-300 mt-5 flex flex-row items-center">
                                    <button className={`btn btn-default ml-2`} type="button"><BsImage className="ml-2" /><span>آپلود تصویر</span></button>
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
                </div>
            </div>
        </div>

    )
};

export default Images;