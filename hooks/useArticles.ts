import { getArticles, getSignleArticle, makeItTrend } from "@/actions/actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export const useChangeTrend = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["toggleTrend"],
    mutationFn: async (id: string) => {
      makeItTrend(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getArticles"] });
    },
    onError: (err) => err,
  });
};
