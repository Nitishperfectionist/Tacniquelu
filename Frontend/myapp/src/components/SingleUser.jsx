// SingleUserCard.jsx

import { useState } from "react";
import { Modal } from "./Modal";
import Labels from "./Labels";

const SingleUserCard = ({ id, name, firstName = name.split(" ")[0], lastName = name.split(" ")[1], company, email, handleDelete, handleEdit }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ firstName, lastName, email, company });

    const openModal = () => setIsModalOpen(true);

    const closeModal = () => setIsModalOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const updateTask = (e) => {
        e.preventDefault()

        handleEdit(id, formData)
        closeModal()
    }

    const handleOpenModal = () => {
        openModal()
    }

    return (
        <>
            <div className="user-card">
                <p> Id :{id}</p>
                <p> First Name :{firstName}</p>
                <p> LastName :{!lastName ? "NA" : lastName}</p>
                <p> Email :{email}</p>
                <p> Department : {company.name}</p>
                <div className="button-group">
                    <button onClick={handleOpenModal} className="button">Edit</button>
                    <button onClick={() => handleDelete(id)} className="button delete">Delete</button>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className="modal-content">
                    <h2 className="text-center">Edit</h2>
                    <form onSubmit={updateTask}>
                        <div>
                            <Labels text="Edit firstName" />
                            <input rows="4" name="firstName" value={formData.firstName} onChange={handleChange} required />
                        </div>
                        <div>
                            <Labels text="Edit lastName" />
                            <input rows="4" name="lastName" value={formData.lastName} onChange={handleChange} required />
                        </div>
                        <div>
                            <Labels text="Edit Email" />
                            <input rows="4" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div>
                            <Labels text="Edit Department" />
                            <input rows="4" name="name" value={formData.company?.name} onChange={(e) => setFormData({ ...formData, company: { ...formData.company, name: e.target.value } })} required />
                        </div>
                        <input type="Submit" value="Submit" className="button" />
                    </form>
                </div>
            </Modal>
        </>
    );
};

export { SingleUserCard };
