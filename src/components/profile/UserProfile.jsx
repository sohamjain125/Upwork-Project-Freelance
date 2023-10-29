import React from 'react';
import './UserProfile.module.css'; // Import your CSS styles

function UserProfile(props) {
  return (
    <div className="user-profile">
      <div className="user-info">
        <h2>{props.name}</h2>
        <p>Email: {props.email}</p>
        <p>Phone Number: {props.phone}</p>
        <p>Address: {props.address}</p>
        <p>Tax Number: {props.taxNumber}</p>
        <p>Client Code: {props.clientCode}</p>
      </div>
    </div>
  );
}

export default UserProfile;
