import React, { Component } from "react";
import Notifications, { notify } from "react-notify-toast";

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      firstNameValid: false,
      lastName: "",
      lastNameValid: false,
      userName: "",
      userNameValid: false,
      sex: "Male",
      email: "",
      password: "",
      confirmPassword: "",
      confirmPasswordValid: false,
      sendEmail: true,
      file: null,
      fileValid: false,
      formErrors: {
        email: "",
        password: "",
        confirmPassword: "",
        fileType: "",
        firstName: ""
      },
      region: "Other",
      about: "",
      emailValid: false,
      passwordValid: false,
      formValid: false
    };
    this.defaultFormValue = this.state;
  }

  validateUser = e => {
    const target = e.target;
    const name = target.name;
    let value = target.value;
    const re = /^[0-9a-zA-Z]+$/;

    if (!re.test(value)) {
      return console.log("wrong symbol!");
    }
    this.setState({
      [name]: value
    });

    if (target.firstName !== "") {
      this.setState(
        {
          firstNameValid: true
        },
        this.validate
      );
    }

    if (target.lastName !== "") {
      this.setState(
        {
          lastNameValid: true
        },
        this.validate
      );
    }

    if (target.userName !== "") {
      this.setState(
        {
          userNameValid: true
        },
        this.validate
      );
    }
  };

  getImage = e => {
    if (e.target.type === "file") {
      e.target.file = e.target.files[0];
      // console.log(e.target.file);
      if (e.target.file !== undefined) {
        if (
          e.target.file.type === "image/jpeg" ||
          e.target.file.type === "image/png"
        ) {
          this.setState({
            fileValid: true
          });
          this.state.formErrors.fileType = "";
        } else {
          this.state.formErrors.fileType = "only png/jpg";
        }
      } else {
        this.setState({
          fileValid: false
        });
      }
    }
    this.setState(
      {
        file: e.target.file
      },
      this.validate
    );
  };

  handleChange = e => {
    const target = e.target;
    const name = target.name;
    let value = target.value;

    if (target.type === "checkbox") {
      value = target.checked;
    }

    this.setState({
      [name]: value
    });

    this.validateForm(name, value);
  };

  validateForm(name, value) {
    const fieldErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch (name) {
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldErrors.email = emailValid ? "" : " is invalid";
        break;
      case "password":
        passwordValid = value.length >= 10;
        fieldErrors.password = passwordValid
          ? ""
          : "min 10 symbols length validation";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldErrors,
        emailValid: emailValid,
        passwordValid: passwordValid
      },
      this.validate
    );
  }

  validate() {
    this.setState({
      formValid:
        this.state.emailValid &&
        this.state.firstNameValid &&
        this.state.lastNameValid &&
        this.state.userNameValid &&
        this.state.passwordValid &&
        // this.state.confirmPasswordValid &&
        this.state.fileValid
    });
  }

  handleConfirmPassword = e => {
    if (e.target.value !== this.state.password) {
      this.setState(
        {
          confirmPassword: e.target.value,
          confirmPasswordValid: false
        },
        this.validate
      );
    } else {
      this.setState(
        {
          confirmPassword: e.target.value,
          confirmPasswordValid: true
        },
        this.validate
      );
    }
  };

  onRadioChange = e => {
    this.setState({
      sex: e.target.value
    });
  };

  submit = e => {
    e.preventDefault();
    // console.log(this.state);
    const {
      firstName,
      lastName,
      userName,
      sex,
      email,
      password,
      confirmPassword,
      confirmPasswordValid,
      sendEmail,
      file,
      region
    } = this.state;

    if (confirmPasswordValid === false) {
      notify.show("Passwords do not match", "error", 3000);
    } else {
      console.log(`
  FistName: ${firstName}\n
  LastName: ${lastName}\n
  UserName: ${userName}\n
  Sex: ${sex}\n
  Email: ${email}\n
  Password: ${password}\n
  Confirm Password: ${confirmPassword}\n
  Send Email: ${sendEmail}\n
  Region: ${region}\n
  File: ${file.name}, ${file.type}
  `);
      notify.show("Form submitted", "success", 5000);
      this.resetForm();
    }
  };

  renderErrors() {
    const { formErrors } = this.state;
    return Object.keys(formErrors).map((fieldName, index) => {
      if (formErrors[fieldName].length > 0) {
        return (
          <p key={fieldName + index} className="errors">
            {" "}
            {fieldName} {formErrors[fieldName]}{" "}
          </p>
        );
      } else {
        return " ";
      }
    });
  }

  resetForm() {
    this.setState(this.defaultFormValue);
  }

  render() {
    const {
      firstName,
      lastName,
      userName,
      sex,
      email,
      password,
      confirmPassword,
      sendEmail,
      region
    } = this.state;
    return (
      <form noValidate onSubmit={this.submit}>
        <Notifications />
        <div className="panel panel-errors">{this.renderErrors()}</div>
        <div className="form-group">
          <label htmlFor="inputFirstName">First Name: </label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            className="form-control"
            id="inputFirstName"
            onChange={this.validateUser}
          />{" "}
        </div>
        <div className="form-group">
          <label htmlFor="inputLastName">Last Name: </label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            className="form-control"
            id="inputLastName"
            onChange={this.validateUser}
          />{" "}
        </div>
        <div className="form-group">
          <label htmlFor="inputUserName">User Name: </label>
          <input
            type="text"
            name="userName"
            value={userName}
            className="form-control"
            id="inputUserName"
            onChange={this.validateUser}
          />{" "}
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="Male"
              checked={sex === "Male"}
              onChange={this.onRadioChange}
            />
            <span> Male </span>
          </label>
          <label>
            <input
              type="radio"
              value="Female"
              checked={sex === "Female"}
              onChange={this.onRadioChange}
            />
            <span> Female </span>
          </label>
        </div>
        ​
        <div className="form-group">
          <label htmlFor="inputEmail">User Email: </label>
          <input
            type="email"
            name="email"
            value={email}
            className="form-control"
            id="inputEmail"
            aria-describedby="emailHelp"
            onChange={this.handleChange}
          />{" "}
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            className="form-control"
            id="inputPassword"
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputConfirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            className="form-control"
            id="inputConfirmPassword"
            onChange={this.handleConfirmPassword}
          />
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            name="sendEmail"
            checked={sendEmail}
            className="form-check-input"
            id="checkbox"
            onChange={this.handleChange}
          />{" "}
          ​
          <label className="form-check-label" htmlFor="exampleCheck">
            Send me promotional emails checkbox
          </label>
        </div>
        <div className="form-region">
          <label className="form-region" htmlFor="input-region">
            {" "}
            Choose your region:
            <select
              name="region"
              value={region}
              onChange={this.handleChange}
              placeholder="Choose Your Region"
            >
              <option region="Kyiv">Kyiv</option>
              <option region="Kharkov">Kharkov</option>
              <option region="Cherkassy">Cherkassy</option>
              <option region="Other">Other</option>
            </select>
          </label>
        </div>
        ​
        <div className="form-group">
          <div className="input-group">
            <div className="custom-file">
              <input
                type="file"
                name="file"
                className="custom-file-input"
                accept="image/png, image/jpeg"
                onChange={this.getImage}
              />
              ​
            </div>
          </div>
        </div>
        ​
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!this.state.formValid}
        >
          Submit
        </button>
        {/* <div className="panel panel-errors">{this.renderErrors()}</div> */}
      </form>
    );
  }
}

export default FormContainer;
