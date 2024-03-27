import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ViewTestCaseModal = ({ isVisible, testCase, onClose }) => {
    return (
        <Modal show={isVisible} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>View Test Case</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <label>Input:</label>
                    <textarea readOnly className="form-control" value={testCase.input} rows="4" />
                </div>
                <div className="mt-3">
                    <label>Output:</label>
                    <textarea readOnly className="form-control" value={testCase.output} rows="4" />
                </div>
                <div className="mt-3">
                    <label>Time taken for the test case</label>
                    <textarea readOnly className="form-control" value={testCase.timeTaken} rows="1" />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ViewTestCaseModal;
