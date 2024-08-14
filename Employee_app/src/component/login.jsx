import { MdEmail } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaPhone } from "react-icons/fa6";
import { BsFileEarmarkPerson } from "react-icons/bs";
import { useState } from 'react';
  
const local="Employee"

function Login(){
  const [Input, setInput] = useState("");
  localStorage.setItem('Employee',JSON.stringify(Employee));



const handleSubmit = (event) => {
  event.preventDefault();
  
}
    return(
      <>
   
      <div className="container">
        <div className="header">
          <div className="text">Register Form</div>
          <div className="underline"></div>
        </div>
        <div className="input" onSubmit={handleSubmit} >
          <div className="input" >
          <IoPerson />
            <input type="text" placeholder="Name" value={Input.Name}   onChange={(e) => setInput(e.target.value)}></input>
          </div>
          <div className="input">
          <MdEmail />
            <input type="Email" placeholder="Email" value={Input.Email}   onChange={(e) => setInput(e.target.value)} ></input>
          </div>
          <div className="input">
          <FaPhone />
            <input type="number" placeholder="Phone Number" value={Input.Phonenumber}   onChange={(e) => setInput(e.target.value)}></input>
          </div>
          <div className="input">
          <BsFileEarmarkPerson />
            <input type="text" placeholder="Employee Positon" value={Input}   onChange={(e) => setInput(e.target.value)}></input>
          </div>
          <div className="input">
          <RiLockPasswordFill />
            <input type="text" placeholder="ID" value={Input}   onChange={(e) => setInput(e.target.value)}></input>
          </div><br></br>
          <button onSubmit={handleSubmit}>Submit</button>
        </div>
      </div>
     
   
      
      </>
    )
}
export default Login;