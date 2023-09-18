const siteUrl = process.env.SITE_URL || "https://samaneahan.com";

const pathConfigs = [
  {
    loc: "/",
    lastmod: "2023-07-01",
    // Add other properties as needed
  },
  {
    loc: "/login",
    lastmod: "2023-07-01",
    // Add other properties as needed
  },
  {
    loc: "/blog",
    lastmod: "2023-07-01",
    // Add other properties as needed
  },
  {
    loc: "/about",
    lastmod: "2023-07-01",
    // Add other properties as needed
  },
  {
    loc: "/landings/create-vendor",
    lastmod: "2023-07-01",
    // Add other properties as needed
  },
  {
    loc: "/terms",
    lastmod: "2023-07-01",
    // Add other properties as needed
  },
  // Add more path configurations as needed
];

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true, // (optional)
  robotsTxtOptions: {
    additionalSitemaps: [
      `${siteUrl}/sitemaps/price.xml`,
      // `${siteUrl}/sitemaps/blog.xml`,
    ],
    transformRobotsTxt: async (configs, robotsTxt) => {
      const lines = robotsTxt.split("\n");
      const filteredLines = lines.filter((line) => {
        return (
          !line.includes(`${siteUrl}/sitemaps/price.xml`) &&
          !line.includes(`# Host`) &&
          !line.includes(`Host: ${siteUrl}`)
        );
      });
      return filteredLines.join("\n");
    },
  },
  transform: async (config, path) => {
    const pathConfig = pathConfigs.find((pc) => pc.loc === path);
    if (pathConfig) {
      return { loc: path, lastmod: pathConfig.lastmod, ...pathConfig };
    }

    return {
      loc: path,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
  exclude: [
    "/nest/*",
    "/sitemaps/*",
    "/price",
    "/404",
    "/account",
    "/pay/*",
    "/products",
    "/sentry-example-page",
  ],
};
