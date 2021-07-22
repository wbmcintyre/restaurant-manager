import { useEffect, useState, useContext } from "react";
import FormInput from "../form/FormInput";
import FormSection from "../form/FormSection";
import ButtonSquare from "../ui/Links/ButtonSquare";
import BorderedColumnContainer from "../ui/containers/BorderedColumnContainer";
import UserImage from "./UserImage";
import UserContext from "../../store/UserContext";

function Account(props) {
  const context = useContext(UserContext);
  const { user } = context;
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    let timeoutVar;
    if (showSuccess) {
      timeoutVar = setTimeout(() => setShowSuccess(false), 5000);
    }
    return clearTimeout(timeoutVar);
  }, [showSuccess]);

  async function updateAccount(e) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("email", e.target.email.value);
    formData.append("address", e.target.address.value);
    if (e.target.photo?.files) {
      formData.append("photo", e.target.photo.files[0]);
    }

    const res = await fetch(`/api/v1/users/${context.user._id}`, {
      method: "PATCH",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      const user = data.data;
      context.signIn(user);
      setShowSuccess(true);
      setIsLoading(false);
    }
  }

  const renderStatus = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    }
    if (showSuccess) {
      return <p>Update Successful</p>;
    }
  };

  if (!context.user) {
    return null;
  }

  return (
    <BorderedColumnContainer>
      <FormSection padding="2rem" onSubmit={updateAccount}>
        <FormInput type="text" name="name" defaultValue={context.user.name}>
          Name:
        </FormInput>
        <FormInput type="email" name="email" defaultValue={context.user.email}>
          Email:
        </FormInput>
        <FormInput
          type="text"
          name="address"
          defaultValue={context.user.address}
        >
          Address:
        </FormInput>
        <UserImage
          src={`${context.user.image}?${new Date().getTime()}`}
          alt="Profile Image"
        />
        <FormInput type="file" accept="image/*" name="photo">
          Choose new photo:
        </FormInput>
        <ButtonSquare margin="2rem">Update</ButtonSquare>
        {renderStatus()}
      </FormSection>
    </BorderedColumnContainer>
  );
}

export default Account;
