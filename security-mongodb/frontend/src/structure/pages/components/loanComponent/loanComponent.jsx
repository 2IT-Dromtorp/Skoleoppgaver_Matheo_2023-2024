import './loanComponent.css'
import UserComponent from '../usercomponent/userComponent';
import ItemComponent from '../itemComponent';

export default function LoanComponent({item, user, loanStartTime, loanEndTime}) {
    
    return(
        <div className='loancomponent-main'>
            <UserComponent givenName={user.givenName} surname={user.surname} email={user.emailOfUser} sclass={user.class}/>
            <ItemComponent tool={item.toolOfItem} serialNumber={item.serialNumberOfItem} borrowedBy={loanEndTime}/>
            <div className='loancomponent-bottom-bar'>
                <div>
                    <p>Item loaned at:</p>
                    <p>{loanStartTime}</p>
                </div>
                <div>
                    <p>Item returned at:</p>
                    <p>{loanEndTime?loanEndTime:"Item is yet to be returned"}</p>
                </div>
            </div>
        </div>
    )
}