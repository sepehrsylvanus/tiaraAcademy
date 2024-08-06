"use client";
import React, { useEffect, useState } from "react";
import styles from "./classes.module.css";
import {
  Chip,
  Divider,
  FormControl,
  IconButton,
  MenuItem,
} from "@mui/material";
import ClassIcon from "@mui/icons-material/Class";
import SchoolIcon from "@mui/icons-material/School";
import { CustomClassTextField } from "./styledComponents";

import { Class, User } from "@/utils/types";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";

import Link from "next/link";

import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Meteors } from "@/components/ui/meteors";
import { toast } from "react-toastify";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getToken, registerPlayList } from "@/actions/actions";
import { getSingleUser } from "@/actions/userActions";
import { Axios } from "@/utils/axiosIn";
import { useGetPlaylists } from "@/hooks/usePlayList";
import { useGetClasses } from "@/hooks/useClasses";
import { date } from "zod";
import { useGetTeacherNames } from "@/hooks/useUsers";

const Classes = () => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User>();

  const { data: classes, isLoading: classesLoading } = useGetClasses();
  const { data: playlists, isLoading } = useGetPlaylists();
  const { data: teachersName } = useGetTeacherNames();
  console.log(playlists);
  const [filteredClasses, setFilteredClasses] = useState(classes);
  const searchParams = useSearchParams();
  const teacherParam = searchParams.get("teacher");

  if (classes) {
    console.log(classes);
  }
  useEffect(() => {
    if (classes) {
      setFilteredClasses(classes);
    }
    const teachersName = classes?.map(
      (cls) => `${cls.teacher.fName} ${cls.teacher.lName}`
    );
  }, [classes]);
  useEffect(() => {
    console.log(filteredClasses);
  }, [filteredClasses]);

  const handleJoin = () => {
    toast.success("You successfully registered in this class");
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = await getToken()!;
      const currentUser = await getSingleUser(token?.value);
      if (currentUser) {
        setCurrentUser(currentUser);
      }
    };
    fetchUser();
  }, []);

  const teacherName = searchParams.get("teacher");
  const className = searchParams.get("className");

  // START FILTER DATA

  type FormInputs = {
    className: string;
    teacherName: string;
  };

  const { control, handleSubmit, watch } = useForm<FormInputs>({
    defaultValues: {
      className: searchParams.get("className") || "",
      teacherName: searchParams.get("teacher") || "",
    },
  });
  const classNameInput = watch("className", "");
  const teacherNameInput = watch("teacherName", "");

  useEffect(() => {
    console.log("here");
    if (classNameInput && teacherNameInput) {
      setFilteredClasses(
        classes?.filter(
          (cls) =>
            (cls.title.startsWith(classNameInput) &&
              cls.teacher.fName.startsWith(teacherNameInput)) ||
            cls.teacher.lName?.startsWith(teacherNameInput)
        )
      );
    } else if (classNameInput) {
      setFilteredClasses(
        classes?.filter((cls) => cls.title.startsWith(classNameInput))
      );
    } else if (teacherNameInput) {
      setFilteredClasses(
        classes?.filter(
          (cls) =>
            cls.teacher.fName.startsWith(teacherNameInput) ||
            cls.teacher.lName?.startsWith(teacherNameInput)
        )
      );
    } else {
      setFilteredClasses(classes);
    }
  }, [classNameInput, teacherNameInput]);

  // END FILTER DATA
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast("Copied to clipboard");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.classesHeader}>
        <div className={styles.titleContainer}>
          <h4 className="h3">Tiara Academy</h4>
          <h1 className="h1">All Classes</h1>
          <p>Here you can see all of available classes</p>
        </div>
        <div className={styles.searchBarContainer}>
          <div className={styles.eachSearchbar}>
            <IconButton>
              <ClassIcon />
            </IconButton>
            <Controller
              name="className"
              control={control}
              render={({ field }) => (
                <CustomClassTextField {...field} label="Class name" />
              )}
            />
          </div>
          <div className={styles.eachSearchbar}>
            <IconButton>
              <SchoolIcon />
            </IconButton>
            <FormControl fullWidth>
              <Controller
                name="teacherName"
                control={control}
                render={({ field }) => (
                  <CustomClassTextField
                    {...field}
                    select
                    variant="outlined"
                    label="Choose your teacher"
                  >
                    <MenuItem value="">Without filter</MenuItem>
                    {teachersName?.map((eachName, index) => (
                      <MenuItem key={index} value={eachName}>
                        {eachName}
                      </MenuItem>
                    ))}
                  </CustomClassTextField>
                )}
              />
            </FormControl>
          </div>
        </div>
      </div>
      <Divider sx={{ margin: "1em 0" }} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-[6em]">
        {classesLoading ? (
          <>
            <Skeleton className="w-full h-[250px] rounded-md" />
            <Skeleton className="w-full h-[250px] rounded-md" />
            <Skeleton className="w-full h-[250px] rounded-md" />
            <Skeleton className="w-full h-[250px] rounded-md" />
            <Skeleton className="w-full h-[250px] rounded-md" />
            <Skeleton className="w-full h-[250px] rounded-md" />
            <Skeleton className="w-full h-[250px] rounded-md" />
            <Skeleton className="w-full h-[250px] rounded-md" />
          </>
        ) : filteredClasses && playlists ? (
          <>
            {filteredClasses?.map((eachClass) => {
              let days = eachClass.days.join(" / ");
              console.log(eachClass.duration);
              return (
                <Card
                  key={eachClass.id}
                  className="text-center flex flex-col justify-between"
                >
                  <CardHeader>
                    <CardTitle>{eachClass.title}</CardTitle>
                  </CardHeader>
                  <CardContent className=" relative overflow-hidden">
                    <Meteors />
                    <div className="flex items-center justify-around gap-4">
                      <p>{`${eachClass.teacher!.fName} ${
                        eachClass.teacher?.lName
                      }`}</p>

                      <p>{eachClass.price}</p>
                      <div className="flex flex-col gap-2">
                        <Chip label={eachClass.type} />
                      </div>
                    </div>

                    <p className=" font-semibold mt-2">
                      {days || "There is no dedicated day for this class"}
                    </p>

                    {eachClass.duration.length > 0 && (
                      <p className="mt-2">
                        {`${eachClass.duration[0]} | ${eachClass.duration[1]}`}
                      </p>
                    )}
                    {eachClass.date && <p>{`${eachClass.date.getDay()}`}</p>}
                  </CardContent>
                  <CardFooter className="flex flex-col gap-2">
                    <Link
                      href={`/hub/classes/${eachClass.id}`}
                      className="w-full"
                    >
                      <Button className="w-full">Join</Button>
                    </Link>

                    {(currentUser?.role.includes("admin") ||
                      currentUser?.role.includes("adminTeacher") ||
                      currentUser?.role.includes("teacher")) && (
                      <p
                        className=" cursor-pointer text-lg  md:text-base md:hover:text-lg"
                        onClick={() => copyToClipboard(eachClass.id)}
                      >
                        {eachClass.id}
                      </p>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
            {playlists
              .filter((playlist) => playlist.type === "private")
              .map((playlist) => (
                <Card key={playlist.id} className="text-center ">
                  <CardHeader className="flex flex-col items-center">
                    <CardTitle>{playlist.title}</CardTitle>
                    <Chip label="Playlist" className="w-fit" />
                  </CardHeader>
                  <CardContent className=" relative overflow-hidden">
                    <Meteors />
                    <div className="flex items-center justify-around gap-4">
                      <p>{playlist.price}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-2">
                    <Link href={`#`} className="w-full">
                      <Button
                        className="w-full"
                        onClick={async () => {
                          const register = await registerPlayList(
                            playlist.title
                          );
                          if (register) {
                            toast.success(register);
                          } else {
                            toast.error(register);
                          }
                        }}
                      >
                        Join
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
          </>
        ) : (
          <p>There is an error in server</p>
        )}
      </div>
    </div>
  );
};

export default Classes;
