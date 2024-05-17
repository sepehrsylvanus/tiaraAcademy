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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getToken } from "@/actions/actions";
import { getSingleUser } from "@/actions/userActions";
import { Axios } from "@/utils/axiosIn";

const Classes = () => {
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState<Class[]>();
  const [filteredClasses, setFilteredClasses] = useState(classes);
  const [teachersname, setTeachersname] = useState<string[]>();
  const [currentUser, setCurrentUser] = useState<User>();
  useEffect(() => {}, [teachersname]);

  const searchParams = useSearchParams();
  const teacherParam = searchParams.get("teacher");

  useEffect(() => {}, [classes]);

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

  useEffect(() => {
    Axios.get("/classes")
      .then((res) => {
        setClasses(res.data.classes);
        setFilteredClasses(res.data.classes);

        const teachersNameSet: Set<string> = new Set();
        res.data.classes.forEach((item: Class) => {
          const fullName = `${item.creator.fName} ${item.creator.lName}`;
          teachersNameSet.add(fullName);
        });

        const uniqueTeachersName: string[] = Array.from(teachersNameSet);

        setTeachersname(uniqueTeachersName);
        if (teacherParam) {
          const filterVal = teacherParam.split("-").join("").toLowerCase();

          const classes: Class[] = res.data.classes;
          const result = classes.filter((eachClass) =>
            `${eachClass.creator.fName}${eachClass.creator.lName}`
              .toLowerCase()
              .startsWith(filterVal)
          );

          setFilteredClasses(result);
        }
        setLoading(false);
      })
      .catch((e) => toast.error(e.response.data.error))
      .finally(() => {
        setLoading(false);
      });
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

  const filterData = (data: FormInputs) => {
    const { className, teacherName } = data;

    const classFilterValue = className.split(" ").join("").toLowerCase();
    if (className && teacherName) {
      const result = classes?.filter((eachClass) => {
        const classToFilter = eachClass.title.split(" ").join("").toLowerCase();
        const teacherToFilter =
          `${eachClass.creator.fName} ${eachClass.creator.lName}`
            .split(" ")
            .join("")
            .toLowerCase();

        return (
          classToFilter.startsWith(classFilterValue) &&
          teacherToFilter === teacherName
        );
      });

      setFilteredClasses(result);
    } else if (className) {
      const result = classes?.filter((eachClass) => {
        const classToFilter = eachClass.title.split(" ").join("").toLowerCase();

        return classToFilter.startsWith(classFilterValue);
      });
      setFilteredClasses(result);
    } else if (teacherName) {
      const result = classes?.filter((eachClass) => {
        const teacherToFilter =
          `${eachClass.creator.fName} ${eachClass.creator.lName}`
            .split(" ")
            .join("")
            .toLowerCase();

        return teacherToFilter === teacherName;
      });
      setFilteredClasses(result);
    } else {
      setFilteredClasses(classes);
    }
  };

  // useEffect(() => {
  //   if (searchParams) {
  //     const result = filteredClasses
  //   }
  // }, []);

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
                    {teachersname?.map((eachName) => (
                      <MenuItem
                        value={eachName.split(" ").join("").toLowerCase()}
                      >
                        {eachName}
                      </MenuItem>
                    ))}
                  </CustomClassTextField>
                )}
              />
            </FormControl>
          </div>

          <Button
            onClick={handleSubmit(filterData)}
            className=" bg-lightText !text-lightPrime text- sm:self-end sm:w-fit"
          >
            Filter
          </Button>
        </div>
      </div>
      <Divider sx={{ margin: "1em 0" }} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
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
        ) : filteredClasses ? (
          filteredClasses?.map((eachClass) => {
            let days = eachClass.days.join(" / ");

            return (
              <Card key={eachClass.id} className="text-center ">
                <CardHeader>
                  <CardTitle>{eachClass.title}</CardTitle>
                </CardHeader>
                <CardContent className=" relative overflow-hidden">
                  <Meteors />
                  <div className="flex items-center justify-around">
                    <p>{`${eachClass.creator.fName} ${eachClass.creator.lName}`}</p>
                    <p>{eachClass.price}</p>
                    <Chip label={eachClass.type} />
                  </div>

                  <p className=" font-semibold mt-2">
                    {days || "There is no dedicated day for this class"}
                  </p>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  <Link
                    href={`/hub/classes/${eachClass.id}`}
                    className="w-full"
                  >
                    <Button className="w-full">Join</Button>
                  </Link>
                  {(currentUser?.role.includes("admin") ||
                    currentUser?.role.includes("adminTeacher")) && (
                    <p
                      className=" text-lg  md:text-base md:hover:text-lg"
                      onClick={() => copyToClipboard(eachClass.id)}
                    >
                      {eachClass.id}
                    </p>
                  )}
                </CardFooter>
              </Card>
            );
          })
        ) : (
          <p>There is an error in server</p>
        )}
      </div>
    </div>
  );
};

export default Classes;
