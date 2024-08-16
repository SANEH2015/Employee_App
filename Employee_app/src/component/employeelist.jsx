import React, { useState, useEffect } from 'react';
import Image from '../assets/person2-removebg-preview.png'

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [editing, setEditing] = useState(null);
  const [updatedEmployee, setUpdatedEmployee] = useState({});

  useEffect(() => {
    const storedEmployees = localStorage.getItem("Employees");
    if (storedEmployees) {
      setEmployees(JSON.parse(storedEmployees));
    }
  }, []);

  const handleDelete = (id) => {
    const updatedEmployees = employees.filter((employee) => employee.ID !== id);
    localStorage.setItem("Employees", JSON.stringify(updatedEmployees));
    setEmployees(updatedEmployees);
  };

  const handleEdit = (employee) => {
    setEditing(employee.ID);
    setUpdatedEmployee(employee);
   
  };

  const handleUpdate = () => {
    const updatedEmployees = employees.map((employee) => {
      if (employee.ID === editing) {
        return updatedEmployee;
     
      }
      return employee;
      
    });
    localStorage.setItem("Employees", JSON.stringify(updatedEmployees));
    setEmployees(updatedEmployees);
    setEditing(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedEmployee((prevEmployee) => ({ ...prevEmployee, [name]: value }));
  };

  return (
    <div>
      <h2>Employee List</h2>
     <div><input type='text' placeholder="Name" style={{width:"300px",height:"30px",borderRadius:"10px"}}></input></div> 
      <ul>
        {employees.map((employee) => (
          <li key={employee.ID}>
            {editing === employee.ID ? (
              <form style={{backgroundColor:" rgb(121, 139, 155)",margin:"10px",padding:"20px",borderRadius:"10px"}}>
                <label>
                <img className='lg' src={Image}></img> <br></br> 
                  Name:
                  <input style={{width:'200px',height:"30px",borderRadius:"5px"}}
                    type="text"
                    name="Name"
                    value={updatedEmployee.Name}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <label>
                  Email:
                  <input style={{width:'200px',height:"30px",borderRadius:"5px"}}
                    type="email"
                    name="Email"
                    value={updatedEmployee.Email}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <label>
                  Phone Number:
                  <input style={{width:'200px',height:"30px",borderRadius:"5px"}}
                    type="tel"
                    name="Phone_Number"
                    value={updatedEmployee.Phone_Number}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <label>
                  Employee Position:
                  <input style={{width:'200px',height:"30px",borderRadius:"5px"}}
                    type="text"
                    name="Employee_Positon"
                    value={updatedEmployee.Employee_Positon}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <button onClick={handleUpdate}>Update</button>
                <button onClick={() => setEditing(null)}>Cancel</button>
              </form>
            ) : (
              <>
                <p><strong>Name:</strong> {employee.Name}</p>
                <p><strong>Email:</strong> {employee.Email}</p>
                <p><strong>Phone Number:</strong> {employee.Phone_Number}</p>
                <p><strong>Employee Position:</strong> {employee.Employee_Positon}</p>
                <p><strong>ID:</strong> {employee.ID}</p>
                <button style={{backgroundColor:"green"}}onClick={() => handleEdit(employee)}>Edit</button>
                <button style={{backgroundColor:"red"}} onClick={() => handleDelete(employee.ID)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Employee;