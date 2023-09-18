require("dotenv").config();

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  compiler: {
    styledComponents: true,
  },
  redirects: async () => [
    {
      source: `/dashboard/:vendor_id`,
      destination: "/vendor/:vendor_id",
      permanent: true,
    },
    {
      source: `/similar-vendor/:vendor_id`,
      destination: "/vendor/:vendor_id",
      permanent: true,
    },
    // Sheet
    {
      source: `/product-category/${encodeURI("ورق")}`,
      destination: "/price/steel_plate-black",
      permanent: true,
    },
    {
      source: `/product-category/${encodeURI("ورق")}/${encodeURI("سیاه")}`,
      destination: "/price/steel_plate-black",
      permanent: true,
    },
    {
      source: `/product-category/${encodeURI("ورق")}/${encodeURI("روغنی")}`,
      destination: "/price/steel_plate-sheet_oily",
      permanent: true,
    },
    {
      source: `/product-category/${encodeURI("ورق")}/${encodeURI("رنگی")}`,
      destination: "/price/steel_plate-colored",
      permanent: true,
    },
    {
      source: `/product-category/${encodeURI("ورق")}/${encodeURI("گالوانیزه")}`,
      destination: "/price/steel_plate-galvanized",
      permanent: true,
    },
    {
      source: `/product-category/${encodeURI("ورق")}/${encodeURI("آلیاژی")}`,
      destination: "/price/steel_plate-alloy",
      permanent: true,
    },
    {
      source: `/product-category/${encodeURI("ورق")}/${encodeURI("اسید شویی")}`,
      destination: "/price/steel_plate-pickling",
      permanent: true,
    },
    {
      source: `/product-category/${encodeURI("ورق")}/${encodeURI("آجدار")}`,
      destination: "/price/steel_plate-ribbed",
      permanent: true,
    },
    {
      source: `/product-category/${encodeURI("ورق")}/${encodeURI("قلع اندود")}`,
      destination: "/price/steel_plate-tin_plated",
      permanent: true,
    },
    // Girder
    {
      source: `/product-category/${encodeURI("تیرآهن")}`,
      destination: "/price/beam-common",
      permanent: true,
    },
    {
      source: `/product-category/${encodeURI("تیرآهن")}/${encodeURI("معمولی")}`,
      destination: "/price/beam-common",
      permanent: true,
    },
    {
      source: `/product-category/${encodeURI("تیرآهن")}/${encodeURI("هاش")}`,
      destination: "/price/beam-hash",
      permanent: true,
    },
    // Rebar
    {
      source: `/product-category/${encodeURI("میلگرد")}`,
      destination: "/price/rebar-ribbed",
      permanent: true,
    },
    {
      source: `/product-category/${encodeURI("میلگرد")}/${encodeURI("آجدار")}`,
      destination: "/price/rebar-ribbed",
      permanent: true,
    },
    {
      source: `/product-category/${encodeURI("میلگرد")}/${encodeURI("ساده")}`,
      destination: "/price/rebar-simple",
      permanent: true,
    },
    // Can
    {
      source: `/product-category/${encodeURI("قوطی و پروفیل")}`,
      destination: "/price/profile-common",
      permanent: true,
    },
    {
      source: `/product-category/${encodeURI("قوطی و پروفیل")}/${encodeURI(
        "معمولی"
      )}`,
      destination: "/price/profile-common",
      permanent: true,
    },
    {
      source: `/product-category/${encodeURI("قوطی و پروفیل")}/${encodeURI(
        "سپری"
      )}`,
      destination: "/price/profile-shield",
      permanent: true,
    },
    {
      source: `/product-category/${encodeURI("قوطی و پروفیل")}/${encodeURI(
        "پروفیل Z"
      )}`,
      destination: "/price/profile-profile_z",
      permanent: true,
    },
    // Corner
    {
      source: `/product-category/${encodeURI("نبشی")}`,
      destination: "/price/channel_bar",
      permanent: true,
    },
    // Stud
    {
      source: `/product-category/${encodeURI("ناودانی")}`,
      destination: "/price/angle_bar-europian_standard",
      permanent: true,
    },
    {
      source: `/product-category/${encodeURI("ناودانی")}/${encodeURI("سبک")}`,
      destination: "/price/angle_bar-light",
      permanent: true,
    },
    {
      source: `/product-category/${encodeURI("ناودانی")}/${encodeURI(
        "استاندارد داخلی"
      )}`,
      destination: "/price/angle_bar-internal_standard",
      permanent: true,
    },
    {
      source: `/product-category/${encodeURI("ناودانی")}/${encodeURI(
        "استاندارد اروپا"
      )}`,
      destination: "/price/angle_bar-europian_standard",
      permanent: true,
    },
  ],
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: "/mag/:path*/",
        destination: "https://mag.samaneahan.com/:path*/",
      },
    ];
  },
  reactStrictMode: false,
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
  env: {
    customUrl: "http://localhost:3000",
    SITE_URL: process.env.SITE_URL || "https://samaneahan.com",
    APP_ENV: process.env.APP_ENV ?? "production",
    API_BASE_URL: process.env.API_BASE_URL ?? "https://api.samaneahan.com",
    SENTRY_DSN: process.env.SENTRY_DSN,
    GOFTINO_KEY: process.env.GOFTINO_KEY,
  },
};

module.exports = withBundleAnalyzer(nextConfig);

// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,

    org: "sentry",
    project: "javascript-nextjs",
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  }
);
