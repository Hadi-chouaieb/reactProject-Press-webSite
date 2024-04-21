
import "./lastpost.css";
import Adhan from "./timeAdhan/Adhan";

function Lastpost() {

    const windowHeight = window.innerHeight + 'px';

    const text = "قيس سعيد يوقع اتفاقية مع الغرب"

    return (
        <div className='covert bg-dark-first covert' style={{ height: windowHeight }}>
        <Adhan last={text}/>
        </div>
    );
}

export default Lastpost;
