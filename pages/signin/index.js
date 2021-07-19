import FlexContainer from "../../components/ui/containers/FlexContainer";
import SignIn from "../../components/signin/SignIn";
import { UserContextProvider } from "../../store/UserContext";

export default function Home() {
  return (
    <FlexContainer align="center">
      <SignIn />
    </FlexContainer>
  );
}
