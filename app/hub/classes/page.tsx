"use client";
import React, { useEffect, useState } from "react";
import styles from "./classes.module.css";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  FormControl,
  IconButton,
  MenuItem,
} from "@mui/material";
import ClassIcon from "@mui/icons-material/Class";
import SchoolIcon from "@mui/icons-material/School";
import { CustomClassTextField } from "./styledComponents";
import { retrieveAllClasses, retrieveTeacherName } from "@/actions/actions";
import { Class } from "@/utils/types";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import CustomHamburger from "@/components/hamburger/CustomHamburger";

import Link from "next/link";

import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Meteors } from "@/components/ui/meteors";
const page = () => {
  const searchParams = useSearchParams();

  const teacherName = searchParams.get("teacher");
  const className = searchParams.get("className");
  const [classes, setClasses] = useState<Class[] | null>([]);
  const [teachersName, setTeachersName] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);
  const [filterDisable, setFilterDisable] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const teacherNames = await retrieveTeacherName();
      const allClasses = await retrieveAllClasses();

      setTeachersName(teacherNames);
      if (searchParams.size === 0) {
        setClasses(allClasses);
        setFilteredClasses(allClasses);
        setLoading(false);
      } else {
        const flatClasses: Class[] = [];
        allClasses.forEach((eachClass) => {
          if (eachClass.classInstructors.length > 1) {
            eachClass.classInstructors.forEach((eachClassInstructor) => {
              const flatClass = { ...eachClass };
              flatClass.classInstructors = [eachClassInstructor];
              flatClasses.push(flatClass);
            });
          } else {
            flatClasses.push(eachClass);
          }
          const result = flatClasses.filter(
            (item) =>
              item.classInstructors[0].instructor.name ===
                searchParams.get("teacher") &&
              item.title
                .toLowerCase()
                .startsWith(searchParams.get("className")!)
          );

          setFilteredClasses(result);
          setLoading(false);
        });
      }
    };
    fetchData();
  }, []);
  // START FILTER DATA

  type FormInputs = {
    className: string;
    teacherName: string;
  };

  const [filteredClasses, setFilteredClasses] = useState<Class[] | null>();

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
  {
    classes &&
      classes.map((eachClass: Class) => {
        if (eachClass.classInstructors.length > 1) {
          eachClass.classInstructors.forEach((item) => {
            const flatClass = { ...eachClass };
            flatClass.classInstructors = [item];
            flatClasses.push(flatClass);
          });
        } else {
          flatClasses.push(eachClass);
        }
      });
  }

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
  useEffect(() => {
    if (searchParams.size !== 0) {
      const result = flatClasses.filter(
        (eachClass) =>
          eachClass.classInstructors[0].instructor.name ===
            searchParams.get("teacher") &&
          eachClass.title === searchParams.get("className")
      );

      console.log(result);

      setFilteredClasses(result);
    }
  }, []);

  // useEffect(() => {
  //   if (searchParams) {
  //     const result = filteredClasses
  //   }
  // }, []);

  // END FILTER DATA

  return (
    <div className={styles.container}>
      <div className="ml-auto absolute top-0 right-0 md:hidden">
        <div className="block lg:hidden">
          <CustomHamburger navbar={false} sidebar={true} />
        </div>
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
                    {teachersName.map((item) => (
                      <MenuItem value={item}>{item}</MenuItem>
                    ))}
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
          filteredClasses?.map((eachClass) => {
            const hours = Math.floor(
              Number(eachClass.duration) / 1000 / 60 / 60
            );

            if (eachClass.classInstructors.length > 1) {
              return eachClass.classInstructors.map((clsWithTeacher) => (
                <Card
                  key={eachClass.id}
                  className={`${styles.eachClassCard} bg-extraBg text-lightPrime relative`}
                >
                  {eachClass.img && (
                    <CardMedia
                      title={eachClass.title}
                      sx={{ height: 150 }}
                      image={eachClass.img}
                    />
                  )}
                  <CardContent className={styles.eachCardContent}>
                    <div className={styles.classDetailsLeft}>
                      <h4>{eachClass.title}</h4>
                      <p>{clsWithTeacher.instructor.name}</p>
                      <h4>{`${(eachClass.price * 10)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} IRR`}</h4>
                    </div>
                    <div className={styles.classDetailsRight}>
                      <p>{`${hours > 0 ? hours + "hr" : ""} ${
                        (Number(eachClass.duration) / 1000 / 60) % 60
                      } m`}</p>
                    </div>
                  </CardContent>
                  <CardActions>
                    <div className="brownLinkLight">
                      <Link
                        className="text-lightPrime "
                        href={`/hub/classes/${eachClass.title
                          .toLowerCase()
                          .replace(
                            /\s+/g,
                            "-"
                          )}?teacher=${clsWithTeacher.instructor.name
                          .toLowerCase()
                          .replace(/\s+/g, "-")}&id=${eachClass.id}`}
                      >
                        Register
                      </Link>
                    </div>
                  </CardActions>
                  <Meteors number={20} />
                </Card>
              ));
            }
            if (eachClass.classInstructors.length === 1) {
              return (
                <Card
                  key={eachClass.id}
                  className={`${styles.eachClassCard} bg-extraBg text-lightPrime relative`}
                >
                  {eachClass.img && (
                    <CardMedia
                      title={eachClass.title}
                      sx={{ height: 150 }}
                      image={eachClass.img}
                    />
                  )}
                  <CardContent className={styles.eachCardContent}>
                    <div className={styles.classDetailsLeft}>
                      <h4>{eachClass.title}</h4>
                      <p>{eachClass.classInstructors[0].instructor.name}</p>
                      <h4>{`${(eachClass.price * 10)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} IRR`}</h4>
                    </div>
                    <div className={styles.classDetailsRight}>
                      <p>{`${hours > 0 ? hours + "hr" : ""} ${
                        (Number(eachClass.duration) / 1000 / 60) % 60
                      } m`}</p>
                    </div>
                  </CardContent>
                  <CardActions>
                    <div className="brownLinkLight">
                      <Link
                        className="text-lightPrime "
                        href={`/hub/classes/${eachClass.title
                          .toLowerCase()
                          .replace(
                            /\s+/g,
                            "-"
                          )}?teacher=${eachClass.classInstructors[0].instructor.name
                          .toLowerCase()
                          .replace(/\s+/g, "-")}&id=${eachClass.id}`}
                      >
                        Register
                      </Link>
                    </div>
                  </CardActions>
                  <Meteors number={20} />
                </Card>
              );
            }
            // return eachClass.classInstructors.map((teacher) => (

            // ));
          })
        )}
      </div>
    </div>
  );
};

export default page;
