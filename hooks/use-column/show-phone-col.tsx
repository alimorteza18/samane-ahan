import { breakpoints } from "@/hooks/use-window-dimension";

interface ShowPhoneColProps {
  row: Product;
  profile: AuthUserProfile;
  dispatch: (action: any) => void;
  width: any;
  calling?: boolean;
  handleCallVendor?: (vendor: UserVendor, otherDatas?: any) => void;
}

const ShowPhoneCol = ({
  row,
  handleCallVendor,
}: ShowPhoneColProps) => {
  return (<>
   <button
      onClick={() =>
        handleCallVendor
          ? handleCallVendor(row?.userVendor, { product: row })
          : null
      }
      className="product-table-call-btn"
      aria-label={row.userVendor.name}
    >
      <svg
        className="shake"
        width="16"
        height="19"
        viewBox="0 0 16 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.66506 13.4146C2.74263 13.2296 3.75612 12.8753 4.67629 12.3926C4.96549 12.2348 5.32023 12.2551 5.59598 12.4512L7.25746 13.9427C9.54074 12.3333 11.4921 9.69855 12.3019 6.91705L10.3525 5.75456C10.0753 5.54961 9.94862 5.21963 9.99416 4.89616C10.1571 3.8671 10.1508 2.79496 9.97221 1.71632C9.8938 1.24276 10.2227 0.780465 10.6958 0.699261L13.727 0.178951C14.2001 0.0977461 14.8044 0.210468 14.9133 0.86818C16.2622 9.01504 10.6111 16.9475 2.48108 18.343C1.85907 18.4498 1.52229 17.9394 1.44243 17.4571L0.941488 14.4316C0.86308 13.9581 1.19197 13.4958 1.66506 13.4146Z"
          fill="#323232"
        />
      </svg>
      <span className="vibrate product-table-call-btn-text ">تماس با فروشنده</span>
    </button>
  </>);
};

export default ShowPhoneCol;
