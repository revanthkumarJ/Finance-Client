import React, { useState } from "react";
import axios from "axios";
import { Stack, Box } from "@mui/material";
import { snackbarUtil } from "../utils/SnackbarUtils";
import Search from "./Search";
import TextFieldUtils from "../utils/VeirfyTextField";
import DeleteCard from "./DeleteCard";
import AlertDialog from "./Dialog";

export default function StudentEdit({ setMessage, triggerSnackbar }) {
  const [studentID, setStudentID] = useState("");
  const [dueDetails, setDueDetails] = useState(null);
  const [selectedDue, setSelectedDue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);

  const fetchDues = async () => {
    if (!TextFieldUtils.textFieldCheck(studentID)) {
      setError(true);
      snackbarUtil(
        setMessage,
        triggerSnackbar,
        "Please Enter Student ID",
        "error"
      );
      return;
    }

    try {
      setIsLoading(true);
      setError(false);
      const response = await axios.get(
        `http://localhost:3001/api/v1/getAllDues/${studentID}`
      );

      console.log(response);

      if (response.data.length > 0) {
        snackbarUtil(
          setMessage,
          triggerSnackbar,
          "Fetched Fee Details",
          "success"
        );

        console.log(response.data);
        setDueDetails(response.data);
      } else
        snackbarUtil(setMessage, triggerSnackbar, "No Active Dues", "success");
    } catch (error) {
      console.log(error);
      snackbarUtil(setMessage, triggerSnackbar, error.message, "error");
    } finally {
      setIsLoading(false);
      setError(false);
    }
  };
  const deleteDue = () => {
    console.log(selectedDue);
    setIsLoading(true);
    try {
      fetchDues(studentID);
    } catch (error) {
      snackbarUtil(setMessage, triggerSnackbar, "An Error Occured", "error");
    }
    setIsLoading(false);
    setOpen(false);
  };
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Box width={"100%"}>
        <AlertDialog
          open={open}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          performDelete={deleteDue}
        />

        <Stack direction={"row"} gap={3}>
          <Search
            getData={fetchDues}
            ID={studentID}
            isLoading={isLoading}
            isError={isError}
            setID={setStudentID}
            text="Enter Student ID"
            placeholder="RXXXXXX"
          />
        </Stack>
        <Stack p={5}>
          {dueDetails &&
            dueDetails.map((item) => {
              return (
                <DeleteCard
                  item={item}
                  selectDue={() => {
                    setSelectedDue(item);
                  }}
                  open={open}
                  setOpen={setOpen}
                />
              );
            })}
        </Stack>
      </Box>
    </>
  );
}