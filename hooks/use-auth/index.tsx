import { toggleAdminEditMode } from "@/redux/action/auth";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";

interface UseAuthReturn {
  profile: AuthUserProfile;
  admin_profile: AuthAdminProfile;
  toggleEditMode: () => AnyAction;
  isEditMode: boolean;
  isLoggedIn: boolean;
  /**
   * @description is Loggedin user a vendor
   */
  isVendor: boolean;
}

type UseAuthHook = () => UseAuthReturn;

const useAuth: UseAuthHook = () => {
  const { profile, admin_profile, admin_edit_mode } = useSelector(
    (state: any) => state.auth
  );

  const dispatch = useDispatch();

  //@ts-ignore
  const toggleEditMode = () => dispatch(toggleAdminEditMode());

  return {
    profile,
    admin_profile,
    toggleEditMode,
    isEditMode: admin_profile?.admin?.is_super_admin && admin_edit_mode,
    isLoggedIn: profile && profile?.user,
    isVendor: profile && profile?.vendor,
  };
};

export default useAuth;
