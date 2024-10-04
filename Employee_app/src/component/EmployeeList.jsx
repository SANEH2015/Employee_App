
import React from 'react';

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

export default EmployeeList;
