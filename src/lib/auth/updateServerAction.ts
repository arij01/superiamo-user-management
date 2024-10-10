"use server";

import { auth } from "@/src/lib/auth/authConfig";
import { pool } from "@/src/lib/postgres";


export const updateUserInfo = async (userInfo: { 
  name: string; 
  surname: string; 
  dob: string; 
  addresse: string; 
  phone: string; 
}) => {
  
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const uuid: string = session.user.id;

  // UUID validation
  const uuidRegExp: RegExp =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
  if (!uuidRegExp.test(uuid)) {
    throw new Error("Invalid UUID");
  }

  // Sanitize inputs
  const { name, surname, dob, addresse, phone } = userInfo;
  
  const sanitizedData = {
    name: name.trim(),
    surname: surname.trim(),
    dob: dob.trim(),
    addresse: addresse.trim(),
    phone: phone.trim(),
  };

  // Input validation
  if (!sanitizedData.name || !sanitizedData.surname || !sanitizedData.dob || !sanitizedData.addresse || !sanitizedData.phone) {
    throw new Error("All fields must be filled");
  }

  // phone number validation for France
  const phoneRegExp: RegExp = /^(?:0[1-9]|\\+33[1-9])[0-9]{8}$/; 
  if (!phoneRegExp.test(sanitizedData.phone)) {
    throw new Error("Invalid phone number format");
  }

  // Update user iquery
  const query = `
    UPDATE users 
    SET name = $1, surname = $2, dob = $3, addresse = $4, phone = $5 
    WHERE id = $6
  `;
  
  const values = [
    sanitizedData.name,
    sanitizedData.surname,
    sanitizedData.dob,
    sanitizedData.addresse,
    sanitizedData.phone,
    uuid,
  ];

  try {
    await pool.query(query, values);
    return true;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to update user information");
  }
};
