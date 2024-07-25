"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { Separator } from "@/components/ui/separator";

import SettingsIcon from "@mui/icons-material/Settings";

import MenuIcon from "@mui/icons-material/Menu";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, CircularProgress } from "@mui/material";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import AddIcon from "@mui/icons-material/Add";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "react-toastify";

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
  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    setProfilePicture(e.target.files?.[0]);
  };

  useEffect(() => {
    const formData = new FormData();
    console.log(profilePicture);
    console.log(formData);
    formData.set("profPic", profilePicture!);
    mutate(formData);
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
        <SettingsIcon sx={{ width: ".8em" }} /> Manage account
      </DialogTrigger>
      <DialogContent className="p-0 w-[95%] mx-auto bg-[#F7F7F7] rounded-lg flex flex-col gap-0">
        <div className="flex gap-3 items-center px-6 py-4">
          <MenuIcon /> <h2>Account</h2>
        </div>

        <div className="container bg-white rounded-md shadow-2xl  h-[550px] overflow-y-scroll">
          <h2 className="mt-8">Profile details</h2>
          <Separator className="my-4" />

          <div>
            <p className="text-xl mb-4">Profile</p>
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
                Update profile
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
              <p className="font-semibold mb-4">Update profile</p>
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
                          Upload
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
                          Remove
                        </Button>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm">
                      Recomended size 1:1 up to 10MB
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <div>
                    <p>First name</p>
                    <Input name="firstName" />
                  </div>
                  <div>
                    <p>Last name</p>
                    <Input name="lastName" />
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-4">
                  <Button
                    variant="ghost"
                    onClick={() => setOpenEditProf(false)}
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Button className="hover:bg-extraText" type="submit">
                    Save
                  </Button>
                </div>
              </form>
            </div>
          </div>

          <Separator className="my-4" />
          <section>
            <p className="text-xl">Email addresses</p>
            <div
              className={`flex flex-col justify-between items-center ${
                openAddEmail
                  ? "opacity-0 invisible absolute "
                  : "opacity-100 visible static"
              }`}
              style={{ transition: "opacity 0.3s, visibility 0.3s" }}
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <p className="flex items-center text-[13px] gap-2 ml-3 mt-3">
                    {currentUser?.email}{" "}
                    <span className="bg-[#ededed] rounded-sm shadow-2xl shadow-black p-1">
                      Primary
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
                            Remove email
                          </p>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p
              className={`text-extraText flex items-center gap-2 ml-3 mt-6 ${
                openAddEmail
                  ? "opacity-0 invisible absolute "
                  : "opacity-100 visible static"
              }`}
              onClick={() => setOpenAddEmail(true)}
              style={{ transition: "opacity 0.3s, visibility 0.3s" }}
            >
              <AddIcon /> Add email address
            </p>

            <div
              className={`p-5 border border-gray-200 shadow-md ${
                !openAddEmail
                  ? "opacity-0 invisible absolute "
                  : "opacity-100 visible static"
              } mt-4`}
              style={{ transition: "opacity 0.3s, visibility 0.3s" }}
            >
              <p className="font-semibold mb-1">Add email address</p>

              <p className="text-gray-500 text-sm">
                An email containing a verification code will be sent to this
                email address.
              </p>

              <div className="  mt-6 w-full">
                <div>
                  <p>Email address</p>
                  <Input onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-4">
                <Button variant="ghost" onClick={() => setOpenAddEmail(false)}>
                  Cancel
                </Button>
                <Button
                  className="hover:bg-extraText"
                  onClick={() => {
                    addEmail(email);
                    setOpenAddEmail(false);
                  }}
                >
                  Add
                </Button>
              </div>
            </div>
          </section>

          <Separator className="my-4" />

          <section className="mb-4 ">
            <p className="text-xl">Phone numbers</p>
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
                    Primary
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
                        Remove phone
                      </p>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>

            <p
              className={`text-extraText flex items-center gap-2 ml-3 mt-6 ${
                openAddPhone
                  ? "opacity-0 invisible absolute "
                  : "opacity-100 visible static"
              }`}
              onClick={() => setOpenAddPhone(true)}
              style={{ transition: "opacity 0.3s, visibility 0.3s" }}
            >
              <AddIcon /> Add phone number
            </p>

            <div
              className={`p-5 border border-gray-200 shadow-md ${
                !openAddPhone
                  ? "opacity-0 invisible absolute "
                  : "opacity-100 visible static"
              } mt-4`}
              style={{ transition: "opacity 0.3s, visibility 0.3s" }}
            >
              <p className="font-semibold mb-1">Add phone number</p>

              <p className="text-gray-500 text-sm">
                A text message containing a verification code will be sent to
                this phone number. Message and data rates may apply.
              </p>

              <div className="  mt-6 w-full">
                <div>
                  <p>Phone number</p>
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
                  Add
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
