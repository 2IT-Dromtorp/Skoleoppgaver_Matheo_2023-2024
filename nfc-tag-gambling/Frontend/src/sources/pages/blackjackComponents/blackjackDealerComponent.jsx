import '../../../css/blackjackDealerComponent.css'
import backCard from '../../../images/backofcard.png'

export default function BlackjackDealerComponent({ url, index }) {
    return (
        <>
        {index===0?
            <img src={backCard} alt='' className="dealerHandPicture"/>
        :
            <img src={url} alt='' className="dealerHandPicture"/>
        }
        </>
        
    );
}
