/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-node-access */
import React from "react";
import { render, screen } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { LoginContext } from "../contexts/login";
import { WidthContext } from '../contexts/screenWidth';
import { DomainContext } from "../contexts/domains";
import { fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import Main from "../components/Main";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}))

const notLogged = false;
const logged = 'true';
const screenSize = 1200;
const domain = "";
const changeDomain = () => {}; 

function renderMain(isLoggedIn, screenWidth, domain, changeDomain) {
    return render(
      <LoginContext.Provider value={{ isLoggedIn }}>
        <WidthContext.Provider value={{ screenWidth }}>
        <DomainContext.Provider value={{ domain, changeDomain }}>
        <Router>
          <Main />
        </Router>
        </DomainContext.Provider>
        </WidthContext.Provider>
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
  
  it("should render intro page", () => {
    act(() => {
      renderMain(notLogged, screenSize);
    });

    const title = document.querySelector("h1").innerHTML;
    expect(title).toBe("Web Domains Analytics");
  });

  it("should render landing page", () => {
    act(() => {
      renderMain(logged, screenSize, domain, changeDomain);
    });

    const title = document.querySelector("h3").innerHTML;
    expect(title).toBe("Choose a URL");
  });