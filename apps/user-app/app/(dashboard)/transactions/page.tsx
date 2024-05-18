import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { RecentTransactions } from "../../../components/RecentTransactions";

async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.user.findUnique({
        where: {
            id: Number(session?.user?.id)
        },
        include: {
            sentTransfers: {
                include: {
                    toUser: true,
                    fromUser: true
                },
            },
            receivedTransfers: {
                include: {
                    toUser: true,
                    fromUser: true
                },
            },
        }
    });
    type userType= { id: number; email: string | null; name: string | null; number: string; password: string; }
    const transferList = txns?.sentTransfers.concat(txns?.receivedTransfers);
    return transferList?.map((t: { id: number, amount: number, fromUserId: number, toUserId: number, timestamp: Date, toUser: userType, fromUser: userType})=>({
        timestamp: t.timestamp,
        amount: t.amount,
        from: t.fromUser.name,
        to: t.toUser.name 
    }));
}


export default async function() {
    const tryout = await getOnRampTransactions()
    return (
    <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Transaction History
        </div>
        <div className="w-full mr-10 p-4">
      
        <div className="w-full pt-2 overflow-y-auto bg-gray-50 h-60">
         <RecentTransactions transactions={tryout} />
        </div>

    </div>
        
    </div>
    )
}