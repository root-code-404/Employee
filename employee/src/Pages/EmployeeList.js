import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ListGroup, Alert, Button, Modal, Form } from 'react-bootstrap';
import './EmployeeList.css'; // Import the custom CSS file

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/employees')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
        setError('An error occurred while fetching employees.'); // Set error message
      });
  }, []);

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setEditedName(employee.name);
    setEditedDescription(employee.description);
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/employees/${selectedEmployee._id}`, {
        name: editedName,
        description: editedDescription
      });
      // Update the employee in the local state
      const updatedEmployees = employees.map(emp =>
        emp._id === selectedEmployee._id ? { ...emp, name: editedName, description: editedDescription } : emp
      );
      setEmployees(updatedEmployees);
      // Close the modal
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating employee:', error);
      setError('An error occurred while updating the employee.'); // Set error message
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      setEmployees(prevEmployees => prevEmployees.filter(employee => employee._id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
      setError('An error occurred while deleting the employee.'); // Set error message
    }
  };

  return (
    <div className="employee-list-container">
      <h2>Employee List</h2>
      {error && <Alert variant="danger">{error}</Alert>} {/* Display error message if present */}
      <ListGroup>
        <ListGroup.Item variant="info">
          <div className="employee-details">
            <span className="employee-name">Name</span>
            <span className="employee-description">Description</span>
            <span className="employee-actions">Actions</span>
          </div>
        </ListGroup.Item>
        {employees.map(employee => (
          <ListGroup.Item key={employee._id}>
            <div className="employee-details">
              <span className="employee-name">{employee.name}</span>
              <span className="employee-description">{employee.description}</span>
              <div className="employee-actions">
                <Button className='edit-btn' onClick={() => handleEdit(employee)}>Edit</Button>
                <Button className='delete-btn' onClick={() => handleDelete(employee._id)}>Delete</Button>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editName">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="editDescription">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                type="text"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className='delete-btn' variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
          <Button className='edit-btn' variant="primary" onClick={handleSaveEdit}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EmployeeList;
