"use server";
import bcrypt from "bcryptjs";
import db from "@repo/db/client";
import { redirect } from "next/navigation";

export async function createUser(name: string, number: string, password:string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await db.user.findFirst({
        where: {
            number: number
        }
    });


    if (existingUser) {
        console.log("user exists", number)
        return false;
    }
    try {
        const user = await db.user.create({
            data: {
                number: number,
                name: name,
                password: hashedPassword
            }
        });
    return true;
    } catch(e) {
        console.error(e);
        return false;
    }
    return true;
} 