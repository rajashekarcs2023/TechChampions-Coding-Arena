import React, { useEffect, useState, useMemo } from "react";
import { Container, Table, Spinner } from "react-bootstrap";
import { useAuth } from '../../context/AuthContext';
import { fetchScores } from '../../services/api'
import PaginationComponent from '../PaginationComponent';

const LeaderBoard = () => {
  const [problem, setProblem] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [problemsPerPage] = useState(9); // If 5 => 20 pages 
  const [fetchInterval] = useState(20000);
  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {

      setLoading(true);

      try {
        const userScores = await fetchScores(token);

        setProblem(userScores);
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

  const currentSubmissions = useMemo(() => {
    const indexOfLastProblem = currentPage * problemsPerPage;
    const indexOfFirstProblem = indexOfLastProblem - problemsPerPage;
    return problem.slice(indexOfFirstProblem, indexOfLastProblem);
  }, [currentPage, problem, problemsPerPage]);


  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container className="">
      <h3>Leader Board</h3>
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
                  <th>Score</th>
                  <th>Problems solved</th>
                </tr>
              </thead>
              <tbody>
                {currentSubmissions.map((e) => (
                  <tr key={e._id}>
                    <td>{e.name}</td>
                    <td>{e.score}</td>
                    <td>{e.solvedProblemsCount}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="d-flex justify-content-center">
            <PaginationComponent maxPagesInRow={10} totalPages={Math.ceil(problem.length / problemsPerPage)}
              paginate={paginate} />
          </div>
        </div>
      )}
    </Container>

  )
}

export default LeaderBoard
