// ** Hooks
// ** Components
import { Container } from "reactstrap";
import Head from "next/head";
// ** Partials
import HeaderSection from "./header-section";
import NewProductsSection from "./new-products-section";
import VendorSection from "./vendor-section";
import SellOnlineSection from "./sell-online-section";
import CheapestVendorsSection from "./cheapest-vendors-section";
import BannerSection from "./banner-section";
import FooterBanner from "@/components/partials/FooterBanner";
// ** Services
import { getMetaTags } from "@/services/meta-tags-services";
import { RawData } from "@/types";
import ProductsPriceRange from "./ProductPriceRange";
import { NextSeo, OrganizationJsonLd } from "next-seo";

export interface HomePageProps {
  currentTime: string;
  groupedProducts: RawData<GroupedProduct[]>;
  types: any; //TypeProp;
  vendors: UserVendor[];
  overviews: Overview[];
  lowestAndHighest: Array<{ lowest: Product; highest: Product }>;
}

const Home = ({
  vendors,
  overviews,
  lowestAndHighest,
  currentTime,
}: HomePageProps) => {
  return (
    <Container
      fluid
      style={{
        paddingRight: 0,
        paddingLeft: 0,
        backgroundColor: "#f3f3f3",
        paddingBottom: "50px",
      }}
    >
      <NextSeo
        title={getMetaTags().title}
        description={getMetaTags().description}
        canonical={`${process.env.SITE_URL}`}
      />

      <OrganizationJsonLd
        type="Oraganization"
        name="سامانه آهن"
        logo={`${process.env.SITE_URL}/assets/imgs/theme/logo-black.png`}
        url={`${process.env.SITE_URL}`}
        address={{
          streetAddress: "تهران",
          addressLocality: "تهران",
          addressRegion: "تهران",
          addressCountry: "IR",
        }}
        contactPoint={[
          {
            telephone: "91305404 (021)",
            contactType: "پشتیبانی",
            areaServed: "IR",
            availableLanguage: "Persian",
          },
          {
            telephone: "+98-21-9130-5404",
            contactType: "دفتر مرکزی",
            areaServed: "IR",
            availableLanguage: "Persian",
          },
        ]}
      />

      <HeaderSection />

      {overviews?.length ? <CheapestVendorsSection data={overviews} /> : null}

      <NewProductsSection currentTime={currentTime} />

      {lowestAndHighest ? <ProductsPriceRange data={lowestAndHighest} /> : null}

      <SellOnlineSection />

      <VendorSection vendors={vendors} />

      <BannerSection />

      <div className="mt-20">
        <FooterBanner />
      </div>
    </Container>
  );
};

export default Home;
