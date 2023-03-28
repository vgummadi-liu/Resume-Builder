import React, {useState,useContext} from "react";
import {Alert,Button,TextField} from "@mui/material";
import {Link,useNavigate} from "react-router-dom";
import {Context as UserContext} from "../context/UserContext";
import apis from '../api';

const Login = () =>{
    const userContext = useContext(UserContext);
    let navigate = useNavigate();
    const [form, setForm ] = useState({

        username : '',
        password : ''

    });

    const [error, setError] = useState({
        state: false,
        message: ''
    });

    const formSubmit = async (e) =>{
        e.preventDefault();
        const user = await apis.checkUser(form);

        if(user.data.success === true) {
            await userContext.setIsAuthenticated(true);
            await userContext.setUser({
                id:user.data.id,
                name:user.data.name,
            })
            navigate('/')
        }
        else{
            setError(prev => ({ ...prev, message : user.data.message , state: true}))
            setForm({username: '',password:''})
        }

    }
    const handleInputChange = (e) => {
        const {name,value} = e.target;
        setForm(prev => ({...prev , [name]: value}))
    }
    return(
        <div>
            {error.state ? <Alert severity="error">{error.message}</Alert>: null }
            <form onSubmit={formSubmit}>
            <TextField
                    id="filled-basic"
                    label="username"
                    name="username"
                    variant="filled"
                    required
                    value={form.username}
                    onChange={handleInputChange}
                    sx={{ backgroundColor: 'white', color: 'black' }}
                />
                <TextField
                    id="filled-basic"
                    label="password"
                    variant="filled"
                    name="password"
                    required
                    value={form.password}
                    onChange={handleInputChange}
                    sx={{ backgroundColor: 'white', color: 'black' }}
                />
                <Button type="submit" variant="contained">
                    Login
                </Button>
                <Button variant="contained" component={Link} to="/signup">
                    Signup
                </Button>
            </form>
        </div>
    );
};

export default Login;