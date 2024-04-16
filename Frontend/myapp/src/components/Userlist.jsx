
// Userlist.js
import React, { useEffect, useState } from 'react';
import '../styles.css';
import toast from 'react-hot-toast';
import { getUsers } from '../config/api';
import UserRow from './UserRow';
import Pagination from './Pagination';
import AddUserPopup from './AddUserPopup';

const Userlist = () => {
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [page, setPage] = useState(1);
  const [showPopup, setshowPopup] = useState(false);

  // Fetch request
  const getRequest = async () => {
    try {
      const response = await fetch(getUsers());
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRequest();
  }, []);

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  // Update function
  const handleUpdate = async (index, updatedData) => {
    try {
      // Your fetch update logic here
      setData(updatedData);
      setEditIndex(null);
      toast.success('Data Updated Successfully!');
    } catch (error) {
      console.log(error);
      setEditIndex(null);
      toast.error('Something went wrong!');
    }
  };

  // Add function
  const handleAdd = async (addData) => {
    try {
      // Your fetch add logic here
      setData([...data, addData]); // Add new data to existing data
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong!');
    }
  };

  // Delete function
  const handleDelete = async (index) => {
    try {
      // Your fetch delete logic here
      const newData = [...data];
      newData.splice(index, 1);
      setData(newData);
      toast.success('Data deleted successfully!');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="main-div">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Email</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data
              ?.slice((page - 1) * 10, (page - 1) * 10 + 10)
              .map(function (ele, index) {
                return (
                  <UserRow
                    key={index}
                    user={ele}
                    index={index}
                    editIndex={editIndex}
                    handleEdit={handleEdit}
                    handleUpdate={(updatedData) => handleUpdate(index, updatedData)}
                    handleDelete={() => handleDelete(index)}
                  />
                );
              })}
          </tbody>
        </table>

        <Pagination page={page} setPage={setPage} />

        <div>
          <button onClick={() => setshowPopup(true)}>Add User</button>
        </div>
      </div>

      {showPopup && (
        <AddUserPopup handleAdd={handleAdd} setshowPopup={setshowPopup} />
      )}
    </>
  );
};

export default Userlist;

