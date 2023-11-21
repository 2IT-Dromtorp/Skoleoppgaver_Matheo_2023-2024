import '../../css/homesite.css'
import MiniDisplayCourse from '../components/miniDisplayCourse';

function Homesite() {
    return (
        <div className='homesite-main'>
            <MiniDisplayCourse/>
            <MiniDisplayCourse/>
            <MiniDisplayCourse/>
        </div>
    );
}

export default Homesite;