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

const isloggedIn = false;
const user = null;
const mockChangeLogin = jest.fn();

const loginData = {
  name: "testUser",
  email: "test@mail.com",
  password: "P@ssw0rd"
}

const badLoginData = {
  name: "testUser",
  email: "test",
  password: "P@ssw0rd"
}

function renderLogin(isLoggedIn, currentUser, changeLogin) {
  return render(
    <LoginContext.Provider value={{ isLoggedIn, changeLogin }}>
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

it("should render login page", () => {
  act(() => {
    renderLogin(isloggedIn, user, mockChangeLogin);
  });
});

it("should login with valid data", async () => {
  act(() => {
    renderLogin(isloggedIn, user, mockChangeLogin);
  });

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

  expect(mockChangeLogin).toHaveBeenCalledTimes(1);
});
