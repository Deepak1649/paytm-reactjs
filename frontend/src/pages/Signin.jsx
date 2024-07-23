import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignIn = async () => {
        try {
            const response = await axios.post(import.meta.env.VITE_BACKEND_URL.concat('/api/v1/user/signin') , { username, password });
            localStorage.setItem('token', response.data.token); // Assuming your backend returns a token
            navigate('/dashboard'); // Redirect to the dashboard
        } catch (error) {
            setError("Invalid email or password");
        }
    };

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"} />
                    <SubHeading label={"Enter your credentials to access your account"} />
                    <InputBox 
                        placeholder="harkirat@gmail.com" 
                        label={"Email"} 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    <InputBox 
                        placeholder="123456" 
                        label={"Password"} 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    {error && <div className="text-red-500">{error}</div>}
                    <div className="pt-4">
                        <Button label={"Sign in"} onClick={handleSignIn} />
                    </div>
                    <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
                </div>
            </div>
        </div>
    );
};
