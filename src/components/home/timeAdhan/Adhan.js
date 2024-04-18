import React, { useEffect, useState } from 'react';
import { MdOutlineMosque } from "react-icons/md";
import axios from 'axios';
import mosque from "../../../assets/imgs/mosque.png"
import adhnaStyle from "./adhan.css"
export default function Adhan(props) {
    const [time, setTime] = useState("")
    const [timeAdhan, setTimeAdhan] = useState({
        Fajr: "-:-",
        Dhuhr: "-:-",
        Asr: "-:-",
        Maghrib: "-:-",
        Isha: "-:-",
        Hijri: "-:-",
        Normal: "-:-",



    })
    const options = {
        method: 'GET',
        url: 'https://api.aladhan.com/v1/timingsByCity?city=Tunis&country=Tunisia&method=2',
    };

    useEffect(() => {
        const interval = setInterval(() => {
            axios.get('http://worldtimeapi.org/api/timezone/Africa/Tunis')
                .then(ress => {
                    const currentTime = ress.data.datetime.split('T')[1].split('.')[0];
                    setTime({ TimeNow: currentTime.substr(0, currentTime.length - 3) });
                })
                .catch(err => {
                    console.log(err);
                });
        }, 2000);
        return () => clearInterval(interval);

    }, []);

    useEffect(() => {

        axios.request(options)
            .then(respp => {

                setTimeAdhan({
                    Fajr: respp.data.data.timings.Fajr,
                    Dhuhr: respp.data.data.timings.Dhuhr,
                    Asr: respp.data.data.timings.Asr,
                    Maghrib: respp.data.data.timings.Maghrib,
                    Isha: respp.data.data.timings.Isha,
                    Hijri: respp.data.data.date.hijri.date,
                    Normal: respp.data.data.date.gregorian.date,
                })

            })
            .catch(err => {
                console.error(err);
            })
    }, [])
    return (
        <div>
            <div className="bg-transparent mt-5 text-center row-centered" dir='rtl'>
                <div className='d-flex justify-content-center' >
                    <div className='row card col-4 timer'>
                        {time.TimeNow}
                    </div>
                </div>
                <div className='row d-flex justify-content-center'>
                    <div className={adhnaStyle.cardAdhan + ' card col-5 m-2'}>
                        <div className=''>التقويم الهجري</div>
                        <div>{timeAdhan.Hijri}</div>
                    </div>
                    <div className='card col-5 m-2'>
                        <div className=''>التقويم الميلادي</div>
                        <div>{timeAdhan.Normal}</div>
                    </div>

                </div>

                <div className='row'>
                <div className=' col-4 col-md-2 text-center d-flex justify-content-center'>
                    <div className="col-12 mt-2">
                        <div className='card'>
                            <div className='col-12'>
                                <div className='col-md-12 col-sm-2'>
                                    <img src={mosque} className='col-md-8 col-phone'></img>
                                </div>
                                <div className="nameAdhan">
                                    <MdOutlineMosque color='green'/> الفجر <MdOutlineMosque color='green'/>
                                </div>
                                <div className='text-success'>
                                    {timeAdhan.Fajr}
                                </div>
                            </div>



                            <div className='col-12'>
                                <div className="nameAdhan">
                                <MdOutlineMosque color='green'/> الظهر <MdOutlineMosque color='green'/>
                                </div>
                                <div className='text-success'>
                                    {timeAdhan.Dhuhr}
                                </div>
                            </div>

                            <div className='col-12'>
                                <div className="nameAdhan">
                                <MdOutlineMosque color='green'/> العصر <MdOutlineMosque color='green'/>
                                </div>
                                <div className='text-success'>
                                    {timeAdhan.Asr}
                                </div>
                            </div>

                            <div className='col-12'>
                                <div className="nameAdhan">
                                <MdOutlineMosque color='green'/> المغرب <MdOutlineMosque color='green'/>
                                </div>
                                <div className='text-success'>
                                    {timeAdhan.Maghrib}
                                </div>
                            </div>


                            <div className='col-12'>
                                <div className="nameAdhan">
                                <MdOutlineMosque color='green'/> العشاء <MdOutlineMosque color='green'/>
                                </div>
                                <div className='text-success'>
                                    {timeAdhan.Isha}
                                </div>
                            </div>









                        </div>
                    </div>
                </div>




            <div className='col-7 mt-5 text-light text-center text-last'>
                {props.last}
            </div>

            </div>

            </div>
        </div>
    )
}
