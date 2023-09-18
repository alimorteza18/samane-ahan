import { CSSProperties } from "react";

interface Props {
  children: JSX.Element | Array<JSX.Element> | null;
  height?: string;
  styles: CSSProperties | undefined;
  classNames?: string | undefined;
}

const RowsContainer = ({ children, height, styles, classNames }: Props) => {
  return (
    <div
      className={`dt-rows-container rows-container ${classNames}`}
      style={{
        maxHeight: height,
        ...(styles ?? {}),
      }}
    >
      {children}
    </div>
  );
};

export default RowsContainer;
