import { useEffect, useState } from "react";

function useValidate(initialState, validate) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(true);

  function handleChange(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  }
  
  useEffect(() => {
    setErrors(validate(values));
  }, [values]);
  
  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      setIsSubmitting(false);
    } else {
      setIsSubmitting(true);
    }
  }, [errors]);

  return {
    values,
    errors,
    handleChange,
    isSubmitting,
    setValues
  };
}

export default useValidate;
