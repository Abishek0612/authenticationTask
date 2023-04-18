import React, { useState } from "react";
import FormContainer from "../form/FormContainer";
import Container from "../Container";
import Title from "../form/Title";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:7000/api/v1/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (response.ok) {
            toast.success('Login successfull')
            setEmail('');
            setPassword('');
            navigate('/home')
            console.log(data);
        } else {
            const data = await response.json();
            toast.error(data.message)
        }
    }


    return (
        <FormContainer>
            <Container>
                <form onSubmit={handleSubmit} className="drop-shadow-lg rounded p-6 border-2 space-y-6 w-82">
                    <Title>Sign in</Title>
                    <FormInput id='email' label='Email' name='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} required />
                    <FormInput id='name' label='Password' name='password' type='password' placeholder='********' onChange={(e) => setPassword(e.target.value)} required />
                    <Submit value='Sign in' />
                    <p>Don't have an account please <span style={{ color: 'blue' }}><Link to='/' className='link'>Sign up </Link> </span></p>
                </form>
            </Container>
        </FormContainer>
    )
}