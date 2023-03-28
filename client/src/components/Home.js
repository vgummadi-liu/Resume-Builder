import React, {useContext, useState, useEffect} from 'react'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import { Context as UserContext } from '../context/UserContext'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

const Home = () =>{
    // const userContext = useContext(UserContext)
    // const [diff, setDiff] = useState(3);
    // const [done, setDone] = useState(true);

    // useEffect(() => {
	// 	userContext.setX(diff)
	// 	setDone(true)
	// }, [diff])
	// const handleChange = async (event) => {
	// 	event.preventDefault()
	// 	setDone(false)
	// 	await setDiff(parseInt(event.target.value))
	// }

    return (
        <div> 
            <p> This is Home Page</p>
        </div>
    )
}

export default Home;
