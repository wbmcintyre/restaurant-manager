import Account from "../../components/account/Account";
import FlexContainer from "../../components/ui/containers/FlexContainer";
import { idFromJWT } from "../../lib/auth";
import { getOneNoResponse } from "../../lib/handlerFactory";
import { UserContextProvider } from "../../store/UserContext";

export default function CheckoutPage() {
  return (
    <FlexContainer>
      <Account user={this.context.user} />
    </FlexContainer>
  );
}

// export async function getServerSideProps(context) {
//   const { req, res } = context;
//   if (req?.cookies?.jwt) {
//     const decodedId = await idFromJWT(req);
//     const user = await getOneNoResponse("users", {
//       _id: decodedId,
//     });

//     if (user) {
//       return {
//         props: {
//           user: {
//             name: user.name,
//             email: user.email,
//             address: user.address,
//           },
//         },
//       };
//     }
//   }
//   res.setHeader("location", "/signin");
//   res.statusCode = 302;
//   res.end();
//   return {
//     props: {},
//   };
// }
