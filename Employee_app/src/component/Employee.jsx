import React, { useState, useEffect } from 'react';
import Footer from './Footer';
// EmployeeForm component for adding and editing employees
const EmployeeForm = ({ employee, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    image: null,
    position: '',
    id: '',
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        surname: employee.surname,
        email: employee.email,
        phone: employee.phone,
        image: null,  // Keep null unless an image is updated
        position: employee.position,
        id: employee.id,
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedEmployee = {
      ...formData,
      image: formData.image ? URL.createObjectURL(formData.image) : employee?.image,
    };
    onSave(updatedEmployee);
    setFormData({
      name: '',
      surname: '',
      email: '',
      phone: '',
      image: null,
      position: '',
      id: '',
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginBottom: '20px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        textAlign: 'center',
      }}
    >
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
        style={{ padding: '10px', marginBottom: '10px', width: '300px', border: '1px solid #ccc', borderRadius: '4px' }}
      />
      <input
        type="text"
        name="surname"
        value={formData.surname}
        onChange={handleChange}
        placeholder="Surname"
        required
        style={{ padding: '10px', marginBottom: '10px', width: '300px', border: '1px solid #ccc', borderRadius: '4px' }}
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
        style={{ padding: '10px', marginBottom: '10px', width: '300px', border: '1px solid #ccc', borderRadius: '4px' }}
      />
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
        required
        style={{ padding: '10px', marginBottom: '10px', width: '300px', border: '1px solid #ccc', borderRadius: '4px' }}
      />
      <input
        type="file"
        name="image"
        onChange={handleChange}
        accept="image/*"
        style={{ padding: '10px', marginBottom: '10px', width: '300px', border: '1px solid #ccc', borderRadius: '4px' }}
      />
      <input
        type="text"
        name="position"
        value={formData.position}
        onChange={handleChange}
        placeholder="Position"
        required
        style={{ padding: '10px', marginBottom: '10px', width: '300px', border: '1px solid #ccc', borderRadius: '4px' }}
      />
      <input
        type="text"
        name="id"
        value={formData.id}
        onChange={handleChange}
        placeholder="ID (Unique)"
        required
        style={{ padding: '10px', marginBottom: '10px', width: '300px', border: '1px solid #ccc', borderRadius: '4px' }}
      />
      <div>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            margin: '10px',
            backgroundColor: '#38a169',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{
            padding: '10px 20px',
            margin: '10px',
            backgroundColor: '#e53e3e',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

// EmployeeList component to display all employees 
const EmployeeList = ({ employees, onEdit, onDelete, searchTerm }) => {
    const filteredEmployees = employees.filter(employee =>
      employee.id.includes(searchTerm)
    );
  
    return (
      <div style={{ padding: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {filteredEmployees.map((employee) => (
          <div
            key={employee.id}
            style={{
              padding: '20px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              marginBottom: '10px',
              backgroundColor: '#f9f9f9',
              textAlign: 'center',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              width: '250px', 
              margin: '10px', 
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>
              {employee.name} {employee.surname}
            </h3>
            <p>Email: {employee.email}</p>
            <p>Phone: {employee.phone}</p>
            <p>Position: {employee.position}</p>
            {employee.image && (
              <img
                src={employee.image}
                alt={employee.name}
                style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '10px' }}
              />
            )}
            <div>
              <button
                onClick={() => onEdit(employee)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#f6ad55',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginRight: '10px',
                }}
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(employee.id)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#e53e3e',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

// Main App component
const App = () => {
  const [employees, setEmployees] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activePage, setActivePage] = useState('home');

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
    if (currentEmployee) {
      const updatedEmployees = employees.map((e) =>
        e.id === employee.id ? employee : e
      );
      setEmployees(updatedEmployees);
    } else {
      setEmployees([...employees, employee]);
    }
    setCurrentEmployee(null);
  };

  const handleEditEmployee = (employee) => {
    setCurrentEmployee(employee);
  };

  const handleDeleteEmployee = (id) => {
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(updatedEmployees);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      {/* Navigation Bar */}
      <nav style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
        backgroundColor: '#2d3748',
        padding: '10px',
        borderRadius: '8px',
       
      }}>
        <button
          onClick={() => setActivePage('home')}
          style={{ padding: '10px 20px', margin: '5px', color: 'white', backgroundColor: '#38a169', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Home
        </button>
        <button
          onClick={() => setActivePage('employees')}
          style={{ padding: '10px 20px', margin: '5px', color: 'white', backgroundColor: '#38a169', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Employees
        </button>
        <button
          onClick={() => setActivePage('addEmployee')}
          style={{ padding: '10px 20px', margin: '5px', color: 'white', backgroundColor: '#38a169', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Add Employee
        </button>
      </nav>

      {/* Conditional rendering based on active page */}
      {activePage === 'home' && <h1>Welcome to the Employee Registration App</h1>}
      
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

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default App;
