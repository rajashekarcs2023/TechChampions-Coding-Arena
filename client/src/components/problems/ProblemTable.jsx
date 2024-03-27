import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Badge, Dropdown } from 'react-bootstrap';

const ProblemTable = ({ problems, handleEdit, handleDelete }) => {
    return (
        <Table bordered hover>
            <thead>
                <tr>
                    <th> Problem Title</th>
                </tr>
            </thead>
            <tbody>
                {problems.map((problem) => (
                    <tr key={problem._id}>
                        <td className='d-flex justify-content-between align-items-center'  >
                            <Link to={`/problems/${problem._id}`}>{problem.title}</Link>
                            <Badge pill bg='dark'>{problem.difficulty}</Badge>
                            <Dropdown>
                                <Dropdown.Toggle className='p-1' variant='outline-dark' >
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => handleEdit(problem)}>Edit</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleDelete(problem)}>Delete</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default ProblemTable;
