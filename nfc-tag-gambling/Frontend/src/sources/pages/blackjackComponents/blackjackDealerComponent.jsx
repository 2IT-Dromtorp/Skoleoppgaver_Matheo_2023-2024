import '../../../css/blackjackDealerComponent.css'
import backCard from '../../../images/backofcard.png'

export default function BlackjackDealerComponent({ url, index, length }) {

    return (
        <>
        {!index&&length<=2?
            <img src={backCard} alt='' className="dealerHandPicture"/>
        :
            <img src={url} alt='' className="dealerHandPicture"/>
        }
        </>
        
    );
}
