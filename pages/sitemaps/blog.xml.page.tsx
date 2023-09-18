import { getServerSideSitemapLegacy } from "next-sitemap";
import { GetServerSideProps } from "next";
import { fetchBlogPosts } from "@/services/blog-services";
import { BLOG_BASE_URL } from "@/services/http-service";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  async function getAllPosts() {
    const perPage = 10;
    let currentPage = 1;
    let allPosts: Array<{ link: string }> = [];
    const results: Array<{ loc: string; lastmod: string }> = [];

    try {
      let response = await fetchBlogPosts({
        _fields: "link",
        per_page: perPage,
        page: currentPage,
      });
      let posts = response.data;

      // Fetch and save posts from the current page
      allPosts = [...allPosts, ...posts];

      // Check if there are more pages
      while (response.headers["x-wp-totalpages"] > currentPage) {
        currentPage++;

        // Fetch posts from the next page
        response = await fetchBlogPosts({
          _fields: "link",
          per_page: perPage,
          page: currentPage,
        });
        posts = response.data;

        // Save posts from the next page
        allPosts = [...allPosts, ...posts];
      }
    } catch (error) {
      console.error("Error retrieving posts:", error);
    }

    allPosts?.map((post) => {
      results.push({
        loc: post?.link.replace(BLOG_BASE_URL, process.env.SITE_URL + "/blog"),
        lastmod: new Date().toISOString(),
      });
    });

    return results;
  }

  return getServerSideSitemapLegacy(ctx, await getAllPosts());
};

export default function Sitemap() {}
