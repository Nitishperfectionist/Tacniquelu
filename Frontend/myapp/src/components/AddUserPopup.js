// AddUserPopup.js
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const AddUserPopup = ({ handleAdd, setshowPopup }) => {
  const [addData, setAddData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    department: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddData({ ...addData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation logic here
    handleAdd(addData);
    setshowPopup(false);
    toast.success('Data Added Successfully!');
  };

  return (
    <>
      <div className="backdrop"></div>
      <div className="store-add-div">
        <form onSubmit={handleSubmit}>
          <h2>Add User</h2>
          <input
            type="number"
            name="id"
            placeholder="Enter Id"
            value={addData.id}
            onChange={handleChange}
          />

          <input
            type="text"
            name="firstName"
            placeholder="Enter firstName"
            value={addData.firstName}
            onChange={handleChange}
          />

          <input
            type="text"
            name="lastName"
            placeholder="Enter lastName"
            value={addData.lastName}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={addData.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="department"
            placeholder="Enter department"
            value={addData.department}
            onChange={handleChange}
          />

          <button type="submit">Add</button>
          <button onClick={() => setshowPopup(false)}>Cancel</button>
        </form>
      </div>
    </>
  );
};

export default AddUserPopup;
