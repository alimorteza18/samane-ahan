import Link from "next/link";
import { HTMLAttributeAnchorTarget } from "react";
import { Button as ReactstrapButton, Spinner, ButtonProps } from "reactstrap";
import { UrlObject } from "url";

const Button = ({ loading = false, ...props }: Button) => {
  return (
    <ReactstrapButton
      {...props}
      href={props.href ?? null}
      tag={props.tag ?? props.href ? Link : "button"}
    >
      {props.icon && !loading ? props.icon : null}
      {loading ? props.loadingText ?? "لطفا کمی صبر کنید" : props.label}{" "}
      {loading
        ? props.loadingComponent ?? (
            <Spinner
              style={{ width: "0.7rem", height: "0.7rem" }}
              type="grow"
              color="light"
            />
          )
        : null}
      {props.children}
    </ReactstrapButton>
  );
};

export default Button;

interface Button extends ButtonProps {
  label?: string;
  loading?: boolean;
  loadingText?: string | number;
  icon?: JSX.Element;
  href?: UrlObject | string;
  loadingComponent?: JSX.Element;
  target?: HTMLAttributeAnchorTarget | undefined;
}
