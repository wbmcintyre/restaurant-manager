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

export async function getServerSideProps(context) {
  const { req, res } = context;
  if (req?.cookies?.jwt) {
    const decodedId = await idFromJWT(req);
    const user = await getOneNoResponse("users", {
      _id: decodedId,
    });

    //NOTE: cannot send json objects through getServerSideProps, so stringify here and parse on the other end
    if (user) {
      return {
        props: {
          user: {
            name: user.name,
            email: user.email,
            address: user.address ? user.address : null,
            image: user.image,
            _id: JSON.stringify(user._id),
          },
        },
      };
    }
  }

  res.setHeader("location", "/signin");
  res.statusCode = 302;
  res.end();
  return {
    props: {},
  };
}
