"use client";

import React, { useState } from "react";
import { updateUserInfo } from "@/src/lib/auth/updateServerAction"; // Adjust the import path as needed

const UpdateUserInfo: React.FC = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [dob, setDob] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const userInfo = {
            name,
            surname,
            dob,
            address,
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
        <div className="dashboard-card"> {/* Reuse the card holder styling */}
            <h2>Update User Information</h2>
            <form onSubmit={handleSubmit}>
                <div className="field-input-container">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="field-input"
                    />
                </div>
                <div className="field-input-container">
                    <input
                        type="text"
                        placeholder="Surname"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        className="field-input"
                    />
                </div>
                <div className="field-input-container">
                    <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="field-input"
                    />
                </div>
                <div className="field-input-container">
                    <input
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="field-input"
                    />
                </div>
                <div className="field-input-container">
                    <input
                        type="text"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="field-input"
                    />
                </div>
                <button type="submit" className="update-field-button">Update Information</button>
            </form>
        </div>
        </div>
    );
};

export default UpdateUserInfo;
