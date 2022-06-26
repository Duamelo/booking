import {useState} from 'react';
import { toast } from "react-toastify";
import { login } from "../actions/auth";
import LoginForm from "../components/LoginForm";
import { useDispatch } from "react-redux";


const Login = ({history}) => {
    const [email, setEmail] = useState("david.dosseh@imsp-uac.org");
    const [password , setPassword] = useState("");

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await login({email, password});
            console.log('SEND LOGIN DATA', { email, password });
            if (res.data) {
                console.log('SAVE USER RES IN REDUX AND LOCAL STORAGE THEN REDIRECT ===>');

                console.log(res.data);

                window.localStorage.setItem('auth', JSON.stringify(res.data));

                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: res.data,
                });
                history.push("/dashboard");
            }
        }catch (err) {
            console.log(err);
            if(err.response.status === 400) toast.error(err.response.data);
        }
    }
    return (
        <>
            <div className="container-fluid bg-secondary p-5 text-center">
                Login Page
            </div>

            <div className="container">
                <div className="row">
                   <div className="col-md-6 offset-md-3">
                        <LoginForm 
                            handleSubmit={handleSubmit}
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}    
                        />
                   </div> 
                </div>
            </div>
        </>
    )
}


export default Login;