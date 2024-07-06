import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firestore";
// db pointing to the name of the firestore database that we used in the firestore.js file
// addDoc: adding function
// collection: used to locate the table in the database

// pass the usestate and the set functions to the Add page so that they can be used here
const Add = ({ employees, setEmployees, setIsAdding, getEmployees }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [salary, setSalary] = useState('');
  const [date, setDate] = useState('');

  // Add new employee
  const handleAdd = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !salary || !date) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const newEmployee = {
      firstName,
      lastName,
      email,
      salary,
      date,
    };

    // employees is an local array with the elements recently fetched from the firestore
    // , once the new employee is added, the new employee is pushed into the array
    // employees.push(newEmployee);  // but we dont need to do this locally
    // Can just fetch the latest from firestore
    

    // Then we update the database with the new employee array
    // In the Dashboard(Table.js view), the employee state variable will fetch the latest values from the updated firestore database
    
    // TODO: Add doc to DB
    // addDoc: Document adder function; Need to specify where to add the document and what to add
    // collection: used to locate the table in the database
    // record added is newEmployee
    try {
      const docRef = await addDoc(collection(db, "employees"), {   // docRef is the added record with auto-generated id
        ...newEmployee   // ... means the values of the newEmployee object fits and can directly use the existing properties
      });
      console.log("Document written with ID: ", docRef.id);

      // Display successful message
      Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: `${firstName} ${lastName}'s data has been Added.`,
        showConfirmButton: false,
        timer: 1500,
      });

      // Update local state
      //Inappropriate: setEmployees(employees); // this cannot work as the newEmployee doesnt contain the id property, the property is auto-generated at the firestore
      //Alternative 1: setEmployees([...employees, { id: docRef.id, ...newEmployee}])
      //Alternative 2:
      getEmployees();  // fetch the latest data from the firestore database & update the local states
      setIsAdding(false);  // return to the main page
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to add employee data. Please try again later.',
        showConfirmButton: true,
      });
    }    
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Employee</h1>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {/* e is any change: Once the change is detected, the value of the change(text)
            is reflected on the input field as the state value.
        */}
        <label htmlFor="salary">Salary ($)</label>
        <input
          id="salary"
          type="number"
          name="salary"
          value={salary}
          onChange={e => setSalary(e.target.value)}
        />
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
