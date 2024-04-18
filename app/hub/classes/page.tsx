"use client";
import React, { useEffect, useState } from "react";
import styles from "./classes.module.css";
import { Divider, FormControl, IconButton, MenuItem } from "@mui/material";
import ClassIcon from "@mui/icons-material/Class";
import SchoolIcon from "@mui/icons-material/School";
import { CustomClassTextField } from "./styledComponents";

import { Class } from "@/utils/types";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import CustomHamburger from "@/components/hamburger/CustomHamburger";

import Link from "next/link";

import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Meteors } from "@/components/ui/meteors";
import axios from "axios";
import { toast } from "react-toastify";
const page = () => {
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState();
  const searchParams = useSearchParams();

  useEffect(() => {
    const classes = axios
      .get("/api/classes")
      .then((res) => {
        setClasses(res.data);
        console.log(res.data);
      })
      .catch((e) => toast.error(e.response.data.error));
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

  const isButtonDisabled = !classNameInput && !teacherNameInput;

  const flatClasses: Class[] = [];

  const filterData = (data: FormInputs) => {
    const { className, teacherName } = data;

    const classNameToFilter = className?.split(" ").join("").toLowerCase();

    const teacherNameToFilter = teacherName?.split(" ").join("").toLowerCase();

    const result = flatClasses.filter((item) => {
      const lowerTitle = item.title.split(" ").join("").toLowerCase();
      const lowerTeacher = item.classInstructors[0].instructor.name
        .split(" ")
        .join("")
        .toLowerCase();

      if (classNameToFilter && teacherNameToFilter) {
        return (
          lowerTitle.startsWith(classNameToFilter) &&
          lowerTeacher === teacherNameToFilter
        );
      } else if (classNameToFilter) {
        return lowerTitle.startsWith(classNameToFilter);
      } else if (teacherNameToFilter) {
        return lowerTeacher === teacherNameToFilter;
      }
    });

    console.log({ result });
    setFilteredClasses(result);
  };

  // useEffect(() => {
  //   if (searchParams) {
  //     const result = filteredClasses
  //   }
  // }, []);

  // END FILTER DATA

  return (
    <div className={styles.container}>
      <div className="ml-auto z-10 fixed top-0 right-0 md:hidden bg-white  rounded-md m-2">
        <CustomHamburger navbar={false} sidebar={true} />
      </div>
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
                    <MenuItem value="{item}">Heelo</MenuItem>
                  </CustomClassTextField>
                )}
              />
            </FormControl>
          </div>

          <Button
            onClick={handleSubmit(filterData)}
            className=" bg-lightText !text-lightPrime text- sm:self-end sm:w-fit"
            disabled={isButtonDisabled}
          >
            Filter
          </Button>
        </div>
      </div>
      <Divider sx={{ margin: "1em 0" }} />
      <div className={styles.classesBody}>
        {loading ? (
          <>
            <Skeleton className="w-[261px] h-[366px] rounded-md" />
            <Skeleton className="w-[261px] h-[366px] rounded-md" />
            <Skeleton className="w-[261px] h-[366px] rounded-md" />
            <Skeleton className="w-[261px] h-[366px] rounded-md" />
            <Skeleton className="w-[261px] h-[366px] rounded-md" />
            <Skeleton className="w-[261px] h-[366px] rounded-md" />
            <Skeleton className="w-[261px] h-[366px] rounded-md" />
            <Skeleton className="w-[261px] h-[366px] rounded-md" />
          </>
        ) : (
          <p>Class</p>
        )}
      </div>
    </div>
  );
};

export default page;
