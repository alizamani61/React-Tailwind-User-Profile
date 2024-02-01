import { useEffect, useState } from "react";
import moment from "jalali-moment";
import { BsChevronLeft, BsChevronRight, BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs';

const Calendar = ({onSelectDay}) => {

    const [days, setDays] = useState([]);
    const [currentYear, setCurrentYear] = useState(moment().locale(`fa`).year());
    const [currentMonth, setCurrentMonth] = useState(moment().locale(`fa`).month());

    
    //
    useEffect(() => {

        ////////////////////////////////////////////////Moment/////////////////////////////////////////////////////
        let m = moment();
        m.locale(`fa`);
        m.month(currentMonth);
        //m.month(6);
        m.year(currentYear);
        m.date(1);
        //////////////////////////////////////////////////////////////////////////////////////////////////////////
        // let firstDayOfMonth = m.weekday() > 0 ? (m.weekday() - 1) : m.weekday();
        //let firstDayOfMonth = (m.weekday()-1) == -1? 6: (m.weekday()-1);
        const firstDayOfMonth = m.weekday()
        const endofMonth = parseInt(m.endOf(`month`).format(`D`));
        
        //////////////////////////////////////////////////////////////////////////////////////////////////////////
        //It is a local array variable will be 
        //using to fill the days state 
        let row = [
            ['', '', '', '', '', '', ''],['', '', '', '', '', '', ''],['', '', '', '', '', '', ''],
            ['', '', '', '', '', '', ''],['', '', '', '', '', '', ''],['', '', '', '', '', '', ''],
        ];

        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        //In this stage we will start a loop from the first day 
        //to the end day of month and fill the local row array
        for (let i = 1; i <= endofMonth; i++) {
            //We should first retrieve current day number in relative week
            //firstDayOfMonth is the first day week number of current month.
            const weekNumber = Math.ceil((firstDayOfMonth + i) / 7);

            //set current day to {i} variable e.g. 20
            m.date(i);

            //Fill the local row array 
            row[weekNumber - 1][m.weekday()] = i;

        }

        //set the main state
        setDays(row);


    }, [currentMonth, currentYear]);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    const monthName = (monthNum) => {
        switch (monthNum) {
            case 1: return 'فروردین'; break;
            case 2: return 'اردیبهشت'; break;
            case 3: return 'خرداد'; break;
            case 4: return 'تیر'; break;
            case 5: return 'مرداد'; break;
            case 6: return 'شهریور'; break;
            case 7: return 'مهر'; break;
            case 8: return 'آبان'; break;
            case 9: return 'آذر'; break;
            case 10: return 'دی'; break;
            case 11: return 'بهمن'; break;
            case 12: return 'اسفند'; break;
        }
    };

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    function pad(str, max) {
        str = str.toString();
        return str.length < max ? pad("0" + str, max) : str;
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Increase a month
    const incMonth = () => {
        setCurrentMonth(oldState => oldState == 11 ? 0 : oldState + 1);

        if (currentMonth == 11)
            setCurrentYear(oldState => oldState + 1);
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Decrease a month
    const decMonth = () => {
        setCurrentMonth(oldState => oldState == 0 ? 11 : oldState - 1);

        if (currentMonth == 0)
            setCurrentYear(oldState => oldState - 1);
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Check today
    const isToday = (day) => {
        const m1 = moment();
        m1.locale(`fa`);

        const today = m1.format("D");
        const thismonth = m1.format("M");
        const thisyear = m1.format("yyyy");

        if (day == today && thismonth == (currentMonth + 1) && thisyear == currentYear)
            return true;

        return false;
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    const onSelect = (e, day) => {
        e.preventDefault();

        if (day > 0)
            onSelectDay(`${currentYear}/${pad((currentMonth + 1), 2)}/${pad(day, 2)}`)

    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <>
            <div className="bg-white absolute top-0 z-[1010] flex flex-col shadow-lg border border-gray-100 w-[250px] text-slate-500 rounded-md">
                <div className="p-2 border-b border-slate-200">
                    {/**********************************************For Years********************************************/}
                    <div className="flex flex-row">
                        <div className="w-1/6 text-center">
                            <button onClick={e => setCurrentYear(oldState => oldState - 1)} className="text-xs"><BsChevronDoubleRight /></button>
                        </div>
                        <div className="w-4/6 text-center text-sm">{currentYear}</div>
                        <div className="w-1/6 text-center">
                            <button onClick={e => setCurrentYear(oldState => oldState + 1)} className="text-xs"><BsChevronDoubleLeft /></button>
                        </div>
                    </div>

                    {/**********************************************For Months*******************************************/}
                    <div className="flex flex-row">
                        <div className="w-1/6 text-center">
                            <button onClick={decMonth} className="text-xl"><BsChevronRight /></button>
                        </div>
                        <div className="w-4/6 text-center"><strong>{monthName(currentMonth + 1)}</strong></div>
                        <div className="w-1/6 text-center">
                            <button onClick={incMonth} className="text-xl"><BsChevronLeft /></button>
                        </div>
                    </div>
                </div>
                <table className="calendar-table">
                    <thead>
                        <tr>
                            <th>ش</th>
                            <th>ی</th>
                            <th>د</th>
                            <th>س</th>
                            <th>چ</th>
                            <th>پ</th>
                            <th>ج</th>
                        </tr>
                    </thead>
                    <tbody>
                        {days.map((r, i) => (<tr key={i}>{r.map((c, j) => <td className={isToday(c) ? "today" : c == "" ? "empty" : ""} key={j}><a href="#" onClick={e => onSelect(e, c)}>{c}</a></td>)}</tr>))}
                    </tbody>
                </table>
            </div>
        </>
    )
};

export default Calendar;