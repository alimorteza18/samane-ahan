import { breakpoints } from "@/hooks/use-window-dimension";

interface ShowPhoneColProps {
  row: Product;
  profile: AuthUserProfile;
  dispatch: (action: any) => void;
  width: any;
  calling?: boolean;
  handleCallVendor?: (vendor: UserVendor) => void;
}

const ShowPhoneCol = ({
  row,
  width,
  calling,
  handleCallVendor,
}: ShowPhoneColProps) => {
  return width <= breakpoints.lg ? (
    <button
      onClick={() =>
        handleCallVendor ? handleCallVendor(row?.userVendor) : null
      }
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "50%",
        height: "70%",
        background: "#FFC42E",
        border: "1px solid #DDDDDD",
        borderRadius: "8px",
        padding: "6px 0px",
        margin: "0",
      }}
    >
      <svg
        className="shake"
        width="15"
        height="19"
        viewBox="0 0 15 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.813493 13.4146C1.89107 13.2296 2.90456 12.8753 3.82473 12.3926C4.11393 12.2348 4.46867 12.2551 4.74441 12.4512L6.4059 13.9427C8.68918 12.3333 10.6405 9.69855 11.4503 6.91705L9.50096 5.75456C9.22377 5.54961 9.09705 5.21963 9.1426 4.89616C9.30558 3.8671 9.29924 2.79496 9.12065 1.71632C9.04224 1.24276 9.37113 0.780465 9.84421 0.699261L12.8754 0.178951C13.3485 0.0977461 13.9528 0.210468 14.0617 0.86818C15.4106 9.01504 9.75951 16.9475 1.62952 18.343C1.0075 18.4498 0.670727 17.9394 0.590867 17.4571L0.0899254 14.4316C0.0115172 13.9581 0.340411 13.4958 0.813493 13.4146Z"
          fill="#323232"
        />
      </svg>
    </button>
  ) : (
    <button
      onClick={() =>
        handleCallVendor ? handleCallVendor(row?.userVendor) : null
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
      <span className="vibrate">تماس با فروشنده</span>
    </button>
  );
};

export default ShowPhoneCol;
