// ** Hooks
import useHttp from "@/hooks/use-http";
import { useEffect, useState } from "react";
// ** Partials
import VendorHeader from "./header";
import VendorTabs from "./tabs";
import Statistics from "./statistics";
import Introduction from "./introduction";
// ** Services
import { createContext } from "react";
import { fetchVendorProfile, fetchVendorGallery, fetchVendorIntroductions, fetchVendorStatistics, fetchVendors } from "@/services/vendor-services"; //prettier-ignore
import { fetchProducts } from "@/services/product-services";
import { GetServerSideProps } from "next";
import type { PaginationType } from "@/hooks/use-http";
import { FetchProductsProps, FetchVendorGalleryReturn } from "@/types/services";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { RawData } from "@/types";
import { Col, Container, Image, Row } from "react-bootstrap";
import { getMetaTags } from "@/services/meta-tags-services";
import LazyLoad from "react-lazyload";
import VendorSimilar from "./vendor-similar";
import { NextSeo } from "next-seo";

export const VendorProfileDataContext =
  //@ts-ignore
  createContext<VendorPageContextProps>(null);

export default function VendorPage({
  currentTime,
  data,
  products,
  gallery,
  introduction,
  statistics,
  initialTitleAndDesc,
  typeId: initialTypeId,
  notFound
}: VendorPageProps) {

  const [typeId, setTypeId] = useState(initialTypeId);

  const {
    loading: productsLoading,
    rawData: rawHttpProducts,
    pagination: productsPagination,
  } = useHttp<Product[], FetchProductsProps>(fetchProducts, {
    vendor_id: data.id,
    page: 1,
    per_page: 5,
    initialState: products,
    type_id: typeId,
  });

  const [cat, setCat] = useState("");

  const { data: dataGallery } = useHttp(fetchVendorGallery, {
    id: data.id,
    category: cat,
  });
  const { data: vendorsSimilar } = useHttp<Product[]>(
    fetchVendors,
    { similar: data.id },
    true
  );

  useEffect(() => productsPagination?.changePage(1), [typeId]);

  return (
    <VendorProfileDataContext.Provider
      value={{
        currentTime,
        data,
        products: rawHttpProducts,
        productsPagination,
        productsLoading,
        dataGallery,
        gallery,
        introduction,
        statistics,
        cat,
        setCat,
        initialTitleAndDesc,
        typeId,
        setTypeId,
        notFound: notFound || true
      }}
    >
      <Breadcrumb sub="بنگاه‌ها" subChild={data.name} />
      <NextSeo
        canonical={`${process.env.SITE_URL}/vendor/${data?.slug ?? data?.id}`}
        title={
          getMetaTags({
            page: "singleVendor",
            vandorCategory: data?.category,
            vendorName: data?.name,
          })?.title
        }
      />
      <Container style={{ backgroundColor: "#f3f3f3" }}>
        <Row>
          <Col lg={9} md={12} sm={12} sx={12}>
            <div
              className="mt-10"
              style={{
                backgroundColor: "#fff",
                padding: "10px 30px",
                borderRadius: "10px",
              }}
            >
              <VendorHeader data={data} />
              <Introduction />
            </div>
          </Col>
          <Col lg={3} md={12} sm={12} sx={12} className="d-none d-lg-block">
            <>
              {data?.category == "vendor" ? (
                <Statistics statistics={statistics} />
              ) : null}
              <aside className="mt-10">
                <LazyLoad once>
                  <a href="https://blog.samaneahan.com">
                    <img
                      className="advertising"
                      style={{ width: "85%" }}
                      src="/assets/imgs/advertizing/gif1.gif"
                      alt=""
                    />
                  </a>

                  <img
                    style={{ width: "85%" }}
                    className="advertising w-85"
                    src="/assets/imgs/advertizing/gif3.gif"
                    alt=""
                  />
                </LazyLoad>
              </aside>
            </>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <VendorTabs data={data} />
          </Col>
          <Col lg={12} className="d-block d-lg-none d-md-none">
            {data?.category == "vendor" ? (
              <Statistics statistics={statistics} />
            ) : null}
          </Col>
          <Col lg={12} className="d-block d-lg-none d-md-none">
            <div className="mt-10">
              <a href="https://blog.samaneahan.com">
                <img
                  src="/assets/imgs/advertizing/gif1.gif"
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </a>
            </div>
          </Col>
        </Row>
        {/* {vendorsSimilar && vendorsSimilar.length !== 0 ? (
          <VendorSimilar data={vendorsSimilar} />
        ) : null} */}
      </Container>
    </VendorProfileDataContext.Provider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let id = ctx.params?.id ? ctx.params?.id.toString() : 1;

  let results = null;

  try {
    results = await fetchVendorProfile({ id });

  } catch (e) {

  }

  if (!results){
    return{
      notFound: true
    }
  }



  if (results) id = results.data.id;

  const typeId = results.data?.permissions[0]?.id;

  const products = await fetchProducts({
    vendor_id: id,
    page: 1,
    per_page: 5,
    type_id: typeId,
  });
  const gallery = await fetchVendorGallery({ id });
  const introductions = await fetchVendorIntroductions({ vendor_id: id });
  const statistics = await fetchVendorStatistics({ vendor_id: id });

  /**
   * we need current time to send to call modal
   * this is crucial because if we calculate time on front, it encounters
   * Error: Text content does not match server-rendered HTML.
   */
  const today = new Date();
  const currentTime = today.getHours() + ":" + today.getMinutes();

  // if(results){
  //       return{
  //         notFound: true,
  //       }
  // }

  return {
    props: {
      currentTime,
      data: results.data,
      typeId: typeId ?? null,
      products: products.data,
      gallery: gallery.data,
      introduction: introductions.data,
      statistics: statistics.data,
      initialTitleAndDesc:
        results.data.category != "vendor"
          ? getMetaTags({
            page: "singleVendor",
            vendorName: results.data.name,
            vandorCategory: results.data.category,
          })
          : null,
    },
  };
};

export interface VendorPageProps {
  currentTime: string;
  notFound: boolean | undefined;
  data: UserVendor;
  typeId: any;
  products: RawData<Product[]>;
  gallery: FetchVendorGalleryReturn;
  introduction: RawData<GalleryIntroduction[]>;
  statistics: VendorStatistics;
  initialTitleAndDesc: { title: string; description: string };
}

export interface VendorPageContextProps extends VendorPageProps {
  data: UserVendor;
  productsPagination: PaginationType;
  productsLoading: boolean;
  dataGallery: any;
  cat: string;
  setCat: any;
  setTypeId: (typeId: any) => void;
}
interface SingleGalleryIntroProps extends GalleryIntroduction { }
