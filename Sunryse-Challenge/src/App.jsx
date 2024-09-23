import React, { useState, useEffect } from 'react';
import Card from './Card.jsx';
import Modal from './Modal.jsx'; 

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Track the selected user
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal visibility

  useEffect(() => {
    // Fetch data from the API
    fetch('https://9e06da9a-97cf-4701-adfc-9b9a5713bbb9.mock.pstmn.io/users')
      .then(response => response.json())
      .then(data => {
        // Store the users data in the state
        setUsers(data.data.users);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty array means this effect runs once when the component mounts

  // Function to open modal and set selected user
  const handleCardClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      <div className="cards-container"> 
        {users.map(user => (
          <Card 
            key={user.id} 
            firstName={user.firstname} 
            lastName={user.lastname} 
            profilePic={user.avatar} 
            onClick={() => handleCardClick(user)} 
          />
        ))}
      </div>
      {isModalOpen && (
        <Modal 
          user={selectedUser} 
          closeModal={closeModal} // Pass function to close modal
        />
      )}
    </>
  );
}

export default App;