"use server";

import { auth } from "@/src/lib/auth/authConfig";
import { pool } from "@/src/lib/postgres";

export const setPhone = async (phone: string) => {
    const session = await auth();
    if (!session) {
        throw new Error("Unauthorized");
    }

    const uuid: string = session.user.id;

    phone = phone.trim();

    await pool.query("UPDATE users SET phone = $1 WHERE id = $2", [phone, uuid]);

    return true;
};
