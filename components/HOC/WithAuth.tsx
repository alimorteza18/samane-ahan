import { fetchUserProfile } from "@/services/auth-service";
import { useEffect, useState } from "react";
import storage from "../../util/localStorage";
import { useRouter } from "next/router";

const withAuthSSR = (gssp: any) => {
  return async (context: any) => {
    // const access_token = storage.get("access_token");
    // const profile = fetchUserProfile({ access_token });

    // if (!profile) {
    //   return {
    //     redirect: {
    //       destination: "/login",
    //     },
    //   };
    // }

    const gsspData = await gssp(context); // Run `getServerSideProps` to get page-specific data

    // Pass page-specific props along with user data from `withAuth` to component
    return {
      props: {
        ...gsspData.props,
      },
    };
  };
};

const withAuthCSR = (Component: any) => {
  const AuthenticatedComponent = () => {
    const router = useRouter();
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
      const getUser = async () => {
        const access_token = storage.get("access_token");
        const profile = fetchUserProfile({ access_token })
          .then(() => {
            setProfile(profile);
          })
          .catch(() => {
            router.push("/login");
          });
      };
      getUser();
    }, []);

    return !!profile ? <Component /> : null; // Render whatever you want while the authentication occurs
  };

  return AuthenticatedComponent;
};

export { withAuthCSR, withAuthSSR };
