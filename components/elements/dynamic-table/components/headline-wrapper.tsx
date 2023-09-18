interface Props {
  children: JSX.Element | null;
  isMobile: boolean;
}

const HeadlineWrapper = ({ children, isMobile }: Props) => {
  return (
    <div
      className={`dt-table-header ${
        isMobile ? "dt-table-header-mobile" : "dt-table-header-desktop"
      }`}
    >
      {children}
    </div>
  );
};

export default HeadlineWrapper;
