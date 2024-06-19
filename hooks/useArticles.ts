import { getArticles, getSignleArticle } from "@/actions/actions";
import { useQuery } from "@tanstack/react-query";

export const useGetBlogs = () => {
  return useQuery({
    queryKey: ["getArticles"],
    queryFn: async () => {
      const articles = await getArticles();
      return articles;
    },
  });
};

export const useGetSingleBlog = (id: string) => {
  return useQuery({
    queryKey: ["getSingleBlog"],
    queryFn: async () => {
      const article = await getSignleArticle(id);
      return article;
    },
  });
};
