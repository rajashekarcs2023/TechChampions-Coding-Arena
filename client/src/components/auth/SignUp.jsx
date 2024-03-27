import React, { useState } from 'react'
import { Card, Form, Button, Image, Alert } from 'react-bootstrap';
import image from '../../images/signUp.svg';
import { useSignUpFormState } from './authState';
import { createUser } from '../../services/api';

const SignUp = () => {
    const { signUpFormState, setSignUpFormState, handleInputChange } = useSignUpFormState();
    const [message, setMessage] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.values(signUpFormState.errors).every((error) => error === '')) {
            setMessage("Loading....");
            const result = await createUser(
                { name: signUpFormState.name, email: signUpFormState.email, password: signUpFormState.password });

            setSignUpFormState({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                errors: {}
            });

            setMessage(result.data.message);
        }
    }

    const handleInputFocus = () => setMessage('');

    return (
        <div className='mt-1 d-flex justify-content-center '>
            <Card className='p-3 w-25'>
                <Image src={image} rounded style={{ display: 'block', margin: '0 auto', width: 75, height: 75, borderRadius: '50%', padding: '10px' }} />
                {message && (
                    <Alert className='text-center p-1' variant='info'>
                        {message}
                    </Alert>
                )}
                <Form onSubmit={handleSubmit} onFocus={handleInputFocus}>
                    <Form.Group className='mb-2' controlId='formGroupName'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control required type='text' placeholder='Enter Name' name='name'
                            value={signUpFormState.name} onChange={handleInputChange} isInvalid={!!signUpFormState.errors.name} />
                        {signUpFormState.errors.name &&
                            <Form.Control.Feedback type='invalid'>
                                {signUpFormState.errors.name}
                            </Form.Control.Feedback>
                        }
                    </Form.Group>
                    <Form.Group className='mb-2' controlId='formGroupEmail'>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control required type='email' placeholder='Enter email address' name='email' onChange={handleInputChange}
                            value={signUpFormState.email} isInvalid={!!signUpFormState.errors.email} />
                        {signUpFormState.errors.email &&
                            <Form.Control.Feedback type='invalid'>
                                {signUpFormState.errors.email}
                            </Form.Control.Feedback>
                        }
                    </Form.Group>
                    <Form.Group className='mb-2' controlId='formGroupPassword'>
                        <Form.Label>New Password</Form.Label>
                        <Form.Control required type='password' placeholder='New Password' name='password'
                            value={signUpFormState.password} onChange={handleInputChange} isInvalid={!!signUpFormState.errors.password} />
                        {signUpFormState.errors.password &&
                            <Form.Control.Feedback type='invalid'>
                                {signUpFormState.errors.password}
                            </Form.Control.Feedback>
                        }
                    </Form.Group>
                    <Form.Group className='mb-2' controlId='formGroupConfirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control required type='password' placeholder='Confirm Password' value={signUpFormState.confirmPassword}
                            name='confirmPassword' onChange={handleInputChange} isInvalid={!!signUpFormState.errors.confirmPassword} />
                        {signUpFormState.errors.confirmPassword &&
                            <Form.Control.Feedback type='invalid'>
                                {signUpFormState.errors.confirmPassword}
                            </Form.Control.Feedback>
                        }
                    </Form.Group>
                    <Button className='w-100' variant='outline-dark' type='submit'>Submit</Button>
                    <Form.Text className='d-flex justify-content-center mt-2'>
                        <span> Already have an account? </span> &nbsp;
                        <a className='fw-bold text-dark text-decoration-none' href='/user/signIn'>Sign In</a>
                    </Form.Text>
                </Form>
            </Card>
        </div >
    )
}

export default SignUp;