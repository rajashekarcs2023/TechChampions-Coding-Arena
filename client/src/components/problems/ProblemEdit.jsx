import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Modal } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProblemState } from './ProblemState';
import { useTestCaseState } from './TestCaseState';
import ProblemForm from './ProblemForm';
import TestCaseList from './TestCaseList';
import AddTestCaseModal from './AddTestCaseModal';
import { getProblemToEdit, updateProblem } from '../../services/api'; 

const ProblemEdit = () => {
    const { problemId } = useParams();
    const { problemState, setProblemState, handleInputChange, deleteTestCase } = useProblemState();
    const { validateTestCase, setTestCaseModalState, testCaseModalState, handleShowTestCaseModal,
        handleTestCaseInputChange, handleCloseTestCaseModal } = useTestCaseState();
    const { token } = useAuth();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProblemDetails = async () => {
            try {
                const problemData = await getProblemToEdit(problemId, token);

                setProblemState({
                    ...problemState,
                    title: problemData.title,
                    statement: problemData.statement,
                    difficulty: problemData.difficulty,
                    testCases: problemData.testCases
                });

                console.log(problemData);
            } catch (error) {
                // console.error('Error fetching problem details: ', error);
                navigate('/error');
            }
        };

        fetchProblemDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [problemId, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(problemState.testCases);
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

                const result = await updateProblem(token, problemId, {
                    title: problemState.title,
                    statement: problemState.statement,
                    difficulty: problemState.difficulty,
                    testCases: problemState.testCases
                });

                if (result.status === 200) {
                    console.log('Problem edited!!');
                    setMessage(result.data.message);
                    setShow(true);
                    setTimeout(() => {
                        navigate('/problems/list');
                    }, 3000);
                }
            } catch (error) {
                // console.log(error);
                navigate('/error');
            }
        }
    }

    const handleSubmitTestCaseModal = (e) => {
        e.preventDefault();
        const testCaseErrors = validateTestCase();

        if (Object.keys(testCaseErrors).length === 0) {
            if (problemState.errors.testCase) {
                delete problemState.errors.testCase;
            }
            setProblemState({
                ...problemState,
                testCases: [...problemState.testCases, testCaseModalState.data]
            });

            console.log(problemState);
            setTestCaseModalState({
                show: false,
                data: { input: '', output: '' },
                errors: {},
            });
        } else {
            setTestCaseModalState({
                ...testCaseModalState,
                errors: testCaseErrors,
            });
        }
    };

    return (
        <div className='mt-2 d-flex flex-wrap justify-content-center '>
            <Card className='p-3 w-100'>
                <Form onSubmit={handleSubmit} >
                    <ProblemForm problemState={problemState} handleInputChange={handleInputChange} />
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
                </Form>
            </Card>
            <AddTestCaseModal show={testCaseModalState.show}
                handleClose={handleCloseTestCaseModal}
                handleSubmit={handleSubmitTestCaseModal}
                testCaseData={testCaseModalState.data}
                handleInputChange={handleTestCaseInputChange}
                testCaseError={testCaseModalState.errors}
            />
            <Modal backdrop='static'
                keyboard={false} show={show} onHide={handleClose} centered>
                <Modal.Header closeButton />
                <Modal.Body className='d-flex '>
                    <p>{message}</p>
                </Modal.Body>
            </Modal>
        </div >
    )
}

export default ProblemEdit;
