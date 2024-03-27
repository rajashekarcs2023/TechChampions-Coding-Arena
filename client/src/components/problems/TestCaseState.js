import { useState } from "react";

export function useTestCaseState() {
  const [testCaseModalState, setTestCaseModalState] = useState({
    show: false,
    data: { input: "", output: "", timeTaken: "" },
    errors: { input: "", output: "", timeTaken: "" },
  });

  const handleShowTestCaseModal = () => {
    setTestCaseModalState({
      ...testCaseModalState,
      show: true,
    });
  };

  const handleCloseTestCaseModal = () => {
    setTestCaseModalState({
      ...testCaseModalState,
      show: false,
    });
  };

  const handleTestCaseInputChange = (e) => {
    const { name, value } = e.target;
    setTestCaseModalState({
      ...testCaseModalState,
      data: { ...testCaseModalState.data, [name]: value },
      errors: { ...testCaseModalState.errors, [name]: "" },
    });
  };

  const validateTestCase = () => {
    const errors = {};
    if (!testCaseModalState.data.input.trim()) {
      errors.input = "Input is required";
    }
    if (!testCaseModalState.data.output.trim()) {
      errors.output = "Output is required";
    }
    if (!testCaseModalState.data.timeTaken.trim()) {
      errors.timeTaken = "Time taken is required";
    }
    const milliseconds = parseInt(testCaseModalState.data.timeTaken, 10);

    if (isNaN(milliseconds) || milliseconds <= 0) {
      errors.timeTaken =
        "Time taken must be a positive number in milliseconds.";
    }
    return errors;
  };

  return {
    validateTestCase,
    setTestCaseModalState,
    testCaseModalState,
    handleShowTestCaseModal,
    handleCloseTestCaseModal,
    handleTestCaseInputChange,
  };
}
