import { useRef } from "react";
import FormInput from "../form/FormInput";
import FormSection from "../form/FormSection";
import ButtonSquare from "../ui/Links/ButtonSquare";
import BorderedColumnContainer from "../ui/containers/BorderedColumnContainer";
import UserImage from "./UserImage";

function Account() {
  const nameRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();
  const imageRef = useRef();
  let userImage = "/Logo-RM.png";
  const userName = "tempName";
  const userEmail = "tempEmail";
  const userAddress = "tempAddress";

  function updateAccount() {
    console.log("Need to do this");
    //
    //Patch request to api/v1/users/[userid]???
    //server side render with decoded jwt to get id
    //then do a post to update?

    //or...
    //server side render user information to fill in account information
    //
  }

  return (
    <BorderedColumnContainer>
      <FormSection padding="2rem" onSubmit={updateAccount}>
        <FormInput
          type="text"
          name="name"
          ref={nameRef}
          defaultValue={userName}
        >
          Name:
        </FormInput>
        <FormInput
          type="email"
          name="email"
          ref={emailRef}
          defaultValue={userEmail}
        >
          Email:
        </FormInput>
        <FormInput
          type="text"
          name="address"
          ref={addressRef}
          defaultValue={userAddress}
        >
          Address:
        </FormInput>
        <UserImage id="userImage" src={userImage} alt="Profile Image" />
        <FormInput type="file" name="image" ref={imageRef}>
          Choose new photo:
        </FormInput>
        <ButtonSquare margin="2rem">Update</ButtonSquare>
      </FormSection>
    </BorderedColumnContainer>
  );
}

export default Account;
