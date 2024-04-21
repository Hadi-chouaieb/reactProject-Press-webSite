import React from 'react'
import "./Taskbar.css"
function TaskBar() {
    return (
        <>

            <div className='row m-0 p-0 bt-bar'>
                <marquee scrolldelay="0" loop="-1" className=" bg-dark-first text-light p-3 col-10 col-md-11 "> اسماعيل حسني - قيس سعيد يحوس - قيس شقير ان لم تكن انت فأنا هنا - قال احدهم سايس روحك كي تشق الكياس </marquee>
                <div className='col-2 col-md-1 bg-dark-first  text-bg-danger bg-dark-third p-3 pb-0 text-end' >عاجل</div>
            </div>

        </>
    )
}

export default TaskBar;
