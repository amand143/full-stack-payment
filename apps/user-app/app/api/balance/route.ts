import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

export const GET = async (req: NextRequest) => {
   const userId = req.nextUrl.searchParams.get('userId');
    if(userId){
        const res = await prisma.balance.findUnique({
            where: {
                userId: Number(userId)
            }
        })

        return NextResponse.json({
            balance: res?.amount
        })
    }
    return NextResponse.json({
        balance: 100
    })
}