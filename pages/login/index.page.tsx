// ** Hooks
import { useRouter } from "next/router";
// ** Partials
import UserLogin from "./user-login";
// ** Services
import AdminLogin from "./admin-login";
import { connect } from "react-redux";
import {
  saveLoggedInUserData,
  saveAccessToken,
  saveAdminAccessToken,
  saveLoggedInAdmin,
} from "@/redux/action/auth";

function Login(props: any) {
  const router = useRouter();

  let mode: string = router.query.mode ? router.query.mode?.toString() : "user";

  return mode === "user" ? <UserLogin {...props} /> : <AdminLogin {...props} />;
}

const mapStateToProps = (state: any) => ({
  user: state.user,
});

const mapDispatchToProps = {
  saveLoggedInUserData,
  saveAccessToken,
  saveAdminAccessToken,
  saveLoggedInAdmin,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
