import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../../css/profileSite.css'
import optionsSymbol from '../../icons/options.png'
import PostMiniView from './components/postMiniView';
import ProfileSiteViewPosts from './profileSiteViewPosts';
import { useState, useEffect } from 'react';

function ProfileSite(){
    const userTag = useParams();
    const [showPosts, setShowPosts] = useState(false)
    
    return (
        <>
            {showPosts?<ProfileSiteViewPosts openedFromMiniView={true} setShowPosts={setShowPosts}/>:false}
           <div className='profile-container'>
                <div className='profile-information'>
                    <div className='profile-picture'>
                        <img src='https://media.npr.org/assets/img/2017/09/12/macaca_nigra_self-portrait-3e0070aa19a7fe36e802253048411a38f14a79f8-s1100-c50.jpg'/>
                    </div>
                    <div className='profile-text'>
                        <div className='top-profile-text'>
                            <h1 className='profile-username'>Indine😍🤣👌</h1>
                            <button>Following</button>
                            <button>Send message</button>
                            <button><img src={optionsSymbol}/></button>
                        </div>
                        <h3 className='profile-tag'>@monkindine</h3>
                        <h5 className='profile-description'>Yoooo, egg, jeg er ikke kreativ</h5>
                        <div className='profile-counts'>
                            <h4 className='profile-post-count'>3000 posts</h4>
                            <h4 className='profile-follower-count'>1 follower</h4>
                            <h4 className='profile-following-count'>23 following</h4>
                        </div>
                    </div>
                </div>
                <div className='profile-mini-posts'>
                    <div className='profile-mini-posts-container'>
                        <PostMiniView setShowPosts={setShowPosts}/>
                        <PostMiniView setShowPosts={setShowPosts}/>
                        <PostMiniView setShowPosts={setShowPosts}/>
                        <PostMiniView setShowPosts={setShowPosts}/>
                        <PostMiniView setShowPosts={setShowPosts}/>
                        <PostMiniView setShowPosts={setShowPosts}/>
                        <PostMiniView setShowPosts={setShowPosts}/>
                        <PostMiniView setShowPosts={setShowPosts}/>
                    </div>
                </div>
           </div>
        </>   
    );
}

export default ProfileSite;