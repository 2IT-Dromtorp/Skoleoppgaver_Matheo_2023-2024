import './dialogBox.css'

export default function DialogBox({DataFromUser}){

    return(
        <div className='dialog-main'>
            <div className='actual-dialog-main'>
                <DataFromUser/>
            </div>
        </div>
    )
}