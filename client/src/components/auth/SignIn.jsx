import React, { useState } from 'react';
import { Card, Form, Button, Image, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import image from '../../images/signIn.svg';
import { useAuth } from '../../context/AuthContext';
import { getUser } from '../../services/api';

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState();

    const navigate = useNavigate();

    const { login } = useAuth();

    const inputValidation = () => {
        const errors = {};
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            errors.email = 'Invalid email address';
        }
        if (password.trim().length !== password.length) {
            errors.password = 'Password Should not contain whitespace';
        }
        setErrors(errors); 
        return Object.keys(errors).length === 0;
    }

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (inputValidation()) {
            const result = await getUser({ email, password }); 
            if (result.status === 201) {
                setMessage(result.data.message);
            } else if (result.status === 202) {
                setMessage(result.data.message);
            } else if (result.status === 200) {
                setMessage(result.data.message);
                login(result.data.token, result.data.userId);

                setPassword('');
                setEmail('');
                try {
                    navigate('/problems/list');
                } catch (err) {
                    console.log(err);
                }
            }
        }
    }

    const handleInputFocus = () => setMessage('');

    return (
        <div className='mt-3 d-flex justify-content-center '>
            <Card className='p-3 w-25'>
                <Image src={image} rounded style={{ display: 'block', margin: '0 auto', width: 80, height: 80, borderRadius: '50%', padding: '10px' }} />
                {message && (
                    <Alert className='text-center' variant='danger'>
                        {message}
                    </Alert>
                )}
                <Form onSubmit={handleSubmit} onFocus={handleInputFocus}>
                    <Form.Group className='mb-3' controlId='formGroupEmail' placeholder='Email address'>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control required type='email' placeholder='Enter email'
                            value={email} onChange={(e) => setEmail(e.target.value)} isInvalid={!!errors.email} />
                        {errors.email &&
                            <Form.Control.Feedback type='invalid'>
                                {errors.email}
                            </Form.Control.Feedback>
                        }
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formGroupPassword'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type='password' placeholder='Password'
                            value={password} onChange={(e) => setPassword(e.target.value)} isInvalid={!!errors.password} />
                        {errors.password &&
                            <Form.Control.Feedback type='invalid'>
                                {errors.password}
                            </Form.Control.Feedback>
                        }
                    </Form.Group>
                    <Button className='w-100' variant='outline-dark' type='submit'>Submit</Button>
                    <Form.Text className=' d-flex justify-content-center mt-2'>
                        <span className=''> Don't have an account?</span> &nbsp;
                        <a className='fw-bold text-dark text-decoration-none' href='/user/signUp'>Sign up</a>
                    </Form.Text>
                    <Form.Text className=' d-flex justify-content-center mt-2'>
                        <span className=''>Forgot Password? </span> &nbsp;
                        <a className='fw-bold text-dark text-decoration-none' href='/user/forgotPassword'>Reset</a>
                    </Form.Text>
                </Form>
            </Card>
        </div >
    )
}

export default SignIn;