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
    const [errors, setErrors] = useState({});

    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        const response = await fetch('http://localhost:7000/api/v1/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        if (Object.keys(errors).length === 0) {
        const data = await response.json();
        if (response.ok) {
            toast.success('Login successfull')
            setEmail('');
            setPassword('');
            navigate('/home')
            console.log(data);
        }
        } else {
            setErrors(errors);
        }
    }

    const validateForm = () => {
        let errors = {};
        
        if (!email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid!';
        }
        if (!password) {
            errors.password = 'Password is required!';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters!';
        }
        return errors;
    };


    return (
        <FormContainer>
            <Container>
                <form onSubmit={handleSubmit} className="drop-shadow-lg rounded p-6 border-2 space-y-6 w-82">
                    <Title>Sign in</Title>
                    <FormInput id='email' label='Email' name='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)}  />
                    {errors.email && <span style={{ color: 'blue' }}>{errors.email}</span>}

                    <FormInput id='name' label='Password' name='password' type='password' placeholder='********' onChange={(e) => setPassword(e.target.value)}  />
                    {errors.password && <span style={{ color: 'blue' }}>{errors.password}</span>}

                    <Submit value='Sign in' />
                    <p>Don't have an account please <span style={{ color: 'blue' }}><Link to='/' className='link'>Sign up </Link> </span></p>
                </form>
            </Container>
        </FormContainer>
    )
}