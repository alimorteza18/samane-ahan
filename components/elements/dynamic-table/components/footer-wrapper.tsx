interface Props {
  children: JSX.Element;
  fullWidthIndexColumn?: () => JSX.Element;
}

const FooterWrapper = ({ fullWidthIndexColumn, children }: Props) => {
  return (
    <div
      className={`d-flex justify-content-center dt-row ${
        !fullWidthIndexColumn ? ` dt-last-row` : null
      } `}
    >
      {children}
    </div>
  );
};

export default FooterWrapper;
