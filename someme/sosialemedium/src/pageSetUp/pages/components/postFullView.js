import '../../../css/postFullView.css'
import commentSymbol from '../../../icons/comment.png'

function PostFullView() {
    return (
        <>
            <div className='post-full-view'>
                <div className='post-user-top'>
                    <img src='https://www.wfla.com/wp-content/uploads/sites/71/2023/05/GettyImages-1389862392.jpg?w=2560&h=1440&crop=1'/>
                    <div className='post-user-name'>
                        <h2>Kattemann</h2>
                    </div>
                </div>
                <div className='post-view-content'>
                    <img src='https://i.pinimg.com/736x/38/a5/24/38a524b4f274c292620fa14c0441b612.jpg'/>
                    {/* <img src='https://media.macphun.com/img/uploads/macphun/blog/2063/_1.jpeg?q=75&w=1710&h=906&resize=cover'/> */}
                </div>
                <div className='post-interactive-content'>
                    <img className='post-comment-symbol' src={commentSymbol}/>
                </div>
            </div>
        </>
    );
}

export default PostFullView;