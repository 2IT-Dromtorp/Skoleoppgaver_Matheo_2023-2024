import './dialogBox.css'

export default function DialogBox({DataFromUser}){

    // console.log(dataFromUser)
    return(
        <div className='dialog-main'>
            <ActualDialogBox DataFromUser={DataFromUser}/>
        </div>
    )
}

function ActualDialogBox({DataFromUser}) {

    return(
        <div className='actual-dialog-main'>
            <DataFromUser/>
        </div>
    )
}