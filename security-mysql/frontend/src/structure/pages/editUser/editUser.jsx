import { useContext, useEffect, useState } from 'react';
import './editUser.css'

import { Link, useNavigate, useParams } from 'react-router-dom'
import { GetFetch } from '../../functions'

import { DialogContentContext } from '../../../context';

import KinComponent from '../components/kinComponent/kinComponent';
import DialogBox from '../../dialogBox/dialogBox';

export default function EditUser() {
    const navigate = useNavigate();
    const { email } = useParams();

    const {dialogContent, setDialogContent} = useContext(DialogContentContext);

    const [userData, setUserData] = useState({})
    const [usersClass, setUsersClass] = useState("")

    const [phone, setPhone] = useState("") 
    const [locemail, setEmail] = useState("")
    const [givenName, setGivenName] = useState("")
    const [surname, setSurname] = useState("")
    const [address, setAddress] = useState("")
    const [schoolclass, setSchoolclass] = useState("")

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newPasswordRepeat, setNewPasswordRepeat] = useState("")

    const [showDialog, setShowDialog] = useState(false);

    useEffect(()=>{
        setDialogContent({});
        async function fetchData() {
            const response = await GetFetch(`/api/user-data-for-edit?email=${email}`, navigate);
            if(!response.ok){
                return;
            }

            const data = await response.json();   

            setUserData(data.data); 
            setUsersClass(data.userClass);
        }

        fetchData();
    },[email]);

    useEffect(()=> {
        if(!userData.email) return;

        setDialogContent({operation: "addFamilyMember",data:userData.kin});
        setSchoolclass(userData.class);
        setEmail(`${userData.email}@viken.no`);
        setAddress(userData.address);
        setGivenName(userData.givenName);
        setSurname(userData.surname);
        setPhone(userData.phone);
    },[userData])

    const handlesumbit = async (e) => {
        e.preventDefault();
        const accessToken = localStorage.getItem("accessToken");
        
        const response = await fetch("/api/update-user-teacher", {
            method:"PUT",
            headers:{
                "Content-type":"application/json",
                'Authorization': `Bearer ${accessToken}`	
            },
            body:JSON.stringify({
                class:schoolclass,
                givenName:givenName,
                surname:surname,
                email: locemail,
                oldEmail: email,
                phone: phone,
                address: address,
                familyMembers:dialogContent.data
            })
        });

        if(response.status===403) return navigate("/")
        if(response.status===401) return navigate("/log-in")
        if(!response.ok) {
            return;
        }

        navigate(`/profile/${locemail.split("@")[0]}`)
    }

    function DataForFamilyDialog() {
        const [famname, setFamname] = useState("");
        const [famemail, setFamemail] = useState("");
        const [famphonenumber, setFamphonenumber] = useState("");
        const [famaddress, setFamadress] = useState("");

        function submitData(e) {
            e.preventDefault()
            setDialogContent({
                operation: "addFamilyMember",
                data: [
                    ...dialogContent.data,
                    {
                        name: famname,
                        email: famemail,
                        phone: famphonenumber,
                        address: famaddress
                    }
                ]
            });

            setShowDialog(false);
        }

        return(
            <form onSubmit={(e) => submitData(e)} className='dialog-add-family-member-form'>
                <input type='text' required={true} value={famname} onChange={(e)=>setFamname(e.target.value)} placeholder='Name' className='dialog-add-family-member-input'/>
                <input autoComplete="email" type="email" required={true} value={famemail} onChange={(e)=>setFamemail(e.target.value)} placeholder='Email' className='dialog-add-family-member-input'/>
                <input type="tel" pattern="[0-9]{8}" required={true} value={famphonenumber} onChange={(e)=>setFamphonenumber(e.target.value)} placeholder='Phone number' className='dialog-add-family-member-input'/>
                <input type='text' required={true} value={famaddress} onChange={(e)=>setFamadress(e.target.value)} placeholder='Address' className='dialog-add-family-member-input'/>
                <button type='submit' className='dialog-add-family-member-submit-button'>Submit</button>
            </form>
        )
    };

    return(
        <>{userData.email&&usersClass==="LAERER"?
            <>
                {showDialog?<DialogBox DataFromUser={DataForFamilyDialog}/>:""}

                <form onSubmit={handlesumbit} className="login-form edituser-form">
                    <select required={true} onChange={(e)=>setSchoolclass(e.target.value)} value={schoolclass} placeholder="Your class" className='createuser-input-field createuser-select-field'>
                        <option value="None">Select a class</option>
                        <option value="2ITA">2ITA</option>
                        <option value="2ITB">2ITB</option>
                        <option value="2MPA">2MPA</option>
                        <option value="1IMX">1IMX</option>
                        <option value="LAERER">Lærer</option>
                    </select>

                    <input className="createuser-input-field" required={true} type="text" onChange={(e)=>setGivenName(e.target.value)} value={givenName} placeholder="Firstname"/>
                    <input className="createuser-input-field" required={true} type="text" onChange={(e)=>setSurname(e.target.value)} value={surname} placeholder="Lastname"/>
                    <input className="createuser-input-field" required={true} autoComplete="email" type="email" onChange={(e)=>setEmail(e.target.value)} value={locemail} placeholder="Email"/>
                    
                    <input className="createuser-input-field" required={schoolclass!=="LAERER"} type="tel" pattern="[0-9]{8}" placeholder='Phone number' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                    <input className="createuser-input-field" required={schoolclass!=="LAERER"} autoComplete="address" type="text" onChange={(e)=>setAddress(e.target.value)} value={address} placeholder="Address"/>
                    
                    {schoolclass!=="LAERER"?<button type="button" onClick={()=>setShowDialog(true)} className='createuser-input-add-family-button'>Add a family member</button>:""}

                    {dialogContent.operation==="addFamilyMember"&&dialogContent.data.length?dialogContent.data.map((member, index) =>
                        <KinComponent key={index} index={index} name={member.name} address={member.address} phonenumber={member.phone} email={member.email} use="createUser"/>
                    ):(
                        schoolclass!=="LAERER"?"You must have at least one family member":""
                    )
                    }
                    
                    <button type="submit" className="login-login-button">Save Changes</button>
                    <Link className="login-login-button edituser-discard-button" to={`/profile/${email}`}>Discard changes</Link>
                </form>
            </>

        :(userData.email?
            
            <div className='edituser-editpassword-main'>
                <p className="createuser-input-field edituser-cant-edit-field">{givenName}</p>
                <p className="createuser-input-field edituser-cant-edit-field">{surname}</p>
                <p className="createuser-input-field edituser-cant-edit-field">{locemail}</p>
                
                <p className="createuser-input-field edituser-cant-edit-field">{phone}</p>
                <p className="createuser-input-field edituser-cant-edit-field">{address}</p>

                {dialogContent.operation==="addFamilyMember"&&dialogContent.data.length?dialogContent.data.map((member, index) =>
                    <KinComponent key={index} index={index} name={member.name} address={member.address} phonenumber={member.phone} email={member.email} use="display"/>
                ):"You must have at least one family member"}
                
                <input className="createuser-input-field" required={true} type="text" onChange={(e)=>setGivenName(e.target.value)} value={givenName} placeholder="Firstname"/>

            </div>
            
        :"Loading...")}</>
    )
}