import './kinComponent.css'

import { DialogContentContext } from '../../../../context';
import { useContext } from 'react';

import { Close } from '../../../../svg';

export default function KinComponent({name, email, address, phonenumber, use, index}) {
    const {dialogContent, setDialogContent} = useContext(DialogContentContext);

    function deleteItem() {           
        
        setDialogContent({
            operation: "addFamilyMember",
            data: [...dialogContent.data.slice(0, index), ...dialogContent.data.slice(index + 1)]
        });
      }

    return(
        <div className='kincomponent-main'>
            {use==="createUser"
            ?
            <div className='kin-close-button-container'>
                <button type="button" onClick={()=>deleteItem()} className="kin-close-button-button"><Close className="kin-close-button-svg"/></button>
            </div>
            
            :""}
            
            <div className='kincomponent-info-container'>
                <p className='kincomponent-name'>{name}</p>
                <p>{phonenumber}</p>
                <p>{email}</p>
                <p>{address}</p>
            </div>
        </div>
    )
}