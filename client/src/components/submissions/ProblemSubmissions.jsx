import React, { useEffect, useState } from "react";
import { Container, Table, Spinner, Button, Image, Modal } from "react-bootstrap";
import { useAuth } from '../../context/AuthContext';
import PaginationComponent from '../PaginationComponent';
import { fetchSubmissions } from '../../services/api'
import img from "../../images/code.svg"

const ProblemSubmissions = () => {
  const [submission, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [submissionsPerPage] = useState(9);
  const [fetchInterval] = useState(100000);
  const { token } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [selectedCode, setSelectedCode] = useState("");

  const toggleModal = (code) => {
    setShowModal(!showModal);
    setSelectedCode(code);
  };

  useEffect(() => {
    const fetchData = async () => {

      setLoading(true);

      try {
        const submissions = await fetchSubmissions(token); 
        setSubmissions(submissions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, fetchInterval);

    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchInterval, token]);

  const indexOfLastSubmission = currentPage * submissionsPerPage;
  const indexOfFirstSubmission = indexOfLastSubmission - submissionsPerPage;
  const currentSubmissions = submission.slice(indexOfFirstSubmission, indexOfLastSubmission);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (
    <Container className="">
      <h3>Submission history</h3>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="dark" /> Loading....
        </div>
      ) : (
        <div className="mt-1">
          <div>
            <Table bordered striped hover>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Problem</th>
                  <th>Result</th>
                  <th>Language</th>
                  <th>Submitted At</th>
                  <th>Code</th>
                </tr>
              </thead>
              <tbody>
                {currentSubmissions.map((e) => (
                  <tr key={e._id}>
                    <td>{e.user}</td>
                    <td>{e.problem}</td>
                    <td>{e.status}</td>
                    <td>{e.language}</td>
                    <td>{e.submittedAt}</td>
                    <td>
                      <Button className='m-0' variant='light' onClick={() => toggleModal(e.code)}>
                        <Image src={img} alt="Button Icon" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="d-flex justify-content-center">
            <PaginationComponent maxPagesInRow={10} totalPages={Math.ceil(submission.length / submissionsPerPage)}
              paginate={paginate} />
          </div>

        </div>
      )}
      <Modal show={showModal} onHide={toggleModal} centered className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Code</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ whiteSpace: "pre-line" }}>
          {selectedCode}
        </Modal.Body>
      </Modal>
    </Container>

  )
}

export default ProblemSubmissions
