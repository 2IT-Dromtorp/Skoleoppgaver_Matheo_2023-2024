import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../../css/profileSite.css';

function PostMiniView({setShowPosts}) {
    const postCurrentlyOn = 0;

    return (
        <div className='post-mini-view'>
            <button onClick={()=>setShowPosts(true)}>
                <img src='https://www.wfla.com/wp-content/uploads/sites/71/2023/05/GettyImages-1389862392.jpg?w=2560&h=1440&crop=1' alt='example' />
            </button>
        </div>
    );
}

export default PostMiniView;
