import React from 'react';

function Card({ firstName, lastName, profilePic, onClick }) {
  return (
    <div className="card" onClick={onClick}> 
      <img className="profile-pic" src={profilePic} alt="Profile Picture" />
      <p className="card-text">{firstName + ' '+ lastName}</p>
    </div>
  );
}

export default Card;