import React, { useState } from "react";

const Login = () => {
    const[users,setUsers]=useState([])
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const buttonOnClick = () => {
        const newUser = { firstName, lastName, username, password };
        setUsers([...users, newUser]);

        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

        const updatedUsers = [...storedUsers, newUser];
        localStorage.setItem("users", JSON.stringify(updatedUsers));
    };
    
    return (
        <div>
            <form>
                <label>Ad:</label>
                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <label>Soyad</label>
                <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <label>Kullanıcı Adı</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} />
                <label>Şifre</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={buttonOnClick}>Üye ol </button>
            </form>
        </div>
    );
};

export default Login;