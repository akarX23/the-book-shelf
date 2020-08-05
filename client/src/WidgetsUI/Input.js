import React from "react";

const Input = (props) => {
  const renderInput = () => {
    switch (props.config.type) {
      case "select":
        return (
          <select
            onChange={props.onchange}
            value={props.value}
            autoComplete="on"
          >
            {props.options.map((item, i) => {
              return (
                <option value={item} key={i}>
                  {item}
                </option>
              );
            })}
          </select>
        );
      case "textarea":
        return (
          <textarea
            value={props.value}
            placeholder={props.config.placeholder}
            onChange={props.onchange}
            autoComplete="on"
          />
        );
      default:
        return (
          <input
            {...props.config}
            value={props.value}
            onChange={props.onchange}
            autoComplete="on"
          />
        );
    }
  };

  return (
    <div className="form_element">
      {props.label ? <label>{props.label}</label> : null}
      <div>{renderInput()}</div>
      <div className="errorInput">{props.errorMessage}</div>
    </div>
  );
};

export default Input;
