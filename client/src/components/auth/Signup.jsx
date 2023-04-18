import { useState } from 'react'
import Container from '../Container'
import FormContainer from '../form/FormContainer'
import FormInput from '../form/FormInput'
import Submit from '../form/Submit'
import Title from '../form/Title'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});


    const navigate = useNavigate()



    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();

        const response = await fetch('http://localhost:7000/api/v1/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        if (Object.keys(errors).length === 0) {
            const data = await response.json();
            if (response.ok) {
                setName('')
                setEmail('')
                setPassword('')
                toast.success('Registeration successfull')
                navigate('/signin')
                console.log(data);
            }
        } else {
            setErrors(errors);
        }
    }


    const validateForm = () => {
        let errors = {};
        if (!name) {
            errors.name = 'Name is required!';
        }
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
                <form onSubmit={handleSubmit} className=' drop-shadow-lg rounded p-6 border-2 space-y-6 w-81'>
                    <Title>Sign up</Title>
                    <FormInput id="name" name='name' label='Name' value={name} placeholder='Name' onChange={(e) => setName(e.target.value)}  />
                    {errors.name && <span style={{ color: 'blue' }}>{errors.name}</span>}

                    <FormInput id="email" name="email" label='Email' value={email} placeholder='abi@gmail.com' onChange={(e) => setEmail(e.target.value)}  />
                    {errors.email && <span style={{ color: 'blue' }}>{errors.email}</span>}

                    <FormInput id="password" type='password' name="password" label='Password' value={password} placeholder='********' onChange={(e) => setPassword(e.target.value)}  />
                    {errors.password && <span style={{ color: 'blue' }}>{errors.password}</span>}
                    
                    <Submit value='Sign up' />
                    <p>Alrady have an account please <span style={{ color: 'blue' }}><Link to='/signin' className='link'>Sign in</Link> </span></p>
                </form>
            </Container>
        </FormContainer>

    )
}