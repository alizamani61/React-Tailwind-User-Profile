import { useEffect, useState } from "react";
import { BsPencil, BsPhone, BsImage } from 'react-icons/bs';
import { Link } from "react-router-dom";
import Modal from "../../Components/Modal";
import PortfolioDetail from "../../Components/PortfolioDetail";
import ProfileTabs from "../../Components/ProfileTabs";

const Portfolio = props => {
    const [isLoadingDetail, setIsLoadingDetail] = useState(false);

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Modal portfolio detail states
    const [detailErrors, setDetailErrors] = useState();
    const [detailFormData, setFormDetailData] = useState({ title: null, desc: null, skills: null, rules: false, file: null });

    useEffect(() => {

    }, [isLoadingDetail]);

    const formDetailAccept = () => {
        console.log(detailFormData);
    }

    return (
        <>
            {/******************************************Portfolio detail modal box**********************************************************/}
            {isLoadingDetail ?
                <Modal fullScreen={true}
                    title="نمونه کار"
                    closeModalHandler={e => setIsLoadingDetail(false)}>
                    <PortfolioDetail
                        errors={detailErrors}
                        setErrors={setDetailErrors}
                        setFormDetail={setFormDetailData}
                        acceptHandler={formDetailAccept}
                        cancelHandler={e => setIsLoadingDetail(false)}
                    />
                </Modal>
                :
                null
            }

            {/******************************************************************************************************************************/}
            <div className={`card`}>
                <h5 className="card-header">
                    <BsPencil className={`header-icon float-right ml-2`} size={20} />                پروفایل
                </h5>
                <hr className={`header-line`} />
                <div className={`card-body`}>

                    <div className={`fctab`}>
                        <ul className={`links`}>
                            <ProfileTabs activePage="portfolio" />
                        </ul>
                        <div className='contents'>
                            <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-2 mt-5">
                                <div className="w-full md:w-1/4 flex flex-col items-center p-3 bg-slate-100">
                                    <div className="bg-white w-full flex items-center justify-center h-[300px]">
                                        <button onClick={e => setIsLoadingDetail(true)} className={`btn btn-default ml-2`} type="button"><BsImage className="ml-2" /><span>نمونه کار جدید</span></button>
                                    </div>
                                    <a className="pt-2 text-xs block w-full text-left text-red-400 invisible" href="#">&nbsp;</a>
                                </div>
                                <div className="w-full md:w-1/4 flex flex-col items-center p-3 bg-slate-100">
                                    <div className="bg-white w-full flex items-center justify-center h-[300px]">
                                        <img className="w-full h-full" src="https://binaries.templates.cdn.office.net/support/templates/en-us/lt44864860_quantized.png" alt="" srcSet="" />
                                    </div>
                                    <a className="pt-2 text-xs block w-full text-left text-red-400" href="#">حذف</a>
                                </div>
                                <div className="w-full md:w-1/4 flex flex-col items-center p-3 bg-slate-100">
                                    <div className="bg-white w-full flex items-center justify-center h-[300px]">
                                        <img className="w-full h-full" src="https://binaries.templates.cdn.office.net/support/templates/en-us/lt44864860_quantized.png" alt="" srcSet="" />
                                    </div>
                                    <a className="pt-2 text-xs block w-full text-left text-red-400" href="#">حذف</a>
                                </div>
                                <div className="w-full md:w-1/4 flex flex-col items-center p-3 bg-slate-100">
                                    <div className="bg-white w-full flex items-center justify-center h-[300px]">
                                        <img className="w-full h-full" src="https://binaries.templates.cdn.office.net/support/templates/en-us/lt44864860_quantized.png" alt="" srcSet="" />
                                    </div>
                                    <a className="pt-2 text-xs block w-full text-left text-red-400" href="#">حذف</a>
                                </div>
                                <div className="w-full md:w-1/4 flex flex-col items-center p-3 bg-slate-100">
                                    <div className="bg-white w-full flex items-center justify-center h-[300px]">
                                        <img className="w-full h-full" src="https://binaries.templates.cdn.office.net/support/templates/en-us/lt44864860_quantized.png" alt="" srcSet="" />
                                    </div>
                                    <a className="pt-2 text-xs block w-full text-left text-red-400" href="#">حذف</a>
                                </div>
                                <div className="w-full md:w-1/4 flex flex-col items-center p-3 bg-slate-100">
                                    <div className="bg-white w-full flex items-center justify-center h-[300px]">
                                        <img className="w-full h-full" src="https://binaries.templates.cdn.office.net/support/templates/en-us/lt44864860_quantized.png" alt="" srcSet="" />
                                    </div>
                                    <a className="pt-2 text-xs block w-full text-left text-red-400" href="#">حذف</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Portfolio;