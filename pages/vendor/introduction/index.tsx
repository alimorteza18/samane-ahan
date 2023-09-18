// ** Hooks
import { useContext } from "react";
import { VendorProfileDataContext } from "../[id].page";
// ** Partials
import FactoryIntroduction from "./factory";
import VendorIntroduction from "./vendor";

const Introduction = () => {
  const { introduction, data } = useContext(VendorProfileDataContext);

  return (
    <div className="mt-40">
      {introduction?.data[0] && data?.category != "factory" ? (
        <VendorIntroduction />
      ) : (
        <FactoryIntroduction />
      )}
    </div>
  );
};

export default Introduction;
