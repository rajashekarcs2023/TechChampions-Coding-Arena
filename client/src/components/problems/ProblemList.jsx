import React, { useEffect, useState } from 'react';
import { Container, Button, Spinner, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import PaginationComponent from '../PaginationComponent';
import ProblemTable from './ProblemTable';
import { fetchProblems, deleteProblem } from '../../services/api';

const ProblemList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [problemsPerPage] = useState(7);
  const [message, setMessage] = useState('');
  const [fetchInterval] = useState(40000);
  const { token, userId } = useAuth();
  const [show, setShow] = useState(false);
  const [problemToDelete, setProblemToDelete] = useState(null);

  const handleClose = () => setShow(false);

  useEffect(() => {
    const fetchProblem = async () => {
      setLoading(true);
      try {
        const problems = await fetchProblems(token);
        setData(problems);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchProblem();

    const intervalId = setInterval(() => {
      fetchProblem();
    }, fetchInterval);

    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchInterval, token]);

  const indexOfLastProblem = currentPage * problemsPerPage;
  const indexOfFirstProblem = indexOfLastProblem - problemsPerPage;
  const currentProblems = data.slice(indexOfFirstProblem, indexOfLastProblem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const navigate = useNavigate();

  const handleDelete = async (problem) => {
    console.log('Delete button clicked');
    console.log(userId);

    if (userId !== problem.createdBy) {
      setMessage('Unauthorized action. Only the problem owner can delete this.');
      setShow(true);
    } else {
      setProblemToDelete(problem);
      setMessage('Are you sure to delete the problem?');
      setShow(true);
    }
  };

  const handleConfirmDelete = async (problem) => {
    try {
      const isDeleted = deleteProblem(token, problem._id);

      if (isDeleted) {
        setData((prevData) => prevData.filter((item) => item._id !== problem._id));
        handleClose();
        setProblemToDelete(null);
        console.log('Problem deleted!!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (problem) => {
    console.log('Edit button is clicked');
    console.log(userId);

    if (userId !== problem.createdBy) {
      setMessage('Unauthorized action. Only the problem owner can edit this.');
      setShow(true);
    } else {
      navigate(`/problems/edit/${problem._id}`);
    }
  };

  return (
    <Container className=''>
      {loading ? (
        <div className='d-flex justify-content-center'>
          <Spinner animation='border' variant='dark' />
        </div>
      ) : (
        <div className='mt-1'>
          <div>
            <ProblemTable
              problems={currentProblems}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </div>
          <div className='d-flex justify-content-center'>
            <PaginationComponent totalPages={Math.ceil(data.length / problemsPerPage)}
              maxPagesInRow={10} currentPage={currentPage} paginate={paginate} />
          </div>
          <div className='d-flex justify-content-center'>
            <Button variant='outline-dark' href='/problems/add'>Add Problem</Button>
          </div>
        </div>
      )}
      <Modal show={show} onHide={handleClose} centered backdrop="static" keyboard={false}>
        <Modal.Header closeButton >
          <Modal.Title>Confirm to delete the problem....</Modal.Title>
        </Modal.Header>
        <Modal.Body className='d-flex'>
          <p>{message}</p>
        </Modal.Body>
        {problemToDelete && (
          <Modal.Footer>
            <Button variant='danger' onClick={() => handleConfirmDelete(problemToDelete)}>
              Confirm Delete
            </Button>
            <Button variant='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </Container>
  );
};

export default ProblemList;
