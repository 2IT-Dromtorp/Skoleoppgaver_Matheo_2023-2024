import PostFullView from './components/postFullView'
import '../../css/profileSiteViewPosts.css'
import { Link } from 'react-router-dom';

function ProfileSiteViewPosts(){

    return (
        <>
            <section className='view-prfile-post-main-part'>

                <Link to={`/a`}>⬅️</Link>

                <PostFullView/>

                <Link to={`/a`}>➡️</Link>

            </section>
        </>   
    );
}

export default ProfileSiteViewPosts;