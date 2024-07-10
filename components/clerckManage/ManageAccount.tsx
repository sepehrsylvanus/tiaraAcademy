"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import SettingsIcon from "@mui/icons-material/Settings";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "../ui/button";
import { Avatar, Divider } from "@mui/material";
const ManageAccount = () => {
  return (
    <Dialog>
      <DialogTrigger
        className="bg-white shadow-sm
  shadow-slate-400 transition hover:ring-4 hover:ring-slate-400 hover:text-black text-black rounded-xl text-[11px] py-[2px] px-4 flex items-center gap-1"
      >
        <SettingsIcon sx={{ width: ".8em" }} /> Manage account
      </DialogTrigger>
      <DialogContent className="p-0 w-[90%] mx-auto bg-[#F7F7F7] rounded-lg flex flex-col top-[3em] fixed ">
        <div className="left rounded-lg pt-6 px-3 flex  gap-3">
          <h1 className="max-md:text-lg order-2">Account</h1>
          <p className="text-slate-300 mb-6 hidden lg:block">
            Manage your account info
          </p>
          <Drawer>
            <DrawerTrigger className="order-1">
              <MenuIcon />
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                <DrawerDescription>
                  This action cannot be undone.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          <div className="hidden lg:block">
            <p className="mb-2">
              <SupervisedUserCircleIcon className="mr-3" />
              Profile
            </p>
            <p>
              <VerifiedUserIcon className="mr-3" />
              Security
            </p>
          </div>
        </div>

        <div className="right bg-white ">
          <h3 className="my-6 ml-3">Profile details</h3>
          <Divider />
          {/* <p>Profile</p>
          <div className="flex justify-between">
            <div>
              <Avatar />
              <p>Mani</p>
            </div>
            <p>Update profile</p>
          </div> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManageAccount;
