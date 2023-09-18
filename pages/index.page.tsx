// ** Partials
import Home, { HomePageProps } from "./home";
// ** Services
import { fetchVendors } from "@/services/vendor-services";
import { fetchGroupedProducts } from "@/services/product-services";
import { PRODUCT_TYPE, PRODUCT_TYPE_DETAILS } from "@/services/product-type-services"; // prettier-ignore
import { GetServerSideProps } from "next";
import { fetchOverviews, findSingleField } from "@/services/util-service";

const IndexPage = (props: HomePageProps) => {
  return <Home {...props} />;
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const types = PRODUCT_TYPE_DETAILS[PRODUCT_TYPE.REBAR];
  const results = await fetchGroupedProducts({
    type_id: types?.id,
    // per_page: 400,
    sizeValue: [16, 18],
    order: "created_at",
    includes: [
      { name: "userVendor", fields: ["id", "name", "vendor_profile_img"] },
    ],
  });

  const vendors = await fetchVendors({
    per_page: 10,
    category: "vendor",
    order: "rate",
    fields: [
      "id",
      "category",
      "phone",
      "province_id",
      "name",
      "modir_name",
      "rate",
      "vendor_profile_img",
      "website_url",
      "ig_url",
      "tg_url",
    ],
    includes: [{ name: "province" }],
  });

  const lowestFactories = [
    `2-3-16-نیشابور-lowest_price`,
    `2-3-14-ذوب آهن-lowest_price`,
    `2-3-18-شاهین بناب-lowest_price`,
    `2-3-16-ابرکوه-lowest_price`,
    `1-1-18-فایکو-lowest_price`,
    `1-1-18-ذوب آهن-lowest_price`,
    `5-40-25-کاویان-lowest_price`,
    `5-40-30-اکسین-lowest_price`,
    `2-3-14-هیربد-lowest_price`,
    `2-3-12-سیادن ابهر-lowest_price`,
    `1-1-16-یزد-lowest_price`,
  ];

  // ** highest and lowest prices
  const highestAndLowest = [
    "2-3-12",
    "2-3-14",
    "2-3-16",
    "2-3-18",
    "1-1-14",
    "1-1-16",
    "1-1-24",
    "5-40-25",
    "5-40-30",
  ];

  const queryDesc: Array<string> = [...lowestFactories];

  highestAndLowest.map((item) => {
    queryDesc.push(`${item}-lowest_price`);
    queryDesc.push(`${item}-highest_price`);
  });

  const overviews = await fetchOverviews({
    fields: ["query_desc", "query_object", "query_result"],
    updatedAt: new Date().toISOString().slice(0, 10),
    queryDesc,
    order: "updated_at",
    per_page: 500,
  });

  const boxes: Array<any> = [];

  highestAndLowest.map((item) => {
    let lowest= findSingleField({data: overviews.data.data, want: "query_result", findBy: "query_desc", value: `${item}-lowest_price` }); //prettier-ignore
    let highest= findSingleField({data: overviews.data.data, want: "query_result", findBy: "query_desc", value: `${item}-highest_price` }); //prettier-ignore

    if (lowest && highest) boxes.push({ lowest, highest });
  });

  const overviewsData: Array<any> = [];

  lowestFactories.map((query) => {
    let targetIndex = overviews.data.data?.findIndex(
      (item) => item?.query_desc === query
    );

    if (targetIndex > -1) overviewsData.push(overviews.data.data[targetIndex]);
  });

  /**
   * we need current time to send to call modal
   * this is crucial because if we calculate time on front, it encounters
   * Error: Text content does not match server-rendered HTML.
   */
  const today = new Date();
  const currentTime = today.getHours() + ":" + today.getMinutes();

  return {
    props: {
      currentTime,
      types: types,
      groupedProducts: results.data,
      vendors: vendors.data.data,
      overviews: overviewsData,
      lowestAndHighest: boxes.length ? boxes : null,
    },
  };
};
