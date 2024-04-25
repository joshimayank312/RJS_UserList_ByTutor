import React, { useState, useRef } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./AddUser.module.css";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";

const AddUser = (props) => {
  //useState and useRef both are work almost same, but when & what we should use is decide by our requirements
  //We can use useRef when we want the input value when it completly added or on clicking on submit button rather than how useState gives input value onchange or on each key stroke in input feild.
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;

    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({
        title: "Invalid Input Values",
        message: "Please enter a valid name and age (non-empty values). ",
      });
      return;
    }
    if (+enteredUserAge < 1) {
      // Generally enteredAge is in string and it works in javascript but for super safe we,
      // Force Conversion of enteredAge to number by adding + sign
      setError({
        title: "Invalid Age",
        message: "Please enter a valid age (Non-zero positive values). ",
      });
      return;
    }
    // console.log(enteredUsername, enteredAge);
    props.onAddUser(enteredName, enteredUserAge);
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
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
            autoComplete="off" //It will not give suggestion when clicking on input feild.
            ref={nameInputRef}
          />
          <label htmlFor="age">Age (Years): </label>
          <input
            id="age"
            type="number"
            autoComplete="off" //It will not give suggestion when clicking on input feild.
            ref={ageInputRef}
          />
          <Button type="submit"> Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
