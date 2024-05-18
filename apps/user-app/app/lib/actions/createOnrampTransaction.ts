"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";
import axios from "axios";

export async function createOnrampTransaction(provider: string, amount: number) {
    const session = await getServerSession(authOptions);
    if(!session?.user || !session.user?.id) {
        return {
            message : "unauthenticated request"
        } 
    }
    const token = (Math.random() * 1000).toString();
    await prisma.onRampTransaction.create({
        data: {
            provider,
            status: "Success",
            startTime: new Date(),
            token: token,
            userId: Number(session?.user?.id),
            amount: amount * 100
        }
    });
    const reqBody = {
        token: token,
        user_identifier: session.user.id,
        amount: amount * 100
    };
    const response = await axios.post('http://localhost:3003/hdfcWebhook', reqBody);
    return {
        message: response.data
    };
}