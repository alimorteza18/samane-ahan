import PageComponent, { getProductsAndFilters, ProductsPageProps } from "../page-component"; //prettier-ignore
import type { GetServerSideProps } from "next";

const TypesKindsPages = (props: ProductsPageProps) => (
  <PageComponent {...props} />
);

export const getServerSideProps: GetServerSideProps = async (ctx) =>
  getProductsAndFilters(ctx);

export default TypesKindsPages;
