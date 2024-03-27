import React, { useState } from 'react';
import { Button, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import img from '../../images/trash.svg'
import ViewTestCaseModal from './ViewTestCaseModal';

const TestCaseList = ({ testCases, deleteTestCase }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTestCase, setSelectedTestCase] = useState({ input: '', output: '' });

    const handleTestCaseClick = (index) => {
        setIsModalVisible(true);
        setSelectedTestCase(testCases[index]);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="d-flex flex-row flex-wrap w-100">
            {testCases.map((testCase, index) => (
                <div className='me-2 mb-2' key={index}>
                    <OverlayTrigger key='view' placement='top' overlay={<Tooltip ><strong>View test case {index + 1}</strong></Tooltip>}>
                        <Button className='m-0' variant='light' onClick={() => handleTestCaseClick(index)}>
                            Test Case {index + 1}
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger key='delete' placement='top' overlay={<Tooltip> <strong> Delete test case {index + 1}  </strong></Tooltip>}>
                        <Button className='m-0' variant='light' onClick={deleteTestCase(index)}>
                            <Image className=' ' src={img} alt="Button Icon" />
                        </Button>
                    </OverlayTrigger>
                </div>
            ))}
            <ViewTestCaseModal isVisible={isModalVisible} testCase={selectedTestCase} onClose={handleCloseModal} />
        </div>
    )
}

export default TestCaseList;
