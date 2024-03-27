import React, { useState } from 'react';
import { Accordion, Dropdown, Button, Form, Spinner } from 'react-bootstrap';
import { submitProblem } from '../../services/api';
import { useAuth } from "../../context/AuthContext";
import { Navigate } from 'react-router-dom';

const CodeEditor = ({ problemId }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [textareaContent, setTextareaContent] = useState('');
  const { token, userId } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');
  const [displayDialog, setDisplayDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (selectedLanguage === '') {
      setErrorMessage('Please select a programming language before submitting.');
      return;
    }

    if (textareaContent.trim() === '') {
      setErrorMessage('Please enter code in the textarea before submitting.');
      return;
    }

    setErrorMessage('');
    setDisplayDialog(true);

    try {
      const currentDate = new Date();

      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };

      const formattedDateTime = currentDate.toLocaleString("en-US", options);

      const result = await submitProblem(
        {
          language: selectedLanguage,
          code: textareaContent,
          problemId,
          userId,
          submittedAt: formattedDateTime
        }, token);

      setLoading(false);
      setMessage(result.message);
    } catch (error) { 
      if (error) {
        return <Navigate to="/error" />;
      }
    }
  };


  return (
    <div className='d-flex row'>
      <div className='d-flex justify-content-between mt-1'>
        <h3 id="passwordHelpBlock" >Code Editor</h3>
        <Dropdown>
          <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
            {selectedLanguage || 'Select Language'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleLanguageSelect('cpp')}>cpp</Dropdown.Item>
            <Dropdown.Item onClick={() => handleLanguageSelect('c')}>c</Dropdown.Item>
            <Dropdown.Item onClick={() => handleLanguageSelect('py')}>py</Dropdown.Item>
            <Dropdown.Item onClick={() => handleLanguageSelect('java')}>java</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <Form>
        <Form.Group controlId="editorTextarea">
          <Form.Control
            as="textarea"
            rows={15}
            value={textareaContent}
            onChange={(e) => setTextareaContent(e.target.value)}
          />
        </Form.Group>
      </Form>
      <div className='d-flex justify-content-start mt-1 mb-1'>
        <Button variant="outline-dark" onClick={handleSubmit}>Submit</Button>
      </div>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      {displayDialog &&
        <Accordion defaultActiveKey={['0']} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Verdict</Accordion.Header>
            <Accordion.Body>
              {
                loading ? <Button variant="primary" disabled>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Loading...
                </Button> :
                  <p>{message}</p>
              }
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      }
    </div>

  )
}

export default CodeEditor;
