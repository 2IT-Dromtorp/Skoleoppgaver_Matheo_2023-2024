import '../../css/homeSite.css'
import '../../css/postFullView.css'
import { Link } from 'react-router-dom';
import PostFullView from './components/postFullView';

function HomeSite(){

    return (
        <>
            <div className='own-profile-part-layout'>
                <img className='own-profile-picture-layout' src='https://img5.custompublish.com/getfile.php/2302440.1495.ueexrwvwfy/1200x630/IMG_2881_Jan-Billy-i-regnet-forside-Kondis.jpg?return=www.kondis.no'/>
                <div className='account-name-layout'>
                    <h3>Cursed Vegar</h3>
                    <h4>@Oliver</h4>
                </div>  
            </div>
            <section className='home_section'>

                <PostFullView/>

            </section>
        </>   
    );
}

export default HomeSite;