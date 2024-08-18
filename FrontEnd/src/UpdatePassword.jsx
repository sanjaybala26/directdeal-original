import React, { useState } from 'react';
import axios from 'axios';
import './UpdatePassword.css'; // Import your CSS file for styling

const UpdatePassword = () => {
    const [username, setUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:8080/api/user/update-password', null, {
                params: {
                    username,
                    oldPassword,
                    newPassword
                }
            });
            setMessage(response.data);
        } catch (error) {
            setMessage('An error occurred while updating the password');
        }
    };

    return (
        <div className="update-password-container">
            <h2>𝚄𝚙𝚍𝚊𝚝𝚎 𝙿𝚊𝚜𝚜𝚠𝚘𝚛𝚍</h2>
            <form className="update-password-form" onSubmit={handleUpdatePassword}>
                <div className="form-group">
                    <label>𝚄𝚜𝚎𝚛𝚗𝚊𝚖𝚎:</label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                </div>
                <div className="form-group">
                    <label>𝙾𝚕𝚍 𝙿𝚊𝚜𝚜𝚠𝚘𝚛𝚍:</label>
                    <input 
                        type="password" 
                        value={oldPassword} 
                        onChange={(e) => setOldPassword(e.target.value)} 
                    />
                </div>
                <div className="form-group">
                    <label>𝙽𝚎𝚠 𝙿𝚊𝚜𝚜𝚠𝚘𝚛𝚍:</label>
                    <input 
                        type="password" 
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)} 
                    />
                </div>
                <button className="update-password-button" type="submit">Update Password</button>
            </form>
            {message && <p className="update-password-message">{message}</p>}
        </div>
    );
};

export default UpdatePassword;
