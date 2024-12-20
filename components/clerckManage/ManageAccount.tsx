"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { Separator } from "@/components/ui/separator";

import SettingsIcon from "@mui/icons-material/Settings";

import {
  useAddEmail,
  useAddPhone,
  useGetCurrentUser,
  useRemoveEmail,
  useRemovePhone,
  useRemoveProf,
  useUpdateUser,
} from "@/hooks/useGetUsers";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { Avatar, CircularProgress } from "@mui/material";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import AddIcon from "@mui/icons-material/Add";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";

const ManageAccount = () => {
  const { data: currentUser } = useGetCurrentUser();
  const { mutate: removePic, isPending: pRemoveP } = useRemoveProf();
  const { mutate: addEmail } = useAddEmail();
  const { mutate: removeEmail, data: rEmailRes } = useRemoveEmail();
  const { mutate, isPending: pUpdateUser } = useUpdateUser();
  const { mutate: addPhone } = useAddPhone();
  const { mutate: removePhone } = useRemovePhone();

  const [openEditProf, setOpenEditProf] = useState(false);
  const [openAddEmail, setOpenAddEmail] = useState(false);
  const [openAddPhone, setOpenAddPhone] = useState(false);
  const [profilePicture, setProfilePicture] = useState<File>();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const t = useTranslations("ClerkPanel");

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    setProfilePicture(e.target.files?.[0]);
  };

 
  useEffect(() => {
    if (profilePicture) {
      const formData = new FormData();
      
      formData.set("profPic", profilePicture!);
      mutate(formData);
    }
  }, [profilePicture]);

  async function updateProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutate(formData);
    setOpenEditProf(false);
  }

  return (
    <Dialog>
      <DialogTrigger
        className="bg-white shadow-sm
  shadow-slate-400 transition hover:ring-4 hover:ring-slate-400 hover:text-black text-black rounded-xl text-[11px] py-[2px] px-4 flex items-center gap-1"
      >
        <SettingsIcon sx={{ width: ".8em" }} /> {t("manageAccount")}
      </DialogTrigger>
      <DialogContent className="p-0 w-[95%] mx-auto bg-[#F7F7F7] rounded-lg flex flex-col gap-0 ">
        <div className="container bg-white rounded-md shadow-2xl  h-[550px] overflow-y-scroll">
          <h2 className="mt-8 md:text-xl">{t("profileDetails")}</h2>
          <Separator className="my-4" />

          <div>
            <p className="text-xl mb-4">{t("profile")}</p>
            <div
              className={`flex justify-around gap-6 items-center transition-all duration-300 ${
                openEditProf
                  ? "opacity-0 invisible absolute "
                  : "opacity-100 visible static"
              }`}
              style={{ transition: "opacity 0.3s, visibility 0.3s" }}
            >
              <Avatar src={currentUser?.image ?? ""} />

              <p>{`${currentUser?.fName} ${currentUser?.lName}`}</p>
              <p
                className="text-extraText cursor-pointer"
                onClick={() => setOpenEditProf(true)}
              >
                {t("updateProfile")}
              </p>
            </div>

            <div
              className={`p-5 border border-gray-200 shadow-md ${
                !openEditProf
                  ? "opacity-0 invisible absolute "
                  : "opacity-100 visible static"
              }`}
              style={{ transition: "opacity 0.3s, visibility 0.3s" }}
            >
              <p className="font-semibold mb-4">{t("updateProfile")}</p>
              <form onSubmit={updateProfile}>
                <div className="flex gap-5">
                  <Avatar src={currentUser?.image ?? ""} />

                  <div className="flex flex-col">
                    <div className="flex gap-4 mb-2">
                      {pUpdateUser ? (
                        <label className="bg-transparent hover:bg-transparent text-gray-400 border border-gray-200 shadow-md hover:shadow-xl hover:text-gray-400 grid place-content-center px-2 rounded-md ">
                          <CircularProgress sx={{ color: "gray" }} />
                        </label>
                      ) : (
                        <label
                          htmlFor="profPic"
                          className="bg-transparent hover:bg-transparent text-gray-400 border border-gray-200 shadow-md hover:shadow-xl hover:text-gray-400 grid place-content-center px-2 rounded-md"
                        >
                          {t("upload")}
                        </label>
                      )}
                      <input
                        type="file"
                        name="profPic"
                        id="profPic"
                        className="hidden"
                        onChange={handleImage}
                        accept="image/png, image/jpg, image/jpeg"
                      />
                      {pRemoveP ? (
                        <Button
                          className="text-red-500 hover:text-red-500"
                          variant="ghost"
                          type="button"
                        >
                          <CircularProgress className="text-red-500" />
                        </Button>
                      ) : (
                        <Button
                          className="text-red-500 hover:text-red-500"
                          variant="ghost"
                          onClick={() => removePic()}
                          type="button"
                        >
                          {t("remove")}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <div>
                    <p>{t("firstName")}</p>
                    <Input name="firstName" />
                  </div>
                  <div>
                    <p>{t("lastName")}</p>
                    <Input name="lastName" />
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-4">
                  <Button
                    variant="ghost"
                    onClick={() => setOpenEditProf(false)}
                    type="button"
                  >
                    {t("cancel")}
                  </Button>
                  <Button className="hover:bg-extraText" type="submit">
                    {t("save")}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          <Separator className="my-4" />
          <section>
            <p className="text-xl">{t("emailAddresses")}</p>
            <div
              className={`flex flex-col justify-between items-center md:items-start ${
                openAddEmail
                  ? "opacity-0 invisible absolute "
                  : "opacity-100 visible static"
              }`}
              style={{ transition: "opacity 0.3s, visibility 0.3s" }}
            >
              <div className="flex flex-col w-full">
                <div className="flex items-center md:w-full gap-2">
                  <p className="flex items-center text-[13px] gap-2 ml-3 mt-3">
                    {currentUser?.email}{" "}
                    <span className="bg-[#ededed] rounded-sm shadow-2xl shadow-black p-1">
                      {t("primary")}
                    </span>
                  </p>
                </div>
                <div className="flex flex-col">
                  {currentUser?.additionalEmails.map((email) => (
                    <div
                      key={email}
                      className="flex items-center justify-between gap-2"
                    >
                      <p className="flex items-center text-[13px] gap-2 ml-3 mt-3">
                        {email}
                      </p>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <div className="relative top-1 h-full">
                            <MoreHorizIcon className="opacity-20" />
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-fit relative right-[2em] p-2">
                          <p
                            className="text-red-500 cursor-pointer z-20"
                            onClick={() => {
                              removeEmail(email);
                            }}
                          >
                            {t("removeEmail")}
                          </p>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p
              className={`text-extraText flex items-center gap-2 ml-3 mt-6 cursor-pointer ${
                openAddEmail
                  ? "opacity-0 invisible absolute "
                  : "opacity-100 visible static"
              }`}
              onClick={() => setOpenAddEmail(true)}
              style={{ transition: "opacity 0.3s, visibility 0.3s" }}
            >
              <AddIcon /> {t("addEmail")}
            </p>

            <div
              className={`p-5 border border-gray-200 shadow-md ${
                !openAddEmail
                  ? "opacity-0 invisible absolute "
                  : "opacity-100 visible static"
              } mt-4`}
              style={{ transition: "opacity 0.3s, visibility 0.3s" }}
            >
              <p className="font-semibold mb-1">{t("addEmail")}</p>

              <p className="text-gray-500 text-sm">{t("emailDescription")}</p>

              <div className="  mt-6 w-full">
                <div>
                  <p>{t("Email address")}</p>
                  <Input onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-4">
                <Button variant="ghost" onClick={() => setOpenAddEmail(false)}>
                  {t("cancel")}
                </Button>
                <Button
                  className="hover:bg-extraText"
                  onClick={() => {
                    addEmail(email);
                    setOpenAddEmail(false);
                  }}
                >
                  {t("add")}
                </Button>
              </div>
            </div>
          </section>

          <Separator className="my-4" />

          <section className="mb-4 ">
            <p className="text-xl">{t("phoneNumbers")}</p>
            <div
              className={`flex justify-between items-center ${
                openAddEmail
                  ? "opacity-0 invisible absolute "
                  : "opacity-100 visible static"
              } flex flex-col`}
              style={{ transition: "opacity 0.3s, visibility 0.3s" }}
            >
              <div className=" flex items-center justify-between w-full">
                <p className="flex items-center  text-[13px] gap-2 ml-3 mt-3">
                  {currentUser?.pNumber}
                  <span className="bg-[#ededed] rounded-sm shadow-2xl shadow-black p-1">
                    {t("primary")}
                  </span>
                </p>
              </div>

              {currentUser?.addintionalPNumbers.map((phone) => (
                <div
                  key={phone}
                  className="flex justify-between  items-center w-full"
                >
                  <p className="flex items-center  text-[13px] gap-2 ml-3 mt-3">
                    {phone}
                  </p>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <div className="relative top-1 h-full">
                        <MoreHorizIcon className="opacity-20" />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-fit relative right-[2em] p-2">
                      <p
                        className="text-red-500 cursor-pointer z-20"
                        onClick={() => {
                          removePhone(phone);
                        }}
                      >
                        {t("removePhone")}
                      </p>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>

            <p
              className={`text-extraText flex items-center gap-2 ml-3 mt-6 cursor-pointer ${
                openAddPhone
                  ? "opacity-0 invisible absolute "
                  : "opacity-100 visible static"
              }`}
              onClick={() => setOpenAddPhone(true)}
              style={{ transition: "opacity 0.3s, visibility 0.3s" }}
            >
              <AddIcon /> {t("addPhoneNumber")}
            </p>

            <div
              className={`p-5 border border-gray-200 shadow-md ${
                !openAddPhone
                  ? "opacity-0 invisible absolute "
                  : "opacity-100 visible static"
              } mt-4`}
              style={{ transition: "opacity 0.3s, visibility 0.3s" }}
            >
              <p className="font-semibold mb-1 ">{t("addPhoneNumber")}</p>

              <p className="text-gray-500 text-sm">{t("phoneDescription")}</p>

              <div className="  mt-6 w-full">
                <div>
                  <p>{t("phoneNumber")}</p>
                  <Input onChange={(e) => setPhone(e.target.value)} />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-4">
                <Button variant="ghost" onClick={() => setOpenAddPhone(false)}>
                  Cancel
                </Button>
                <Button
                  className="hover:bg-extraText"
                  onClick={() => {
                    addPhone(phone);
                    setOpenAddPhone(false);
                  }}
                >
                  {t("add")}
                </Button>
              </div>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManageAccount;
