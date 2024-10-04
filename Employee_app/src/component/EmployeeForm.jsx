import React, { useState, useEffect } from 'react';

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

  const [imageUrl, setImageUrl] = useState(null); // To store the image URL permanently if present

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        surname: employee.surname,
        email: employee.email,
        phone: employee.phone,
        image: null, // Set this to null when editing, but store image URL separately
        position: employee.position,
        id: employee.id,
      });
      setImageUrl(employee.image); // Keep the image URL when editing
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      setFormData({ ...formData, [name]: file });
      setImageUrl(URL.createObjectURL(file)); // Update the image preview when file is chosen
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedEmployee = {
      ...formData,
      image: formData.image ? imageUrl : employee?.image, // Use imageUrl or existing image if no new image is uploaded
    };
    onSave(updatedEmployee);
    // Reset form but keep the previous image URL if it exists
    setFormData({
      name: '',
      surname: '',
      email: '',
      phone: '',
      image: null,
      position: '',
      id: '',
    });
    setImageUrl(null); // Reset the image URL after save
  };

  return (
    <>
      <h1 style={{ marginBottom: "20px" }}>Please fill the form below to add new employee</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: '20px',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
          style={{
            padding: '10px',
            marginBottom: '10px',
            width: '300px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            display: 'block',
          }}
        />
        <input
          type="text"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
          placeholder="Surname"
          required
          style={{
            padding: '10px',
            marginBottom: '10px',
            width: '300px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            display: 'block',
          }}
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          style={{
            padding: '10px',
            marginBottom: '10px',
            width: '300px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            display: 'block',
          }}
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          required
          style={{
            padding: '10px',
            marginBottom: '10px',
            width: '300px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            display: 'block',
          }}
        />
        <input
          type="file"
          name="image"
          onChange={handleChange}
          accept="image/*"
          style={{
            padding: '10px',
            marginBottom: '10px',
            width: '300px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            display: 'block',
          }}
        />
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Employee"
            style={{
              marginBottom: '10px',
              width: '100px',
              height: '100px',
              objectFit: 'cover',
              borderRadius: '50%',
            }}
          />
        )}
        <input
          type="text"
          name="position"
          value={formData.position}
          onChange={handleChange}
          placeholder="Position"
          required
          style={{
            padding: '10px',
            marginBottom: '10px',
            width: '300px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            display: 'block',
          }}
        />
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleChange}
          placeholder="ID (Unique)"
          required
          style={{
            padding: '10px',
            marginBottom: '10px',
            width: '300px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            display: 'block',
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
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
    </>
  );
};

export default EmployeeForm;
