import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Badge, Card } from 'react-bootstrap';
import CodeEditor from "./CodeEditor";
import { useAuth } from "../../context/AuthContext";
import { getProblem } from "../../services/api";

const ProblemDetails = () => {
  const { problemId } = useParams();
  const [problem, setProblem] = useState({});
  const { token } = useAuth();

  useEffect(() => {
    const fetchProblemDetails = async () => {
      try {
        const problemData = await getProblem(problemId, token);

        setProblem(problemData);
      } catch (error) {
        console.error("Error fetching problem details: ", error);
        if (error) {
          return <Navigate to="/error" />;
        }
      }
    };

    fetchProblemDetails();
  }, [problemId, token]);

  const testCases = problem.testCases || [];

  return (
    <div className="d-flex flex-row ">
      <div className="overflow-auto leftSide h-100 w-50 flex-grow-1 text-wrap" style={{ maxHeight: "550px" }}>
        <Card className="m-2">
          <Card.Body >
            <Card.Title>{problem.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted"><Badge bg="dark" >{problem.difficulty}</Badge></Card.Subtitle>
            <Card.Text  >{problem.statement}</Card.Text>
            {testCases.slice(0, 2).map((testCase, index) => (
              <div key={index}>
                <Card.Text className="mt-3 mb-0">Test case </Card.Text>
                <Card.Text className="m-0">Input</Card.Text>
                <div className="m-0 bg-dark text-white">
                  <pre style={{ whiteSpace: 'pre-wrap', marginLeft: '4px' }}>{testCase.input}</pre>
                </div>
                <Card.Text className="m-0">Output</Card.Text>
                <div className="bg-dark text-white">
                  <pre style={{ whiteSpace: 'pre-wrap', marginLeft: '4px' }}>{testCase.output}</pre>
                </div>
              </div>
            ))}
          </Card.Body>
        </Card>
      </div>
      <div className="rightSide flex-grow-1 w-50"><CodeEditor problemId={problemId} /></div>
    </div >
  );
};

export default ProblemDetails;
