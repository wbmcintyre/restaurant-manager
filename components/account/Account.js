import { useEffect, useState } from "react";
import FormInput from "../form/FormInput";
import FormSection from "../form/FormSection";
import ButtonSquare from "../ui/Links/ButtonSquare";
import BorderedColumnContainer from "../ui/containers/BorderedColumnContainer";
import UserImage from "./UserImage";

function Account(props) {
  const { user } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (showSuccess) {
      setTimeout(() => setShowSuccess(false), 5000);
    }
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

    const res = await fetch(`/api/v1/users/${JSON.parse(user._id)}`, {
      method: "PATCH",
      body: formData,
    });

    if (res.ok) {
      setShowSuccess(true);
      setIsLoading(false);
    }
  }

  const renderStatus = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    }
    if (showSuccess) {
      return <p color={"green"}>Update Successful</p>;
    }
  };

  return (
    <BorderedColumnContainer>
      <FormSection padding="2rem" onSubmit={updateAccount}>
        <FormInput type="text" name="name" defaultValue={user.name}>
          Name:
        </FormInput>
        <FormInput type="email" name="email" defaultValue={user.email}>
          Email:
        </FormInput>
        <FormInput type="text" name="address" defaultValue={user.address}>
          Address:
        </FormInput>
        <UserImage
          src={`${user.image}?${new Date().getTime()}`}
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
