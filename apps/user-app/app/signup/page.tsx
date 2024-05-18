
import {  redirect, useRouter } from "next/navigation";
import { SignUpCard } from "../../components/SignUpCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";

export default async function () {
    const session = await getServerSession(authOptions);

    if(session?.user)redirect('/transfer')
    console.log("here3", session)
    return  <div>
        <SignUpCard />
    </div>
}