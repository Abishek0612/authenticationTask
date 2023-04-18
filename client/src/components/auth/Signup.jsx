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

    const navigate = useNavigate()



    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:7000/api/v1/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const data = await response.json();
        if (response.ok) {
            setName('')
            setEmail('')
            setPassword('')
            toast.success('Registeration successfull')
            navigate('/signin')
            console.log(data);
        } else {
            const data = await response.json();
            toast.error(data.message)
        }
    }
    return (
        <FormContainer>
            <Container>
                <form onSubmit={handleSubmit} className=' drop-shadow-lg rounded p-6 border-2 space-y-6 w-81'>
                    <Title>Sign up</Title>
                    <FormInput id="name" name='name' label='Name' value={name} placeholder='Name' onChange={(e) => setName(e.target.value)} required />
                    <FormInput id="email" name="email" label='Email' value={email} placeholder='abi@gmail.com' onChange={(e) => setEmail(e.target.value)} required />
                    <FormInput id="password" type='password' name="password" label='Password' value={password} placeholder='********' onChange={(e) => setPassword(e.target.value)} required />
                    <Submit value='Sign up' />
                    <p>Alrady have an account please <span style={{ color: 'blue' }}><Link to='/signin' className='link'>Signin</Link> </span></p>
                </form>
            </Container>
        </FormContainer>

    )
}