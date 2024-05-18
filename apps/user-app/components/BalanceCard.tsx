"use client";
import prisma from "@repo/db/client";
import { Card } from "@repo/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";

export const BalanceCard = ({userId}: {
    userId: number;
}) => {
    const [balance, updateBalance] = useState(0);
    useEffect(()=>{
        async function getBalance() {
            try {
                const res = await axios.get(`/api/balance/?userId=${userId}`);
                const newBal = res.data.balance;
                updateBalance(newBal);
            }catch(e){
                console.log(e);
            }
        }
        getBalance();
    }, [])
    console.log("here", balance);
    const showBalance =balance === undefined ? 0 : balance;
    
    return <Card title={"Balance"}>
        <div className="flex justify-between border-b border-slate-300 py-2">
            <div>
                Total Balance
            </div>
            <div>
                {( showBalance) / 100} INR
            </div>
        </div>
    </Card>
}