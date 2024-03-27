import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

const ProblemForm = ({ problemState, handleInputChange }) => {
    return (
        <div>
            <InputGroup className='mb-3' >
                <InputGroup.Text>Problem Title</InputGroup.Text>
                <Form.Control type='text' required name='title' value={problemState.title}
                    isInvalid={!!problemState.errors && !!problemState.errors.title}
                    onChange={handleInputChange} />
                {problemState.errors && problemState.errors.title &&
                    <Form.Control.Feedback type='invalid'>
                        {problemState.errors.title}
                    </Form.Control.Feedback>
                }
            </InputGroup>
            <InputGroup className='mb-3'>
                <InputGroup.Text>Problem Statement</InputGroup.Text>
                <Form.Control as='textarea' name='statement' rows={8} required
                    onChange={handleInputChange} value={problemState.statement}
                    isInvalid={!!problemState.errors && !!problemState.errors.statement}
                />
                {problemState.errors && problemState.errors.statement &&
                    <Form.Control.Feedback type='invalid'>
                        {problemState.errors.statement}
                    </Form.Control.Feedback>
                }
            </InputGroup >
            <InputGroup className='mb-3' >
                <InputGroup.Text>Problem Difficulty</InputGroup.Text>
                <Form.Select required name='difficulty' value={problemState.difficulty}
                    onChange={handleInputChange}>
                    <option> </option>
                    <option value='easy'>easy</option>
                    <option value='medium'>medium</option>
                    <option value='hard'>hard</option>
                </Form.Select>
            </InputGroup>
        </div>
    )
}

export default ProblemForm
