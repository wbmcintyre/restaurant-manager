import Account from "../../components/account/Account";
import FlexContainer from "../../components/ui/containers/FlexContainer";
import { idFromJWT } from "../../lib/auth";
import { getOneNoResponse } from "../../lib/handlerFactory";
// import { useContext } from "react";
// import UserContext from "../../store/UserContext";

export default function AccountPage(props) {
  // const context = useContext(UserContext);
  return (
    <FlexContainer>
      <Account user={props.user} />
    </FlexContainer>
  );
}

//only authorize users that are signed in to this url
export async function getServerSideProps(context) {
  const { req, res } = context;
  if (req?.cookies?.jwt) {
    const decodedId = await idFromJWT(req);
    const user = await getOneNoResponse("users", {
      _id: decodedId,
    });
  } else {
    res.setHeader("location", "/signin");
    res.statusCode = 302;
    res.end();
  }

  return {
    props: {},
  };
}
