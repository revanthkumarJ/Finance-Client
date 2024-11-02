import React, { useState } from "react";
import axios from "axios";
import { snackbarUtil } from "../utils/SnackbarUtils";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

const EditInstallment = ({ setMessage, triggerSnackbar }) => {
  const [studentID, setStudentID] = useState("");
  const [sourceType, setSourceType] = useState("");
  const [destinationType, setDestinationType] = useState("");
  const [dueNumbers, setDueNumbers] = useState([]);
  const [selectedDueNumber, setSelectedDueNumber] = useState("");
  const [dueDetails, setDueDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDueDetails, setShowDueDetails] = useState(false); // New state for managing visibility

  const modelsMap = {
    TutionFee: "TutionFeeSchema",
    HostelFee: "HostelFeeSchema",
    Others: "OtherFromMSI",
  };

  // Fetch dues based on student ID, source type, and model
  const fetchDues = async () => {
    setSelectedDueNumber(null);
    setDueNumbers([]);
    setDueDetails(null); // Reset due details on fetching new dues
    setShowDueDetails(false); // Hide due details initially
    if (!studentID || !sourceType || !destinationType) {
      snackbarUtil(setMessage, triggerSnackbar, "Please complete all fields", "error");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:3001/api/v1/getDuesBasedOnFee/${modelsMap[sourceType]}/${studentID}`
      );

      // Access the first element of the response to get the array of due objects
      setDueNumbers(response.data[0]); // assuming response.data[0] gives the correct array of due objects
      if (response.data[0].length > 0)
        snackbarUtil(setMessage, triggerSnackbar, "Fetched Fee Details", "success");
      else
        snackbarUtil(setMessage, triggerSnackbar, "No Active Dues", "error");

    } catch (error) {
      snackbarUtil(setMessage, triggerSnackbar, error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch due details for the selected due number
  const fetchDueDetails = (dueNumber) => {
    const selectedDue = dueNumbers.find((due) => due.ReceiptNo === dueNumber);
    if (selectedDue) {
      setDueDetails({
        dueNumber: selectedDue.ReceiptNo,
        amount: selectedDue.Amount,
        dueDate: selectedDue.Date,
      });
      setShowDueDetails(true); // Show due details
    } else {
      setShowDueDetails(false); // Hide due details if nothing is found
    }
  };

  // Update installment API call
  const changeInstallment = async () => {
    try {
      const response = await axios.put("http://localhost:3001/api/v1/update/studentFee/exchange", {
        sourceModel: modelsMap[sourceType],
        targetModel: modelsMap[destinationType],
        ID: studentID,
        DueNumber: selectedDueNumber,
      });
      snackbarUtil(setMessage, triggerSnackbar, "Installment Updated", "success");
    } catch (error) {
      snackbarUtil(setMessage, triggerSnackbar, error.message, "error");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Input for Student ID */}
      <TextField
        label="Student ID"
        value={studentID}
        onChange={(e) => setStudentID(e.target.value)}
        fullWidth
        sx={{ marginTop: 2, width: "60%" }}
      />

      {/* Source Type and Destination Type Select */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px", width: "60%" }}>
        <FormControl fullWidth>
          <InputLabel>Source Type</InputLabel>
          <Select
            value={sourceType}
            onChange={(e) => setSourceType(e.target.value)}
            label="Source Type"
          >
            <MenuItem value="TutionFee">Tuition Fee</MenuItem>
            <MenuItem value="HostelFee">Hostel Fee</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Destination Type</InputLabel>
          <Select
            value={destinationType}
            onChange={(e) => setDestinationType(e.target.value)}
            label="Destination Type"
          >
            <MenuItem value="TutionFee">Tuition Fee</MenuItem>
            <MenuItem value="HostelFee">Hostel Fee</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* Fetch Details Button */}
      <Button
        variant="contained"
        onClick={fetchDues}
        disabled={isLoading}
        sx={{ marginTop: 2, marginBottom: 2 }}
      >
        Fetch Fee Details
      </Button>

      {/* Due Number Dropdown */}
      {dueNumbers.length > 0 && (
        <div style={{ display: "flex", marginTop: "20px", width: "60%" }}>
          <FormControl fullWidth>
            <InputLabel>Due Number</InputLabel>
            <Select
              value={selectedDueNumber}
              onChange={(e) => {
                const newSelectedDueNumber = e.target.value;
                setSelectedDueNumber(newSelectedDueNumber);
                fetchDueDetails(newSelectedDueNumber);
              }}
              label="Due Number"
            >
              {
                dueNumbers.map((due) => (
                  <MenuItem key={due._id} value={due.ReceiptNo}>
                    {due.ReceiptNo} {/* Display the ReceiptNo */}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>
      )}

      {/* Display Due Details */}
      {showDueDetails && dueDetails && (
        <TableContainer component={Paper} style={{ marginTop: "20px", width: "60%" }}>
          <Typography variant="h6" align="center" sx={{ marginTop: "20px", marginBottom: "20px", fontWeight: "bold" }}>
            Due Details
          </Typography>
          <Table sx={{ minWidth: 650 }} aria-label="due details table">
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: "#1976D2" }}>Due Number</TableCell>
                <TableCell>{dueDetails.dueNumber}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: "#1976D2" }}>Amount</TableCell>
                <TableCell>{dueDetails.amount}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: "#1976D2" }}>Due Date</TableCell>
                <TableCell>{dueDetails.dueDate}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Change Installment Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={changeInstallment}
        disabled={!selectedDueNumber || !sourceType || !destinationType}
        sx={{ marginTop: 2 }}
      >
        Change Installment
      </Button>
    </div>
  );
};

export default EditInstallment;
