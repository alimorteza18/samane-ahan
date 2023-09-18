import { getServerSideSitemapLegacy } from "next-sitemap";
import { GetServerSideProps } from "next";
import {
  PRODUCT_KIND_AND_TYPE,
  PRODUCT_TYPE,
} from "@/services/product-type-services";
import { PRODUCT_KIND } from "@/services/product-kind-services";

const SIZES_AND_FACTORIES = {
  [PRODUCT_TYPE.GIRDER]: {
    sizes: [
      "4",
      "8",
      "10",
      "12",
      "14",
      "16",
      "18",
      "20",
      "22",
      "24",
      "26",
      "27",
      "28",
      "30",
      "32",
      "33",
      "34",
      "36",
      "40",
      "45",
      "50",
      "55",
      "60",
      "80",
      "100",
      "120",
      "140",
      "160",
      "180",
      "200",
      "220",
      "240",
      "260",
      "280",
      "300",
      "320",
      "340",
      "360",
      "400",
      "450",
      "500",
      "550",
      "600",
      "650",
      "700",
      "800",
      "900",
      "1000",
    ],
    factories: [
      "zobahan",
      "faiko",
      "Europe",
      "mahan",
      "tork",
      "sobheparsian",
      "grohemeli",
      "zafarbonab",
      "shahinbonab",
      "yazdehramian",
      "eshtehard",
      "atlasgolestan",
      "gharbekermanshah",
      "sepehriranian",
    ],
  },
  [PRODUCT_TYPE.REBAR]: {
    sizes: [
      "6.5",
      "8",
      "10",
      "12",
      "13",
      "14",
      "16",
      "17",
      "18",
      "20",
      "22",
      "23",
      "24",
      "25",
      "26",
      "28",
      "30",
      "34",
      "32",
      "35",
      "36",
      "38",
      "40",
      "42",
      "45",
      "50",
      "60",
      "70",
      "90",
      "170",
    ],
    factories: [
      "zobahanardebil",
      "miandoab",
      "daghighihashtrood",
      "zafarbonab",
      "radhamedan",
      "kiankashan",
      "hirbod",
      "siadanabhar",
      "navadesemnan",
      "neyshboor",
      "pershian",
      "arian",
      "kavirkashan",
      "novinmatin",
      "zobahan",
      "amirkabir",
      "abarkooh",
      "rastinastara",
      "shahinbonab",
      "dopad",
      "navadkerman",
      "anahita",
      "fooladgolestan",
      "miane",
      "gilan",
      "gharbekermanshah",
      "azaramin",
      "sepehriranian",
      "argtabriz",
      "arvandahvaz",
      "kavetikmedash",
      "shahrood",
      "faiko",
      "bafgh",
      "ghaemesfahan",
      "khoramabad",
      "atigheazasahand",
      "safchegan",
      "etc",
      "roohina",
      "ghazvin",
    ],
  },
  [PRODUCT_TYPE.CAN]: {
    sizes: [
      "140*140",
      "10*25",
      "10*30",
      "20*20",
      "20*30",
      "20*40",
      "20*60",
      "25*25",
      "30*30",
      "30*40",
      "30*50",
      "30*60",
      "40*40",
      "40*60",
      "40*80",
      "40*100",
      "50*50",
      "50*100",
      "60*60",
      "60*80",
      "60*100",
      "60*120",
      "70*70",
      "80*80",
      "80*100",
      "80*120",
      "90*90",
      "100*100",
      "100*150",
      "100*180",
      "100*200",
      "120*120",
      "30*20",
      "10*20",
      "40*20",
      "50*30",
      "60*30",
      "80*40",
      "80*60",
      "15*25",
      "100*40",
      "20*10",
      "100*50",
      "100*60",
      "200*200",
      "300*200",
      "300*300",
      "150*150",
      "160*160",
    ],
    factories: ["yaran", "mobareke", "faiko"],
  },
  [PRODUCT_TYPE.SHEET]: {
    sizes: [
      "8",
      "15",
      "6",
      "10",
      "0.5",
      "80",
      "20",
      "25",
      "30",
      "35",
      "40",
      "2",
      "3",
      "4",
      "5",
      "12",
      "45",
      "70",
      "0.48",
      "3.5",
      "4.5",
      "2.5",
      "0.6",
      "0.25",
      "0.7",
      "0.8",
      "0.9",
      "1",
      "1.25",
      "1.5",
      "0.4",
      "1.2",
      "50",
      "60",
      "100",
      "55",
      "65",
      "90",
      "18",
      "0.22",
      "0.2",
      "0.3",
      "0.35",
      "3.3",
      "14",
      "1.17",
      "0.97",
    ],
    factories: [
      "khoramabad",
      "mobareke",
      "korea",
      "kavyan",
      "oxsin",
      "ghaemesfahan",
      "gilan",
      "saba",
      "ghatat",
      "haftalmas",
      "zobahan",
      "taraz",
      "grohemeli",
      "china",
      "etc",
    ],
  },
  [PRODUCT_TYPE.CORNER]: {
    sizes: [
      "2",
      "2.5",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "10",
      "12",
      "30",
      "40",
      "45",
      "50",
      "60",
      "70",
      "80",
      "100",
      "120",
    ],
    factories: [
      "zobahan",
      "nab",
      "shekofte",
      "sepehriranian",
      "manzome",
      "javidbonab",
      "eshtehard",
      "shahinbonab",
      "mahan",
      "zanjan",
      "zohorian",
      "anahita",
      "yavaranzanjan",
      "siadanabhar",
      "arian",
    ],
  },
  [PRODUCT_TYPE.STUD]: {
    sizes: [
      "1",
      "4",
      "5",
      "6",
      "6.5",
      "8",
      "10",
      "12",
      "14",
      "16",
      "18",
      "20",
      "22",
      "24",
      "26",
      "28",
      "30",
      "32",
      "35",
      "38",
      "40",
      "60",
      "65",
      "80",
      "245",
    ],
    factories: [
      "shekofte",
      "faiko",
      "tork",
      "mahan",
      "sadratehran",
      "radhamedan",
      "nasta",
      "zobahan",
      "sepehriranian",
    ],
  },
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const results = [];

  // ** /price
  results.push({
    loc: `${process.env.SITE_URL}/price`,
    lastmod: new Date().toISOString(),
  });

  Object.keys(PRODUCT_KIND_AND_TYPE).map((typeId: any) => {
    const typeRoute = `${PRODUCT_KIND_AND_TYPE[typeId].enLabel}`;

    // ** /price/type
    results.push({
      loc: `${process.env.SITE_URL}/price/${typeRoute}`,
      lastmod: new Date().toISOString(),
    });

    const sizes = SIZES_AND_FACTORIES[typeId].sizes;
    sizes.forEach((size) => {
      const typeSizeRoute = `${typeRoute}-${size}`;

      // If it doesnt have kinds
      if (Object.keys(PRODUCT_KIND_AND_TYPE[typeId].kinds).length === 0) {
        // ** /price/type-size
        results.push({
          loc: `${process.env.SITE_URL}/price/${typeSizeRoute}`,
          lastmod: new Date().toISOString(),
        });
      }

      const factoryies = SIZES_AND_FACTORIES[typeId].factories;

      factoryies.forEach((factory) => {
        const typeSizeFactoryRoute = `${typeSizeRoute}/${factory}`;

        // If it doesnt have kinds
        if (Object.keys(PRODUCT_KIND_AND_TYPE[typeId].kinds).length === 0) {
          // ** /price/type-size/factory
          results.push({
            loc: `${process.env.SITE_URL}/price/${typeSizeFactoryRoute}`,
            lastmod: new Date().toISOString(),
          });
        }
      });
    });

    // If type has kind
    if (Object.keys(PRODUCT_KIND_AND_TYPE[typeId].kinds).length !== 0) {
      Object.keys(PRODUCT_KIND_AND_TYPE[typeId].kinds).map((kindId: any) => {
        if (
          kindId !== PRODUCT_KIND.GIRDER_NORMAL ||
          kindId !== PRODUCT_KIND.CAN_MEXICAN ||
          kindId !== PRODUCT_KIND.CAN_COIL ||
          kindId !== PRODUCT_KIND.CAN_DOOR_HINGE ||
          kindId !== PRODUCT_KIND.CAN_FRENCH ||
          kindId !== PRODUCT_KIND.CAN_MEXICAN ||
          kindId !== PRODUCT_KIND.CAN_ROMAN ||
          kindId !== PRODUCT_KIND.CAN_SHIELD ||
          kindId !== PRODUCT_KIND.CAN_Z_PROFILE ||
          kindId !== PRODUCT_KIND.SHEET_ROLL ||
          kindId !== PRODUCT_KIND.STUD_LIGHT ||
          kindId !== PRODUCT_KIND.STUD_INTERNAL_STANDARD ||
          kindId !== PRODUCT_KIND.STUD_EUROPIAN_STANDARD
        ) {
          // ** /price/type-kind

          const typeKindRoute = `${PRODUCT_KIND_AND_TYPE[typeId].enLabel}-${PRODUCT_KIND_AND_TYPE[typeId].kinds[kindId].enLabel}`;

          results.push({
            loc: `${process.env.SITE_URL}/price/${typeKindRoute}`, // Absolute url
            lastmod: new Date().toISOString(),
          });

          const sizes = SIZES_AND_FACTORIES[typeId].sizes;
          sizes.forEach((size) => {
            const typeKindSizeRoute = `${typeKindRoute}-${size}`;

            // ** /price/type-kind-size
            results.push({
              loc: `${process.env.SITE_URL}/price/${typeKindSizeRoute}`,
              lastmod: new Date().toISOString(),
            });

            const factoryies = SIZES_AND_FACTORIES[typeId].factories;

            factoryies.forEach((factory) => {
              const typeKindSizeFactoryRoute = `${typeKindSizeRoute}/${factory}`;

              // ** /price/type-kind-size/factory
              results.push({
                loc: `${process.env.SITE_URL}/price/${typeKindSizeFactoryRoute}`,
                lastmod: new Date().toISOString(),
              });
            });
          });

          const factoryies = SIZES_AND_FACTORIES[typeId].factories;

          factoryies.forEach((factory) => {
            const typeKindFactoryRoute = `${typeKindRoute}/${factory}`;

            // ** /price/type-kind/factory
            results.push({
              loc: `${process.env.SITE_URL}/price/${typeKindFactoryRoute}`,
              lastmod: new Date().toISOString(),
            });
          });
        }
      });
    }
  });

  return getServerSideSitemapLegacy(ctx, results);
};

// Default export to prevent next.js errors
export default function Sitemap() {}
