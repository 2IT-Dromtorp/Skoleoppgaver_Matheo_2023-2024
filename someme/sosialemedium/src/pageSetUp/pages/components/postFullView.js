import '../../../css/postFullView.css'
import commentSymbol from '../../../icons/comment.png'
import likeSymbol from '../../../icons/like.png'
import xSymbol from '../../../icons/xout.png'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

//I tillegg skal det importeres hvilken liste det hentes fra, list[i]
function PostFullView({showXOutButton, closePostFullView}) {
    const userTag = '@kattemann';
    const [xButtonDisplayed, setXButtonDisplayed] = useState(true);

    useEffect(()=>{
        if(showXOutButton!==true){
            setXButtonDisplayed(false);
        };
    }, [])

    const handleClickedEntireDiv = (event) => {
        if (xButtonDisplayed) {
            event.stopPropagation();
        };
    };

    const handleClosePostFullView = () => {
        if(typeof(closePostFullView)==='function'){
            closePostFullView()
        }
    }

    return (
        <>
            <div className='post-full-view' onClick={handleClickedEntireDiv}>
                <div className='post-user-top'>
                    <img src='https://www.wfla.com/wp-content/uploads/sites/71/2023/05/GettyImages-1389862392.jpg?w=2560&h=1440&crop=1'/>
                    <div className='post-user-name' onClick={handleClosePostFullView}>
                        <Link to={`/${userTag}`}>Kattemann</Link>
                    </div>
                    {xButtonDisplayed?<div className='post-user-x-out'>
                        <img src={xSymbol} onClick={handleClosePostFullView}/>
                    </div>:false}
                </div>
                <div className='post-view-content'>
                    <img src='https://i.pinimg.com/736x/38/a5/24/38a524b4f274c292620fa14c0441b612.jpg'/> 
                </div>
                <div className='post-interactive-content'>
                    <img className='post-like-symbol' src={likeSymbol}/>
                    <img className='post-comment-symbol' src={commentSymbol}/>
                </div>
            </div>
        </>
    );
}

export default PostFullView;