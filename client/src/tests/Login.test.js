/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-node-access */
import React from "react";
import { render, screen } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { LoginContext } from "../contexts/login";
import { fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import Login from "../components/Login";
import Register from "../components/Register";

const isloggedIn = false;
const user = null;
const changeLogin = jest.fn();

const loginData = {
  name: "userTest",
  email: "userTest@mail.com",
  password: "password",
}

const badLoginData = {
  name: "userTest2",
  email: "userTest2@mail.com",
  password: "password",
  confirmPass: "different"
}

function renderRegister(isLoggedIn, currentUser, changeLogin) {
  return render(
    <LoginContext.Provider value={{ isLoggedIn, currentUser, changeLogin }}>
      <Router>
        <Register />
      </Router>
    </LoginContext.Provider>,
    container
  );
}

function renderLogin(isLoggedIn, currentUser, changeLogin) {
  return render(
    <LoginContext.Provider value={{ isLoggedIn, currentUser, changeLogin }}>
      <Router>
        <Login />
      </Router>
    </LoginContext.Provider>,
    container
  );
}

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("should render register page", () => {
  act(() => {
    renderRegister(isloggedIn, user, changeLogin);
  });
});

it("should register with valid data", async () => {
  
  render(
    <LoginContext.Provider value={{ isloggedIn, user, changeLogin }}>
      <Router>
        <Register />
      </Router>
    </LoginContext.Provider>,
    container
  );

  const name = document.querySelectorAll("input")[0];
  const email = document.querySelectorAll("input")[1];
  const password = document.querySelectorAll("input")[2];
  const repPassword = document.querySelectorAll("input")[3];
  const submit = document.querySelector("input[type=submit]");

  fireEvent.change(name, { target: { value: loginData.name } });
  fireEvent.change(email, { target: { value: loginData.email } });
  fireEvent.change(password, { target: { value: loginData.password } });
  fireEvent.change(repPassword, { target: { value: loginData.password } });

  expect(name.value).toBe(loginData.name);
  expect(email.value).toBe(loginData.email);
  expect(password.value).toBe(loginData.password);
  expect(repPassword.value).toBe(loginData.password);

  act(() => {
    submit.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  await new Promise((r) => setTimeout(r, 2000));

  expect(changeLogin).toHaveBeenCalledTimes(1);

});

it("should not register with different passwords", async () => {
  
  render(
    <LoginContext.Provider value={{ isloggedIn, user, changeLogin }}>
      <Router>
        <Register />
      </Router>
    </LoginContext.Provider>,
    container
  );

  const name = document.querySelectorAll("input")[0];
  const email = document.querySelectorAll("input")[1];
  const password = document.querySelectorAll("input")[2];
  const repPassword = document.querySelectorAll("input")[3];
  const submit = document.querySelector("input[type=submit]");

  fireEvent.change(name, { target: { value: badLoginData.name } });
  fireEvent.change(email, { target: { value: badLoginData.email } });
  fireEvent.change(password, { target: { value: badLoginData.password } });
  fireEvent.change(repPassword, { target: { value: badLoginData.confirmPass } });

  expect(name.value).toBe(badLoginData.name);
  expect(email.value).toBe(badLoginData.email);
  expect(password.value).toBe(badLoginData.password);
  expect(repPassword.value).toBe(badLoginData.confirmPass);

  act(() => {
    submit.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  await new Promise((r) => setTimeout(r, 2000));

  expect(changeLogin).toHaveBeenCalledTimes(0);

});

it("should render login page", () => {
  const mockChangeLogin = jest.fn();
  act(() => {
    renderLogin(isloggedIn, user, mockChangeLogin);
  });
});

it("should login with valid data", async () => {
  render(
    <LoginContext.Provider value={{ isloggedIn, user, changeLogin }}>
      <Router>
        <Login />
      </Router>
    </LoginContext.Provider>,
    container
  );

  const name = document.querySelectorAll("input")[0];
  const email = document.querySelectorAll("input")[1];
  const password = document.querySelectorAll("input")[2];
  const submit = document.querySelector("input[type=submit]");

  fireEvent.change(name, { target: { value: loginData.name } });
  fireEvent.change(email, { target: { value: loginData.email } });
  fireEvent.change(password, { target: { value: loginData.password } });

  expect(name.value).toBe(loginData.name);
  expect(email.value).toBe(loginData.email);
  expect(password.value).toBe(loginData.password);

  act(() => {
    submit.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  await new Promise((r) => setTimeout(r, 2000));

  expect(changeLogin).toHaveBeenCalledTimes(1);

});

// it("should not login with invalid data", async () => {
//   act(() => {
//     renderLogin(isloggedIn, user, mockChangeLogin);
//   });

//   const name = document.querySelectorAll("input")[0];
//   const email = document.querySelectorAll("input")[1];
//   const password = document.querySelectorAll("input")[2];
//   const submit = document.querySelector("input[type=submit]");

//   fireEvent.change(name, { target: { value: badLoginData.name } });
//   fireEvent.change(email, { target: { value: badLoginData.email } });
//   fireEvent.change(password, { target: { value: badLoginData.password } });

//   expect(name.value).toBe(badLoginData.name);
//   expect(email.value).toBe(badLoginData.email);
//   expect(password.value).toBe(badLoginData.password);

//   act(() => {
//     submit.dispatchEvent(new MouseEvent("click", { bubbles: true }));
//   });

//   setTimeout(() => {
//     const logInButton = document.querySelector("div.bar-0-2-8 > div > a:nth-child(1) > h2").innerHTML;
//     expect(logInButton).toBe("Login");
//   }, 2000);

// });
