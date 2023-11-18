import '../../css/homeSite.css'
import '../../css/postFullView.css'
import { Link } from 'react-router-dom';
import PostFullView from './components/postFullView';

function HomeSite(){

    return (
        <section className='home_section'>

            <PostFullView/>

            
        </section>
    );
}

export default HomeSite;