"use client";
import { getToken, retieveUsers, verifyToken } from "@/actions/actions";
import { User } from "@/utils/types";
import { Avatar, Divider } from "@mui/material";

import React, { useEffect, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import { getSingleUser } from "@/actions/userActions";
import Link from "next/link";
type DetailsProps = {
  user: User;
};
const Colleagues = (details: DetailsProps) => {
  const [justTeachers, setJustTeachers] = useState<User[]>();
  const [itemsToShow, setItemsToShow] = useState(2);

  const handleViewMore = () => {
    setItemsToShow(itemsToShow + 2);
  };

  useEffect(() => {
    const getColleagues = async () => {
      const allUsers = await retieveUsers();
      const justTeachers = await allUsers
        .filter(
          (user) => user.role === "teacher" || user.role === "adminTeacher"
        )
        .filter((item) => item.id !== details.user.id);

      setJustTeachers(justTeachers);
    };
    getColleagues();
  }, []);

  return (
    <div className="blogsCard shadow-lg p-3 mr-3 bg-[#c6d9e6] rounded-md mt-4 space-y-4">
      {justTeachers?.slice(0, itemsToShow).map((teacher) => (
        <div key={teacher.id} className="eachBlog flex justify-between">
          <div className="flex items-center gap-7">
            <Avatar sx={{ width: 50, height: 50 }} />
            <p className=" font-semibold">{`${teacher.fName} ${teacher.lName}`}</p>
          </div>

          <div className=" w-fit flex items-center gap-3 ml-auto">
            <Link
              href={`/hub/teachers/${teacher.id}`}
              className=" text-white  bg-[#4B5362] p-1 transition hover:bg-[#6f7b90]"
            >
              <ArrowForwardIcon />
            </Link>
            <div>
              <CloseIcon />
            </div>
          </div>
        </div>
      ))}

      {justTeachers && itemsToShow < justTeachers.length && (
        <>
          <Divider sx={{ border: "1px solid #a4b0be", margin: "1em 0" }} />
          <button
            onClick={handleViewMore}
            className="p-2 text-white font-bold bg-[#4B5362] transition hover:bg-[#6f7b90]"
          >
            View More
          </button>
        </>
      )}
    </div>
  );
};

export default Colleagues;
