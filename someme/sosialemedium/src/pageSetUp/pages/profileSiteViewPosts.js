import PostFullView from './components/postFullView'
import '../../css/profileSiteViewPosts.css'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ProfileSiteViewPosts({openedFromMiniView, setShowPosts}){
    const [showXOutButton, setShowXOutButton] = useState(true)
    const [closePostFullView, setClosePostFullView] = useState(() => setShowPosts);


    useEffect(()=>{
        if(Boolean(openedFromMiniView)!==true){
            setShowXOutButton(false)
        }
        if(typeof(setShowPosts)!=='function'){
            setClosePostFullView(false)
        }
    }, [openedFromMiniView, setShowPosts])

    const handleClick = () => {
        if(typeof(closePostFullView)==='function'){
            closePostFullView()
        }
    };
    
    return (
        <>
            <section className='view-prfile-post-main-part' onClick={handleClick}>

                <Link to={`/a`}>⬅️</Link>

                <PostFullView showXOutButton={showXOutButton} closePostFullView={closePostFullView}/>

                <Link to={`/a`}>➡️</Link>

            </section>
        </>   
    );
}

export default ProfileSiteViewPosts;