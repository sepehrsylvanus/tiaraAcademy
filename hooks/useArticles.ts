import { getArticles } from "@/actions/actions";
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
