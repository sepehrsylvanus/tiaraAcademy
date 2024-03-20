import { z } from "zod";
export const pdfFormSchema = z.object({
  band: z.string().min(1),
  writing: z.string().min(10, { message: "Realy?! This short?!" }),
});

export const defaultPdfValues = {
  writing: "",
};
