"use client";

import { faWritingIcons, writingIcons } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import { useGetMyCharge, usePostWriting } from "@/hooks/useWriting";
import Image from "next/image";
import WritingCharge from "@/components/writingCharge/WritingCharge";
import { useGetUser } from "@/hooks/useUsers";
import { getToken } from "@/actions/actions";

const Links = () => {
  const locale = useLocale();
  const [pdfFile, setPdfFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [openUploadPDF, setOpenUploadPDF] = useState(false);
  const path = usePathname();
  const { data: myWritingCharge, isLoading: chargeLoading } = useGetMyCharge();
  const { data: currentUser, isLoading: currentUserLoading } = useGetUser();

  const { mutate: postWriting } = usePostWriting();
  const t = useTranslations("Writing");
  const tSideBar = useTranslations("SideBar");
  const handlePdfChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPdfFile(e.target.files[0]);
    }
  };
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);

      postWriting(formData);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setOpenUploadPDF(false);
    }
  };

  const writingChargeEmpty = myWritingCharge?.length === 0;
  const writingChargeRunOut = myWritingCharge?.[0]?.writingCharge === 0;
  const chargeAgain = writingChargeEmpty || writingChargeRunOut;
  if (!chargeLoading && !currentUserLoading) {
    if (currentUser && myWritingCharge) {
      return (
        <div className="flex flex-col">
          <div className="flex flex-col">
            {chargeAgain && (
              <p className="font-bold text-center mt-4">{t("notCharge")}</p>
            )}
            {chargeAgain && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-fit mt-4 mx-auto">
                    {t("chargeHere")}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <WritingCharge
                    user={currentUser}
                    currentCharge={myWritingCharge}
                  />
                </DialogContent>
              </Dialog>
            )}
          </div>
          <div
            className={` grid text-sm grid-cols-2 mx-auto justify-center justify-items-center gap-3 mt-4 transition sm:grid-cols-3 md:grid-cols-4  lg:relative ${
              locale === "en" ? "left-12" : "right-28"
            }`}
          >
            {locale === "en"
              ? writingIcons.map((writingIcon, index) => {
                  if (writingIcon.link) {
                    return (
                      <Link
                        key={index}
                        href={writingIcon.link}
                        className={
                          chargeAgain && index === 1
                            ? "opacity-50 pointer-events-none"
                            : ""
                        }
                      >
                        <div
                          className={` ${
                            path === writingIcon.link && "ring-1 ring-blue-800"
                          } hover:ring-1 hover:ring-blue-800 bg-slate-200 w-fit text-blue-800 font-bold rounded-md px-4 py-6`}
                        >
                          {writingIcon.title}
                        </div>
                      </Link>
                    );
                  } else {
                    return (
                      <>
                        <Dialog>
                          <DialogTrigger
                            disabled={chargeAgain}
                            className={` ${
                              myWritingCharge?.length > 0 ||
                              myWritingCharge[0]?.writingCharge === 0
                                ? "opacity-50"
                                : "hover:ring-1 hover:ring-blue-800"
                            }  bg-slate-200 w-fit text-blue-800 font-bold rounded-md px-4 py-6 `}
                          >
                            Upload One
                          </DialogTrigger>
                          <DialogContent className="py-10 bg-extraText">
                            <form
                              onSubmit={handleSubmit}
                              className="flex space-y-4 flex-col"
                            >
                              <input
                                id="writingFile"
                                type="file"
                                name="writingFile"
                                style={{ display: "none" }}
                                onChange={handlePdfChange}
                                accept=".pdf"
                              />
                              <label
                                htmlFor="writingFile"
                                className="formInput w-full py-4"
                              >
                                {pdfFile?.name && "Choosed => "}
                                {` ${pdfFile?.name || "Not chosen yet :)"}`}
                              </label>
                              {loading ? (
                                <Button disabled className="w-fit">
                                  <CircularProgress
                                    sx={{
                                      color: "white",
                                      transform: "scale(.7)",
                                    }}
                                  />
                                </Button>
                              ) : (
                                <Button type="submit" className="w-fit">
                                  Submit
                                </Button>
                              )}
                            </form>
                          </DialogContent>
                        </Dialog>
                      </>
                    );
                  }
                })
              : faWritingIcons.map((writingIcon, index) => {
                  if (writingIcon.link) {
                    return (
                      <Link
                        key={index}
                        href={writingIcon.link}
                        className={
                          chargeAgain && index === 1
                            ? "opacity-50 pointer-events-none"
                            : ""
                        }
                      >
                        <div
                          className={` ${
                            path === writingIcon.link && "ring-1 ring-blue-800"
                          } hover:ring-1 hover:ring-blue-800 bg-slate-200 w-fit text-blue-800 font-bold rounded-md px-4 py-6`}
                        >
                          {writingIcon.title}
                        </div>
                      </Link>
                    );
                  } else {
                    return (
                      <>
                        <Dialog
                          open={openUploadPDF}
                          onOpenChange={setOpenUploadPDF}
                        >
                          <DialogTrigger
                            disabled={chargeAgain}
                            className={`  bg-slate-200 w-fit text-blue-800 font-bold rounded-md px-4 py-6 ${
                              chargeAgain
                                ? "opacity-50"
                                : "hover:ring-1 hover:ring-blue-800"
                            }`}
                          >
                            تمرین خود را ارسال کنید
                          </DialogTrigger>
                          <DialogContent className="py-10 bg-extraText">
                            <form
                              onSubmit={handleSubmit}
                              className="flex space-y-4 flex-col"
                            >
                              <input
                                id="writingFile"
                                type="file"
                                name="writingFile"
                                style={{ display: "none" }}
                                onChange={handlePdfChange}
                                accept=".pdf"
                              />
                              <label
                                htmlFor="writingFile"
                                className="formInput w-full py-4"
                              >
                                {pdfFile?.name && "Choosed => "}
                                {` ${pdfFile?.name || t("notChosenYet")}`}
                              </label>
                              {loading ? (
                                <Button disabled className="w-fit">
                                  <CircularProgress
                                    sx={{
                                      color: "white",
                                      transform: "scale(.7)",
                                    }}
                                  />
                                </Button>
                              ) : (
                                <Button type="submit" className="w-fit">
                                  {t("submit")}
                                </Button>
                              )}
                            </form>
                          </DialogContent>
                        </Dialog>
                      </>
                    );
                  }
                })}
          </div>
        </div>
      );
    } else {
      return (
        <div className="relative">
          <div className="flex flex-col opacity-20 pointer-events-none">
            <div className="flex flex-col"></div>
            <div
              className={` grid text-sm grid-cols-2 mx-auto justify-center justify-items-center gap-3 mt-4 transition sm:grid-cols-3 md:grid-cols-4  lg:relative ${
                locale === "en" ? "left-12" : "right-28"
              }`}
            >
              {locale === "en"
                ? writingIcons.map((writingIcon, index) => {
                    if (writingIcon.link) {
                      return (
                        <Link key={index} href={writingIcon.link}>
                          <div
                            className={` ${
                              path === writingIcon.link &&
                              "ring-1 ring-blue-800"
                            } hover:ring-1 hover:ring-blue-800 bg-slate-200 w-fit text-blue-800 font-bold rounded-md px-4 py-6`}
                          >
                            {writingIcon.title}
                          </div>
                        </Link>
                      );
                    } else {
                      if (myWritingCharge) {
                        return (
                          <>
                            <Dialog>
                              <DialogTrigger
                                disabled={chargeAgain}
                                className={` ${
                                  myWritingCharge?.length > 0 ||
                                  myWritingCharge[0]?.writingCharge === 0
                                    ? "opacity-50"
                                    : "hover:ring-1 hover:ring-blue-800"
                                }  bg-slate-200 w-fit text-blue-800 font-bold rounded-md px-4 py-6 `}
                              >
                                Upload One
                              </DialogTrigger>
                              <DialogContent className="py-10 bg-extraText">
                                <form
                                  onSubmit={handleSubmit}
                                  className="flex space-y-4 flex-col"
                                >
                                  <input
                                    id="writingFile"
                                    type="file"
                                    name="writingFile"
                                    style={{ display: "none" }}
                                    onChange={handlePdfChange}
                                    accept=".pdf"
                                  />
                                  <label
                                    htmlFor="writingFile"
                                    className="formInput w-full py-4"
                                  >
                                    {pdfFile?.name && "Choosed => "}
                                    {` ${pdfFile?.name || "Not chosen yet :)"}`}
                                  </label>
                                  {loading ? (
                                    <Button disabled className="w-fit">
                                      <CircularProgress
                                        sx={{
                                          color: "white",
                                          transform: "scale(.7)",
                                        }}
                                      />
                                    </Button>
                                  ) : (
                                    <Button type="submit" className="w-fit">
                                      Submit
                                    </Button>
                                  )}
                                </form>
                              </DialogContent>
                            </Dialog>
                          </>
                        );
                      }
                    }
                  })
                : faWritingIcons.map((writingIcon, index) => {
                    if (writingIcon.link) {
                      return (
                        <Link
                          key={index}
                          href={writingIcon.link}
                          className={
                            chargeAgain && index === 1
                              ? "opacity-50 pointer-events-none"
                              : ""
                          }
                        >
                          <div
                            className={` ${
                              path === writingIcon.link &&
                              "ring-1 ring-blue-800"
                            } hover:ring-1 hover:ring-blue-800 bg-slate-200 w-fit text-blue-800 font-bold rounded-md px-4 py-6`}
                          >
                            {writingIcon.title}
                          </div>
                        </Link>
                      );
                    } else {
                      return (
                        <>
                          <Dialog
                            open={openUploadPDF}
                            onOpenChange={setOpenUploadPDF}
                          >
                            <DialogTrigger
                              disabled={chargeAgain}
                              className={`  bg-slate-200 w-fit text-blue-800 font-bold rounded-md px-4 py-6 ${
                                chargeAgain
                                  ? "opacity-50"
                                  : "hover:ring-1 hover:ring-blue-800"
                              }`}
                            >
                              تمرین خود را ارسال کنید
                            </DialogTrigger>
                            <DialogContent className="py-10 bg-extraText">
                              <form
                                onSubmit={handleSubmit}
                                className="flex space-y-4 flex-col"
                              >
                                <input
                                  id="writingFile"
                                  type="file"
                                  name="writingFile"
                                  style={{ display: "none" }}
                                  onChange={handlePdfChange}
                                  accept=".pdf"
                                />
                                <label
                                  htmlFor="writingFile"
                                  className="formInput w-full py-4"
                                >
                                  {pdfFile?.name && "Choosed => "}
                                  {` ${pdfFile?.name || t("notChosenYet")}`}
                                </label>
                                {loading ? (
                                  <Button disabled className="w-fit">
                                    <CircularProgress
                                      sx={{
                                        color: "white",
                                        transform: "scale(.7)",
                                      }}
                                    />
                                  </Button>
                                ) : (
                                  <Button type="submit" className="w-fit">
                                    {t("submit")}
                                  </Button>
                                )}
                              </form>
                            </DialogContent>
                          </Dialog>
                        </>
                      );
                    }
                  })}
            </div>
          </div>
          <p className="z-10  absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2  flex gap-4 items-center">
            {tSideBar("haveToLogin")}
            <Link href={"/sign-in"}>
              <Button>{tSideBar("login")}</Button>
            </Link>
          </p>
        </div>
      );
    }
  } else {
    return (
      <Image
        src={"/pageLoader.svg"}
        alt="Page Loader"
        width={100}
        height={100}
        className="mx-auto mt-4"
      />
    );
  }
};

export default Links;
