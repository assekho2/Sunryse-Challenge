import React from 'react';

function Modal({ user, closeModal }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span> 
        <img className="profile-pic" src={user.avatar} alt="Profile Picture" />
        <h2 className='modal-text'>{user.firstname} {user.lastname}</h2>
        <p className='modal-text'><strong>Role:</strong> {user.role}</p>
        <p className='modal-text'><strong>Join Date:</strong> {user.join_date}</p>
        <p className='modal-text'><strong>Description:</strong> {user.description}</p>
      </div>
    </div>
  );
}

export default Modal;