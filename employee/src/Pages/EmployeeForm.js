import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom
import './EmployeeForm.css'; // Import the custom CSS file

const EmployeeForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const history = useHistory(); // Initialize useHistory

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/employees', { name, description });
      setName('');
      setDescription('');
      setError('');
      // Redirect to EmployeeList component
      history.push('/list');
    } catch (error) {
      console.error('Error adding employee:', error);
      setError('An error occurred. Please try again.'); // Set error message
    }
  };

  return (
    <div className="form-container mt-4">
      <h2>Add Employee</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name:</Form.Label>
          <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description:</Form.Label>
          <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Group>
        <Button className='btn-submit me-4' variant="primary" type="submit">Add Employee</Button>
        <Button className='btn-submit' variant="secondary" onClick={() => history.push('/list')}>Go to Employee List</Button> {/* Button to navigate to EmployeeList */}
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>} {/* Display error message if present */}
      </Form>
    </div>
  );
};

export default EmployeeForm;
