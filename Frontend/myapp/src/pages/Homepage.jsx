import { useEffect, useState, useRef } from "react";
import { SingleUserCard } from "../components/SingleUser";
import { Modal } from "../components/Modal";
import { deleteUserDetails, getUsersDetails, patchUsersData, postNewUserDetails } from "../Actions/action";
import Button from "../components/Button";
import Labels from "../components/Labels";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const initialStateTask = { name: '', email: '', department: '' };

const Homepage = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [formData, setFormData] = useState(initialStateTask);
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState({ start: 0, end: 8 });
    const [page, setPage] = useState(1);
    const addModalRef = useRef(null);
    const editModalRef = useRef(null);

    useEffect(() => {
        if (isAddModalOpen) {
            document.body.classList.add('modal-open');
            document.addEventListener('mousedown', handleAddModalClickOutside);
        } else {
            document.body.classList.remove('modal-open');
            document.removeEventListener('mousedown', handleAddModalClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleAddModalClickOutside);
        };
    }, [isAddModalOpen]);

    useEffect(() => {
        if (isEditModalOpen) {
            document.body.classList.add('modal-open');
            document.addEventListener('mousedown', handleEditModalClickOutside);
        } else {
            document.body.classList.remove('modal-open');
            document.removeEventListener('mousedown', handleEditModalClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleEditModalClickOutside);
        };
    }, [isEditModalOpen]);

    const handleAddModalClickOutside = (event) => {
        if (addModalRef.current && !addModalRef.current.contains(event.target)) {
            closeAddModal();
        }
    };

    const handleEditModalClickOutside = (event) => {
        if (editModalRef.current && !editModalRef.current.contains(event.target)) {
            closeEditModal();
        }
    };

    const openAddModal = () => setIsAddModalOpen(true);
    const closeAddModal = () => setIsAddModalOpen(false);

    const openEditModal = () => setIsEditModalOpen(true);
    const closeEditModal = () => setIsEditModalOpen(false);

    const submitNewTodo = (e) => {
        e.preventDefault();
        if (!validateEmail(formData.email)) {
            toast.error("Invalid email address");
            return;
        }
        const newUser = {
            id: Math.floor(Math.random() * 1000),
            name: formData.name,
            email: formData.email,
            company: {
                name: formData.department
            }
        };
        const updatedUser = [...users, newUser];
        setUsers(updatedUser);
        postNewUserDetails(newUser);
        toast.success("New User has been Added");
        setFormData(initialStateTask);
        closeAddModal();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        getUsersDetails().then(res => setUsers(res));
    }, []);

    const handleEdit = (id, editedUser) => {
        const newUser = {
            id,
            name: editedUser.firstName + " " + editedUser.lastName,
            email: editedUser.email,
            company: editedUser.company
        };
        const updatedUsers = users.map((ele) => ele.id === id ? newUser : ele);
        setUsers(updatedUsers);
        patchUsersData(id, newUser);
        toast.success("User has been Updated Successfully");
        closeEditModal();
    };

    const handleDelete = (id) => {
        const updatedUsers = users.filter((ele) => ele.id !== id);
        setUsers(updatedUsers);
        deleteUserDetails(id);
        toast.success("User has been Deleted Successfully");
    };

    const handlePageIncre = () => {
        setPage(page + 1);
        setPagination({ start: pagination.start + 8, end: pagination.end + 8 });
    };

    const handlePageDecre = () => {
        setPage(page - 1);
        setPagination({ start: pagination.start - 8, end: pagination.end - 8 });
    };

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    return (
        <div className="container">
            <h1 className="header">User Management Dashboard</h1>
            <div className="actions">
                <Button onClick={openAddModal} text="Add new user" />
            </div>
            <div className="grid-container">
                {users?.length > 0 &&
                    users?.map((item, i) => {
                        return i >= pagination.start && i < pagination.end && <SingleUserCard
                            key={item.id}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                            {...item}
                        />
                    })
                }
            </div>
            <div className="pagination">
                <Button onClick={handlePageDecre} disabled={page === 1} text="Prev" />
                <span className="page-number">{page}</span>
                <Button onClick={handlePageIncre} disabled={users.length <= page * 8} text="Next" />
            </div>

            <Modal isOpen={isAddModalOpen} onClose={closeAddModal}>
                <div className="modal-container" ref={addModalRef}>
                    <div className="modal-content">
                        <h2 className="text-center">New User</h2>
                        <form onSubmit={submitNewTodo}>
                            <div>
                                <Labels text="Enter firstName and LastName" />
                                <input rows="4" name="name" value={formData.name} onChange={handleChange} placeholder="Leave a name here..." required />
                            </div>
                            <div>
                                <Labels text="Enter Email" />
                                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Leave an email here..." required />
                            </div>
                            <div>
                                <Labels text="Enter Department" />
                                <input rows="4" name="department" value={formData.department} onChange={handleChange} placeholder="Leave a department here..." required />
                            </div>
                            <input type="submit" value="Submit" className="button" />
                        </form>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
            </Modal>
        </div>
    );
};

export default Homepage;
