import { Card } from "@repo/ui/card"

export const RecentTransactions = ({
    transactions
}: {
    transactions: {
        timestamp:Date,
        amount: number,
        from:string | null,
        to?: string | null
    }[] | undefined
}) => {
    if (!transactions || !transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return( 
        
        <div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 light:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 light:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Sender
                </th>
                <th scope="col" className="px-6 py-3">
                    Receiver
                </th>
                <th scope="col" className="px-6 py-3">
                    Date
                </th>
                <th scope="col" className="px-6 py-3">
                    Amount
                </th>
            </tr>
        </thead>
        <tbody>
            {transactions.map(t => 
    
            <tr className="bg-white light:bg-gray-800">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                {t.from} 
                </th>
                <td className="px-6 py-4">
                {t.to}
                </td>
                <td className="px-6 py-4">
                {t.timestamp.toDateString()}
                </td>
                <td className="px-6 py-4">
                Rs {t.amount / 100}
                </td>
            </tr>
   )}
                 </tbody>
    </table>
</div>
);
    
}