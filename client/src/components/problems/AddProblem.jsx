import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import AddTestCaseModal from './AddTestCaseModal';
import TestCaseList from './TestCaseList';
import ProblemForm from './ProblemForm';
import { useProblemState } from './ProblemState';
import { useTestCaseState } from './TestCaseState';
import { createProblem } from '../../services/api';
import { useAuth } from "../../context/AuthContext";
import { Navigate } from 'react-router-dom';

const AddProblem = () => {

    const { problemState, setProblemState, handleInputChange, deleteTestCase, problemCleanData } = useProblemState();
    const { validateTestCase, setTestCaseModalState, testCaseModalState, handleShowTestCaseModal,
        handleTestCaseInputChange, handleCloseTestCaseModal } = useTestCaseState();
    const [message, setMessage] = useState('');
    const { token } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        if (problemState.testCases.length === 0) {
            setProblemState({
                ...problemState,
                errors: {
                    ...problemState.errors,
                    testCase: 'Please add at least one test case before submitting'
                }
            });
            return;
        }

        if (Object.values(problemState.errors).every((error) => error === '')) {
            try {
                problemState.title = problemCleanData(problemState.title);
                problemState.statement = problemCleanData(problemState.statement);
                const result = await createProblem(
                    {
                        title: problemState.title,
                        statement: problemState.statement,
                        difficulty: problemState.difficulty,
                        testCases: problemState.testCases
                    }, token);

                setProblemState({
                    title: '',
                    statement: '',
                    difficulty: '',
                    testCases: [],
                    errors: {}
                })

                setMessage(result.data.message);

            } catch (error) { 
                if (error) {
                    return <Navigate to="/error" />;
                }
            }
        }
    }

    const cleanData = (data) => {
        return data.replace(/ +(?=\.|\n|$)/g, "")
            .replace(/\n\s*/g, "\n")
            .trim();
    }

    const handleSubmitTestCaseModal = (e) => {
        e.preventDefault();
        const testCaseErrors = validateTestCase();

        if (Object.keys(testCaseErrors).length === 0) {
            if (problemState.errors.testCase) {
                delete problemState.errors.testCase;
            }

            testCaseModalState.data = {
                input: cleanData(testCaseModalState.data.input),
                output: cleanData(testCaseModalState.data.output),
                timeTaken: cleanData(testCaseModalState.data.timeTaken)
            }

            setProblemState({
                ...problemState,
                testCases: [...problemState.testCases, testCaseModalState.data]
            });

            setTestCaseModalState({
                show: false,
                data: { input: '', output: '', timeTaken: '' },
                errors: {},
            });
        } else {
            setTestCaseModalState({
                ...testCaseModalState,
                errors: testCaseErrors,
            });
        }
    };

    const handleInputFocus = () => {
        setMessage('');
    };

    return (
        <div className='mt-2 d-flex flex-wrap justify-content-center '>
            <Card className='p-3 w-100'>
                {message && (
                    <Alert className='text-center' variant="info">
                        {message}
                    </Alert>
                )}
                <Form onSubmit={handleSubmit} onFocus={handleInputFocus} >
                    <ProblemForm problemState={problemState} handleInputChange={handleInputChange}/>
                    <Button className='mb-3' variant='outline-dark' onClick={handleShowTestCaseModal}>
                        Add Test Case</Button>
                    {problemState.errors && problemState.errors.testCase && (
                        <div className="text-danger mb-3">
                            Please add at least one test case before submitting.
                        </div>
                    )}
                    <TestCaseList testCases={problemState.testCases}
                        deleteTestCase={deleteTestCase} />
                    <Button className='w-100' variant='outline-dark' type='submit'
                        disabled={Object.values(problemState.errors).some((error) => error !== '')}>
                        Submit</Button>
                </Form >
                <AddTestCaseModal show={testCaseModalState.show}
                    handleClose={handleCloseTestCaseModal}
                    handleSubmit={handleSubmitTestCaseModal}
                    testCaseData={testCaseModalState.data}
                    handleInputChange={handleTestCaseInputChange}
                    testCaseError={testCaseModalState.errors}
                />
            </Card >
        </div >
    )
}

export default AddProblem;