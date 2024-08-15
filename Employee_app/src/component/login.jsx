import { MdEmail } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaPhone } from "react-icons/fa6";
import { BsFileEarmarkPerson } from "react-icons/bs";
import { useState } from 'react';
import Image from '../assets/person2-removebg-preview.png'


function Login(){
  const[Name,setName]=useState('');
  const[Email,setEmail]=useState('');
  const[Phone_Number,setPhone_Number]=useState('');
  const[Employee_Positon,setEmployee_Positon]=useState('');
  const[ID,setID]=useState('');



const handleSubmit =()=>{
 const Logindata = {
  
  Name,
  Email,
  Phone_Number,
  Employee_Positon,
  ID,

 }

 const existingEmployees = JSON.parse(localStorage.getItem("Employees")) || [];
 existingEmployees.push(Logindata);
 localStorage.setItem("Employees", JSON.stringify(existingEmployees));
 console.log(Logindata)
 
 alert("Submited succesfuly")
}


    return(
      <>
   
      <div className="container">
        <div className="header">
          <div className="text">Register Form</div>
          <div className="underline"></div>
        </div>
        <img src={Image}></img> <br></br> 
        <div className="input"  >
      
          <div className="input" >
          <IoPerson />
            <input type="text" placeholder="Name" value={Name}   onChange={e => setName(e.target.value)}  ></input>
          </div>
          <div className="input">
          <MdEmail />
            <input type="Email" placeholder="Email" value={Email}   onChange={e => setEmail(e.target.value)}   ></input>
          </div>
          <div className="input">
          <FaPhone />
            <input type="number" placeholder="Phone Number" value={Phone_Number}  onChange={e => setPhone_Number(e.target.value)}  ></input>
          </div>
          <div className="input">
          <BsFileEarmarkPerson />
            <input type="text" placeholder="Employee Positon" value={Employee_Positon}   onChange={e => setEmployee_Positon(e.target.value)}  ></input>
          </div>
          <div className="input">
          <RiLockPasswordFill />
            <input type="text" placeholder="ID" value={ID}    onChange={e => setID(e.target.value)}  ></input>
          </div><br></br>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
     
   
      
      </>
    )
}
export default Login;