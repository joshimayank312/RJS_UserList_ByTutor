import React, { useState } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./AddUser.module.css";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid Input Values",
        message: "Please enter a valid name and age (non-empty values). ",
      });
      return;
    }
    if (+enteredAge < 1) {
      // Generally enteredAge is in string and it works in javascript but for super safe we,
      // Force Conversion of enteredAge to number by adding + sign
      setError({
        title: "Invalid Age",
        message: "Please enter a valid age (Non-zero positive values). ",
      });
      return;
    }
    // console.log(enteredUsername, enteredAge);
    props.onAddUser(enteredUsername, enteredAge);
    setEnteredUsername("");
    setEnteredAge("");
  };

  const usernameChangeHandler = (event) => {
    // console.log(event.target.value);
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    // console.log(event.target.value);
    setEnteredAge(event.target.value);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username: </label>
          <input
            id="username"
            type="text"
            value={enteredUsername}
            autoComplete="off" //It will not give suggestion when clicking on input feild.
            onChange={usernameChangeHandler}
          />
          <label htmlFor="age">Age (Years): </label>
          <input
            id="age"
            type="text"
            value={enteredAge}
            autoComplete="off" //It will not give suggestion when clicking on input feild.
            onChange={ageChangeHandler}
          />
          <Button type="submit"> Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
