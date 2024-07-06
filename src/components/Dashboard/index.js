import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

// collection is the table; getDocs is the query for records in the table
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../config/firestore';

// import the employee data from the local storage
// import { employeesData } from '../../data';



const Dashboard = ({ setIsAuthenticated }) => {
  const [employees, setEmployees] = useState();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Update the local employees state with the latest data from the firestore database
  const getEmployees = async() => {
    // get the whole documents from the specified collection(table) in the firestore(database) & store it inside the querySnapshot
    // Note that the querySnapshot is only a metadata, thus not directly applicable
    const querySnapshot = await getDocs(collection(db, "employees"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data())
    })
    // console.log("Query Snapshot: ", querySnapshot.docs)
    // querySnapshot.docs is an array of documents applicable, the properties and values are available but needed to be called
    // In this case, map creates a new array based on the filtered data 
    // Also, we declare a new property called "id" and use the existing properties from ...doc.data & copy its values
    const employees = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));
    console.log("Employee Information: ", employees)
    setEmployees(employees);
  }

  useEffect(() => {
    // TODO: create getEmployees function and call it here
    getEmployees();
  }, []);

  const handleEdit = id => {
    const [employee] = employees.filter(employee => employee.id === id);

    setSelectedEmployee(employee);
    setIsEditing(true);
  };

  const handleDelete = id => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(result => {
      if (result.value) {
        const [employee] = employees.filter(employee => employee.id === id);

        // TODO delete document

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${employee.firstName} ${employee.lastName}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const employeesCopy = employees.filter(employee => employee.id !== id);
        setEmployees(employeesCopy);
      }
    });
  };

  return (
    <div className="container">
      {/* can be deemed as if(!isAdding && !isEditing) { defaultPage } */}
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Table
            employees={employees}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {/* can be deemed as if(isAdding) { addPage } */}
      {isAdding && (
        <Add
          employees={employees}
          setEmployees={setEmployees}
          setIsAdding={setIsAdding}
          getEmployees={getEmployees}
        />
      )}
      {/* can be deemed as if(isEditing) { editPage } */}
      {isEditing && (
        <Edit
          employees={employees}
          selectedEmployee={selectedEmployee}
          setEmployees={setEmployees}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default Dashboard;
