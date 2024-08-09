"use client";

import { Button } from "@/components/ui/button";

import { Card } from "@/components/ui/card";
import { ChangeEvent, useState } from "react";
import { postWriting } from "@/actions/actions";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

const WriteHere = () => {
  const t = useTranslations("Writing");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [writing, setWriting] = useState<string>();
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files ? e.target.files[0] : null;
    setSelectedImage(imageFile);
  };

  let wordCountFirst = 0;
  if (writing) {
    wordCountFirst = writing.trim().split(/\s+/).length;
  }
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      const formData = new FormData(e.currentTarget);

      const sendingWritng = await postWriting(formData);

      toast.success(sendingWritng);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formInput =
    "bg-[#c6d9e6] text-lightText px-2 py-2 rounded-md outline-none";
  return (
    <div className=" pb-10 md:pb-5">
      <Card className="w-[20rem] sm:w-[25rem] md:w-[40rem] lg:w-[50rem] p-4 bg-extraText text-lightPrime mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
          <p className="h3 text-center">{t("description")}</p>

          <input
            required
            className="formInput w-full py-4"
            name="name"
            placeholder={t("name")}
          />

          <input
            required
            className="formInput w-full py-4"
            name="subject"
            placeholder={t("subject")}
          />
          <input
            id="writingImg"
            type="file"
            name="image"
            style={{ display: "none" }}
            onChange={handleImageChange}
            accept=".png"
          />
          <label htmlFor="writingImg" className="formInput w-full py-4">
            {selectedImage?.name && "Chosen => "}
            {` ${selectedImage?.name || t("notChosen")}`}
          </label>

          <textarea
            required
            rows={5}
            className="formInput w-full py-4 resize-none"
            placeholder={t("writing")}
            value={writing}
            onChange={(e) => setWriting(e.target.value)}
            name="writing"
          />
          <p className="text-white">{wordCountFirst} / 250</p>

          {loading ? (
            <Button disabled>
              <CircularProgress
                sx={{ color: "white", transform: "scale(.7)" }}
              />
            </Button>
          ) : (
            <Button type="submit">{t("submit")}</Button>
          )}
        </form>
      </Card>
    </div>
  );
};

export default WriteHere;
