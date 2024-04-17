import './kinComponent.css'

export default function KinComponent({name, email, address, phonenumber}) {

    return(
        <div className='kincomponent-main'>
            <p className='kincomponent-name'>{name}</p>
            <p>{phonenumber}</p>
            <p>{email}</p>
            <p>{address}</p>
        </div>
    )
}