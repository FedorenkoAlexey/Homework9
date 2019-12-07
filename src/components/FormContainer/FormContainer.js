import React, { Component } from "react";

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      sendEmail: true,
      file: null,
      formErrors: {
        email: "",
        password: ""
      },
      region: "Other",
      about: ""
      // regionOptions: ["Kyiv", "Che", "Others"]
    };
    this.defaultFormValue = this.state;
  }

  validateUser = e => {
    const target = e.target;
    const name = target.name;
    let value = target.value;
    const re = /^[0-9a-zA-Z]+$/;

    if (!re.test(value)) {
      //   this.setState({ value: value });
      //   console.log({ value });
      return console.log("weak!");
    }
    this.setState({
      [name]: value
    });
  };

  handleChange = e => {
    const target = e.target;
    const name = target.name;
    let value = target.value;

    if (target.type === "checkbox") {
      value = target.checked;
    }

    if (target.type === "file") {
      value = target.files[0];
    }

    this.setState({
      [name]: value
    });

    this.validateForm(name, value);
  };

  validateForm(name, value) {
    switch (name) {
      case "email":
        this.state.formErrors.email =
          value.length < 5 ? "Email is less then required" : "";
        break;
      case "password":
        this.state.formErrors.password =
          value.length < 10 ? "pass is less then required" : "";
        break;
      case "password":
        this.state.formErrors.password =
          value.length === 0 ? console.log("can't be empty") : "";
        break;
      default:
        break;
    }
  }

  handleConfirmPassword = e => {
    if (e.target.value !== this.state.password) {
      console.log(".error('error')");
      this.setState({ confirmPassword: e.target.value });
      console.log("BED", this.state.confirmPassword);
    } else {
      this.setState({ confirmPassword: e.target.value });
      console.log("good", this.state.confirmPassword);
    }
  };

  submit = e => {
    e.preventDefault();
    console.log(this.state);

    this.state.password.length < 10
      ? console.log(
          "Pass is less then required",
          this.state.password.length < 10
        )
      : console.log("Good");

    if (this.state.password !== this.state.confirmPassword) {
      this.resetForm();
      alert("Passwords do not match");
      return false;
    } else return true;
    // this.resetForm();
  };

  resetForm() {
    this.setState(this.defaultFormValue);
  }

  render() {
    const {
      firstName,
      lastName,
      userName,
      email,
      password,
      confirmPassword,
      sendEmail,
      file,
      region
    } = this.state;
    return (
      <form noValidate onSubmit={this.submit}>
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
        ​
        <div className="form-group">
          <label htmlFor="inputEmail">User Email</label>
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
              <option region="Kh">Kharkov</option>
              <option region="Che">Che</option>
              <option region="Oth..">Other</option>
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
                id="inputGroupFile04"
                onChange={this.handleChange}
              />
              ​
              <label className="custom-file-label" htmlFor="inputGroupFile04">
                ​{file ? file.name : "Choose file"}
              </label>
            </div>
          </div>
        </div>
        ​
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

export default FormContainer;
