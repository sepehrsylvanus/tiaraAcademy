import { getClasses } from "@/actions/actions";
import { editClass } from "@/actions/class";
import { Class } from "@/utils/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { getMessages } from "next-intl/server";
import { toast } from "react-toastify";

export function useGetClasses() {
  return useQuery({
    queryKey: ["getClasses"],
    queryFn: async () => {
      const classes = (await getClasses()) as Class[];
      return classes;
    },
  });
}

export function useEditClass() {
  const queryClient = useQueryClient();
  const t = useTranslations("Class");
  return useMutation({
    mutationFn: async (data: FormData) => {
      const id = data.get("id") as string;
      const title = data.get("title") as string;
      const price = data.get("price") as string;
      const discount = data.get("discount") as string;
      console.log(id, title, price, discount);
      await editClass(id, title, price, discount);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getClasses"] });
      toast.success(t("succsessfulEdit"));
    },
  });
}
