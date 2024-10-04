import React, { useState, useEffect } from 'react';
import Navigation from './component/Navigation';
import SuccessMessage from './component/SuccessMessage';
import EmployeeList from './component/EmployeeList';
import EmployeeForm from './component/EmployeeForm';
import Footer from './component/Footer';

import "./App.css" 

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activePage, setActivePage] = useState('home');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    setEmployees(storedEmployees);
  }, []);

  useEffect(() => {
    if (employees.length > 0) {
      localStorage.setItem('employees', JSON.stringify(employees));
    }
  }, [employees]);

  const handleSaveEmployee = (employee) => {
    let updatedEmployees;
    if (currentEmployee) {
      updatedEmployees = employees.map((e) =>
        e.id === employee.id ? employee : e
      );
    } else {
      updatedEmployees = [...employees, employee];
    }
    setEmployees(updatedEmployees);
    setCurrentEmployee(null);
    setSuccessMessage(currentEmployee ? 'Employee updated successfully!' : 'Employee added successfully!');
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleEditEmployee = (employee) => {
    setCurrentEmployee(employee);
    setActivePage('addEmployee');
  };

  const handleDeleteEmployee = (id) => {
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(updatedEmployees);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div style={{padding: 'px', textAlign: 'center',justifyContent:"center" ,alignItems:"center",backgroundColor:"#AED1FF",height:"100%"}}>
     
      <Navigation setActivePage={setActivePage} />

   
      <SuccessMessage message={successMessage} />

 
      {activePage === 'home' && <h1>Welcome to the Employee Management App</h1>}

      {activePage === 'employees' && (
        <>
          <input
            type="text"
            placeholder="Search by ID..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{
              padding: '10px',
              marginBottom: '20px',
              width: '300px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          <EmployeeList
            employees={employees}
            onEdit={handleEditEmployee}
            onDelete={handleDeleteEmployee}
            searchTerm={searchTerm}
          />
        </>
      )}

      {activePage === 'addEmployee' && (
        <EmployeeForm
          employee={currentEmployee}
          onSave={handleSaveEmployee}
          onCancel={() => setCurrentEmployee(null)}
        />
      )}

    
      <Footer />
    </div>
  );
};

export default App;
