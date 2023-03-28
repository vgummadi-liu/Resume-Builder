import React, {useState} from 'react'
import {Alert, Button, TextField} from '@mui/material'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import apis from '../api'


const Signup = () => {
    let navigate = useNavigate()
    const [form, setForm] = useState({
        name:'',
        username:'',
        password:''
    })
    const [error, setError] = useState({
        state: false,
        message: ''
    })
    const formSubmit = async (e) => {
        e.preventDefault()
        const user = await apis.insertUser(form)
        if(user.data.success === true ) { navigate('/login') }
        else {
            setError(prev => ({ ...prev, message: user.data.message, state: true}))
            setForm({name:'',username:'',password:''})
        }
    }
    const handleInputChange =  async (e) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }) )
    }
    return (
        <div>
            {error.state ? <Alert severity="error">{error.message}</Alert>: null }
            <form onSubmit={formSubmit}>
                <TextField name="name" sx={{ backgroundColor: 'white', color: 'black' }} onChange={handleInputChange} value={form.name}  id="filled-basic" label="name" variant="filled" required/>
                <TextField name="username" sx={{ backgroundColor: 'white', color: 'black' }} onChange={handleInputChange} value={form.username}  id="filled-basic" label="username" variant="filled" required/>
                <TextField name="password" sx={{ backgroundColor: 'white', color: 'black' }} onChange={handleInputChange} value={form.password}  id="filled-basic" label="password" variant="filled" required/>
                <Button type="submit" variant="contained">Signup</Button>
                <Button variant="contained" component={Link} to="/login">Login</Button>
            </form>
        </div>
    )
}



export default Signup
