import http, { BLOG_BASE_URL } from "@/services/http-service";
import { BaseProps } from "@/types";
import { AxiosResponse } from "axios";

export type FetchBlogPostServiceProps = BaseProps & {
  _embed?: boolean;
  slug?: string;
  /**
   * @description id of category
   */
  categories?: number | number[];
  _fields?: string | string[];
};

type FetchBlogPostsService = (
  params?: FetchBlogPostServiceProps
) => Promise<AxiosResponse<BlogPost[]>>;

// Function to fetch WordPress blog posts
export const fetchBlogPosts: FetchBlogPostsService = (params) => {
  return http.get("wp-json/wp/v2/posts", { baseURL: BLOG_BASE_URL, params });
};

type FetchBlogCategoriesService = (
  params?: FetchBlogPostServiceProps
) => Promise<AxiosResponse<BlogPost[]>>;

export const fetchBlogCategories: FetchBlogCategoriesService = (params) => {
  return http.get("wp-json/wp/v2/categories", {
    baseURL: BLOG_BASE_URL,
    params,
  });
};

type FetchRankMathHeadServiceProps = {
  /**
   * exclude base_url/ and give the rest (category/post_slug)
   */
  url: string;
};

type FetchRankMathHeadService = (
  params: FetchRankMathHeadServiceProps
) => Promise<AxiosResponse<RankMathSEO>>;

export const fetchRankMathHead: FetchRankMathHeadService = (params) => {
  return http.get("wp-json/rankmath/v1/getHead", {
    baseURL: BLOG_BASE_URL,
    params: { url: BLOG_BASE_URL + "/" + encodeURIComponent(params.url) },
  });
};

export const getBlogPaginationData = (
  response: AxiosResponse<any>
): {
  totalItems: number;
  totalPages: number;
} => {
  const totalItems = response?.headers["x-wp-total"];
  const totalPages = response?.headers["x-wp-totalpages"];

  return { totalItems, totalPages };
};

export const getBlogFeaturedImage = (blog: BlogPost, size = "large") => {
  const founded = blog._embedded?.["wp:featuredmedia"].find(
    (item) => item.id === blog.featured_media
  );
  if (founded && founded.media_details.sizes?.[size]?.source_url) {
    return founded.media_details.sizes?.[size]?.source_url;
  } else {
    return `/assets/imgs/banner/iran-map.png`;
  }
};

export const getBlogCategory = (blog: BlogPost) => {
  return blog._embedded?.["wp:term"][0][0]?.name ?? "";
};

export const getBlogCategorySlug = (blog: BlogPost) => {
  return blog._embedded?.["wp:term"][0][0]?.slug ?? "";
};

export const getEstimatedReadingTime = (
  html: string,
  wordsPerMinute: number = 200
): number => {
  // Remove HTML tags to extract plain text
  const plainText = html.replace(/<[^>]+>/g, "");

  // Split text into words and calculate the total number of words
  const words = plainText.trim().split(/\s+/);
  const wordCount = words.length;

  // Calculate estimated reading time in minutes
  const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);

  return readingTimeMinutes;
};
