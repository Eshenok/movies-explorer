import { useState } from "react";

export const Input = ({isSpan, className, onChange, ...rest }) => {

  const [error, setError] = useState('');

  function handleChange(e) {
    onChange(e);
    checkValidity(e);
  }

  function checkValidity(e) {
    if (e.target.validationMessage) {
      setError(e.target.validationMessage)
    } else {
      setError('');
    }
  }

  return (
    <>
      <input {...rest} onChange={handleChange} className={`${className} ${error ? "input_error" : ""}`} />
      {isSpan ? <span className="input__span-error">{error}</span> : <></>}
    </>
  )
}
