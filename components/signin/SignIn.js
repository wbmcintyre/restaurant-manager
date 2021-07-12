import { useState, useRef } from "react";
import BorderedColumnContainer from "../ui/containers/BorderedColumnContainer";
import TabsSection from "./TabsSection";
import Tab from "./Tab";
import FormSection from "../form/FormSection";
import FormInput from "../form/FormInput";
import FormError from "../form/FormError";
import ButtonSquare from "../ui/Links/ButtonSquare";
import style from "./SignIn.module.css";
import router from "next/router";

function SignIn() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMsg, setErrorMsg] = useState();
  const signUpTabRef = useRef();
  const signInTabRef = useRef();
  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  async function signIn(e) {
    e.preventDefault();
    setErrorMsg(null);

    const reqBody = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const response = await fetch("/api/v1/auth/signin", {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);
      const data = await response.json();

      if (response.status === 200 && data.user && data.token) {
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!set context so the user is not null
        router.push("/");
      } else {
        setErrorMsg(data.message);
      }
    } catch (err) {
      setErrorMsg("Invalid credentials. Please try again.");
      console.error(err);
    }
  }

  async function signUp(e) {
    e.preventDefault();
    setErrorMsg(null);

    const reqBody = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
    };

    try {
      const response = await fetch("/api/v1/auth/signup", {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (data.status === 200 && data.user && data.token) {
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!set context so the user is not null
        router.push("/");
      } else {
        setErrorMsg(data.message);
      }
    } catch (err) {
      setErrorMsg("Invalid credentials. Please try again.");
      console.error(err);
    }
  }

  function renderSignIn() {
    return (
      <FormSection padding="2rem" onSubmit={signIn}>
        <FormInput type="email" name="email" ref={emailRef}>
          Email:
        </FormInput>
        <FormInput type="password" name="password" ref={passwordRef}>
          Password:
        </FormInput>
        {errorMsg && <FormError>{errorMsg}</FormError>}
        <ButtonSquare margin="2rem">Sign In</ButtonSquare>
      </FormSection>
    );
  }

  function renderSignUp() {
    return (
      <FormSection padding="2rem" onSubmit={signUp}>
        <FormInput type="email" name="email" ref={emailRef}>
          Email:
        </FormInput>
        <FormInput type="password" name="password" ref={passwordRef}>
          Password:
        </FormInput>
        <FormInput
          type="password"
          name="confirmPassword"
          ref={confirmPasswordRef}
        >
          Confirm Password:
        </FormInput>
        <FormInput type="text" name="name" ref={nameRef}>
          Name:
        </FormInput>
        {errorMsg && <FormError>{errorMsg}</FormError>}
        <ButtonSquare margin="2rem">Sign Up</ButtonSquare>
      </FormSection>
    );
  }

  function toggleTabs() {
    signInTabRef.current.classList.toggle(style.noUnderline);
    signUpTabRef.current.classList.toggle(style.noUnderline);
    setErrorMsg(null);
  }

  function setSignIn() {
    if (!isSignIn) {
      toggleTabs();
    }
    setIsSignIn(true);
  }

  function setSignUp() {
    if (isSignIn) {
      toggleTabs();
    }
    setIsSignIn(false);
  }

  return (
    <BorderedColumnContainer>
      <TabsSection>
        <Tab
          ref={signInTabRef}
          className={style.noUnderline}
          padding="1rem"
          onClick={setSignIn}
        >
          Sign In
        </Tab>
        <Tab ref={signUpTabRef} padding="1rem" onClick={setSignUp}>
          Sign Up
        </Tab>
      </TabsSection>
      {isSignIn ? renderSignIn() : renderSignUp()}
    </BorderedColumnContainer>
  );
}

export default SignIn;
