"use client";

import React, { useState } from "react";
import { updateUserInfo } from "@/src/lib/auth/updateServerAction"; 

const UpdateUserInfo: React.FC = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [dob, setDob] = useState("");
    const [addresse, setAddresse] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const userInfo = {
            name,
            surname,
            dob,
            addresse,
            phone,
        };

        try {
            await updateUserInfo(userInfo);
            alert("User information updated successfully!");
        } catch (error) {
            console.error("Failed to update user info:", error);
            alert("Error updating user information.");
        }
    };

    return (
        <div className="dashboard-page">
        <div className="dashboard-card">
            <h2>Update User Information</h2>
            <form onSubmit={handleSubmit}>
                <div className="field-input-container">
                    <input
                        type="text"
                        placeholder="Nom"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="field-input"
                    />
                </div>
                <div className="field-input-container">
                    <input
                        type="text"
                        placeholder="Prenom"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        className="field-input"
                    />
                </div>
                <div className="field-input-container">
                    <input
                        type="Date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="field-input"
                    />
                </div>
                <div className="field-input-container">
                    <input
                        type="text"
                        placeholder="Addresse"
                        value={addresse}
                        onChange={(e) => setAddresse(e.target.value)}
                        className="field-input"
                    />
                </div>
                <div className="field-input-container">
                    <input
                        type="text"
                        placeholder="Téléphone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="field-input"
                    />
                </div>
                <button type="submit" className="update-field-button">Modifier Vos Information</button>
            </form>
        </div>
        </div>
    );
};

export default UpdateUserInfo;
