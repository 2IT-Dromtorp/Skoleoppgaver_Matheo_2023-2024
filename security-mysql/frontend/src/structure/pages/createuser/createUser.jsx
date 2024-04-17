import '../loginpage/logInPage.css'
import './createuser.css'

import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { EmailContext, SchoolclassContext, DialogContentContext } from "../../../context";

import DialogBox from '../../dialogBox/dialogBox';

import KinComponent from '../components/kinComponent/kinComponent';

export default function CreateUser() {
    const [givenName, setGivenName] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmailLoc] = useState("")
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [schoolclass, setSchoolclassLoc] = useState("None")

    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const {dialogContent, setDialogContent} = useContext(DialogContentContext);

    const {setEmail} = useContext(EmailContext);
    const {setSchoolclass} = useContext(SchoolclassContext);

    const [showDialog, setShowDialog] = useState(false);


    const navigate = useNavigate();

    useEffect(()=>{
        setEmail("");
        setSchoolclass("");
        localStorage.setItem("accessToken","");
    },[setEmail, setSchoolclass])

    const handleLogin = async (e) => {
        e.preventDefault();
        if(password!==passwordCheck) return alert("The password does not match");
        if(schoolclass==="None") return alert("You have to choose a class");
        if(schoolclass!=="LAERER"&&!dialogContent.data.length) return alert("You have to add at least one family member");
        try{
            const response = await fetch("/api/createuser",{
                method:"POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    email:email,
                    password:password,
                    givenname:givenName,
                    surname:surname,
                    schoolclass:schoolclass,
                    phone:phone,
                    address:address,
                    familyMembers:dialogContent.data
                })
            })

            if (!response.ok){
                if(response.status===412) setEmailLoc("");
                const responseData = await response.json();
                setPassword("");
                setPasswordCheck("");
                alert(responseData.message);
                return;
            }
            
            const responseData = await response.json();
            localStorage.setItem("accessToken",responseData.accessToken);
            setEmail(email);
            setSchoolclass(schoolclass);
            navigate("/");
        } catch(error){
            console.error("Error during fetch:", error.message);
        }
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
            <form onSubmit={(e) => submitData(e)}>
                <input type='text' required={true} value={famname} onChange={(e)=>setFamname(e.target.value)} placeholder='Name'/>
                <input type='text' required={true} value={famemail} onChange={(e)=>setFamemail(e.target.value)} placeholder='Email'/>
                <input type='text' required={true} value={famphonenumber} onChange={(e)=>setFamphonenumber(e.target.value)} placeholder='Phone'/>
                <input type='text' required={true} value={famaddress} onChange={(e)=>setFamadress(e.target.value)} placeholder='Address'/>
                <button type='submit'>Submit</button>
            </form>
        )
    };

    return (
        <>
        {showDialog?<DialogBox DataFromUser={DataForFamilyDialog}/>:""}

        <div className="login-main">
            <div className="login-info">

            </div>
            <div className="login-login">

                <form onSubmit={handleLogin} className="login-form">
                    <select required={true} onChange={(e)=>setSchoolclassLoc(e.target.value)} value={schoolclass} placeholder="Your class" className='createuser-input-field'>
                        <option value="None">Select a class</option>
                        <option value="2ITA">2ITA</option>
                        <option value="2ITB">2ITB</option>
                        <option value="2MPA">2MPA</option>
                        <option value="1IMX">1IMX</option>
                        <option value="LAERER">Lærer</option>
                    </select>

                    <input className="createuser-input-field" required={true} type="text" onChange={(e)=>setGivenName(e.target.value)} value={givenName} placeholder="Firstname"/>
                    <input className="createuser-input-field" required={true} type="text" onChange={(e)=>setSurname(e.target.value)} value={surname} placeholder="Lastname"/>
                    <input className="createuser-input-field" required={true} autoComplete="email" type="email" onChange={(e)=>setEmailLoc(e.target.value)} value={email} placeholder="Email"/>
                    <input className="createuser-input-field" required={true} autoComplete="password" type="password" onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="Password" minLength={8}/>
                    <input className="createuser-input-field" required={true} autoComplete="password" type="password" onChange={(e)=>setPasswordCheck(e.target.value)} value={passwordCheck} placeholder="Repeat your password" minLength={8}/>
                    
                    <input className="createuser-input-field" required={!schoolclass==="LAERER"} type="tel" pattern="[0-9]{8}" placeholder='Phone number' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                    <input className="createuser-input-field" required={!schoolclass==="LAERER"} autoComplete="address" type="text" onChange={(e)=>setAddress(e.target.value)} value={address} placeholder="Address"/>
                    
                    <button type="button" onClick={()=>setShowDialog(true)}>Add a family member</button>

                    {dialogContent.operation==="addFamilyMember"?dialogContent.data.map((member, index) =>
                        <KinComponent key={index} name={member.name} address={member.address} phonenumber={member.phone} email={member.email}/>
                        
                    ):"No family members added"}
                    
                    <button type="submit" className="login-login-button">Create User</button>
                </form>
                <Link to="/log-in" className="login-create-user-link">Already have a user? Log in</Link>
            </div>
        </div>
        </>
    );
}