import React, { useState } from 'react';
import axios from 'axios';

function DeleteUser() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        try {
            const response = await axios.delete('http://localhost:8080/api/delete', {
                params: { username, password },
            });
            console.log('User deleted successfully:', response.data);
            setError(null); // Clear any previous errors
        } catch (err) {
            setError(err.response.data);
        }
    };

    return (
        <div>
            <h2>Delete User</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleDelete}>Delete Account</button>
            {error && (
                <div>
                    <h3>Error:</h3>
                    <pre>{JSON.stringify(error, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default DeleteUser;
