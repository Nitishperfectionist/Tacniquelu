// UserRow.js
import React, { useState } from 'react';

const UserRow = ({ user, index, editIndex, handleEdit, handleUpdate, handleDelete }) => {
  const [name, setName] = useState(user.name.split(' ')[0]);
  const [lastName, setLastName] = useState(user.name.split(' ')[1]);
  const [email, setEmail] = useState(user.email);
  const [department, setDepartment] = useState(user.company.name);

  return (
    <tr>
      <td>{user.id}</td>
      <td>
        {editIndex === index ? (
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            defaultValue={name}
          />
        ) : (
          name
        )}
      </td>
      <td>
        {editIndex === index ? (
          <input
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            defaultValue={lastName}
          />
        ) : (
          lastName
        )}
      </td>
      <td>
        {editIndex === index ? (
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            defaultValue={email}
          />
        ) : (
          email
        )}
      </td>
      <td>
        {editIndex === index ? (
          <input
            onChange={(e) => setDepartment(e.target.value)}
            type="text"
            defaultValue={department}
          />
        ) : (
          department
        )}
      </td>
      <td className="actions-btn">
        {editIndex === index ? (
          <button onClick={() => handleUpdate(index)}>Update</button>
        ) : (
          <button onClick={() => handleEdit(index)}>Edit</button>
        )}
        <button onClick={() => handleDelete(index)}>Delete</button>
      </td>
    </tr>
  );
};

export default UserRow;
