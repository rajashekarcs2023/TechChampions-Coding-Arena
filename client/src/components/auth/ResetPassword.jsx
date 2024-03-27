import React, { useState } from 'react';
import { Card, Form, Button, Image, Alert } from 'react-bootstrap';
import image from '../../images/signIn.svg';
import { useParams } from 'react-router-dom';
import { useResetPasswordFormState } from './authState';
import { resetPassword } from '../../services/api'; 

const ResetPassword = () => {

    const { token } = useParams();
    const [message, setMessage] = useState('');
    const { resetPasswordFormState, setResetPasswordFormState, handleInputChange } = useResetPasswordFormState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.values(resetPasswordFormState.errorMessage).every((error) => error === '')) {
            try {
                const result = await resetPassword(resetPasswordFormState.password, token);

                setResetPasswordFormState({
                    password: "",
                    confirmPassword: "",
                    errorMessage: {
                        password: "",
                        confirmPassword: "",
                    },
                });
                if (result.status === 200) {
                    setMessage(result.data.msg);
                } else if (result.status === 202) {
                    setMessage(result.data.msg);
                } else if (result.status === 201) {
                    setMessage(result.data.msg);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className='mt-3 d-flex justify-content-center '>
            <Card className='p-3 w-25'>
                <Image src={image} rounded style={{ display: 'block', margin: '0 auto', width: 80, height: 80, borderRadius: '50%', padding: '10px' }} />
                {message && (
                    <Alert className='text-center' variant="info">
                        {message}
                    </Alert>
                )}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-3' controlId='formGroupPassword'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type='password' placeholder='New Password' name='password'
                            value={resetPasswordFormState.password} onChange={handleInputChange}
                            isInvalid={!!resetPasswordFormState.errorMessage.password} />
                        {resetPasswordFormState.errorMessage.password &&
                            <Form.Control.Feedback type='invalid'>
                                {resetPasswordFormState.errorMessage.password}
                            </Form.Control.Feedback>
                        }
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formGroupConfirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control required type='password' placeholder='Confirm Password' name='confirmPassword'
                            value={resetPasswordFormState.confirmPassword} onChange={handleInputChange}
                            isInvalid={!!resetPasswordFormState.errorMessage.confirmPassword} />
                        {resetPasswordFormState.errorMessage.confirmPassword &&
                            <Form.Control.Feedback type='invalid'>
                                {resetPasswordFormState.errorMessage.confirmPassword}
                            </Form.Control.Feedback>
                        }
                    </Form.Group>
                    <Button className='w-100' variant='outline-dark' type='submit'>Submit</Button>
                    <Form.Text className='mt-2  d-flex justify-content-center'>
                        <a className='fw-bold text-dark text-decoration-none' href='/user/signIn'>Sign in here</a>
                    </Form.Text>
                </Form>
            </Card>
        </div>
    )
}

export default ResetPassword;