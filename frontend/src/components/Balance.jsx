import { useEffect,useState } from "react"
import axios from "axios";
import { resolvePath } from "react-router-dom";

export const Balance = ({ value }) => {

    const [balance, setBalance] = useState(5);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    const fetchBalance = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/account//balance', {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            console.log(response)
            const data = response.data;
            setBalance(data.balance.toFixed(2));
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    fetchBalance();
}, []);

if (loading) {
    return <div>Loading...</div>;
}

if (error) {
    return <div>Error: {error}</div>;
}

console.log("Balance is", balance)
    return <div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {balance}
        </div>
    </div>
}