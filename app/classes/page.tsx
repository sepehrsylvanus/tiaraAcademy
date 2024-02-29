"use client";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import styles from "./classes.module.css";
import {
  Autocomplete,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import ClassIcon from "@mui/icons-material/Class";
import SchoolIcon from "@mui/icons-material/School";
import CategoryIcon from "@mui/icons-material/Category";
import { CustomClassTextField } from "./styledComponents";
import { retrieveAllClasses, retrieveTeacherName } from "@/actions/actions";
import BrownLink from "@/components/reusableComponents/brownLink/BrownLink";
import { Class } from "@/utils/types";
import { useForm, Controller } from "react-hook-form";

const page = () => {
  const [classes, setClasses] = useState<Class[] | null>([]);
  const [teachersName, setTeachersName] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const teacherNames = await retrieveTeacherName();
      const allClasses = await retrieveAllClasses();

      setTeachersName(teacherNames);
      setClasses(allClasses);
      setFilteredClasses(allClasses);
      setLoading(false);
    };
    fetchData();
  }, []);
  // START FILTER DATA

  type FormInputs = {
    className: string;
    teacherName: string;
  };

  const [filteredClasses, setFilteredClasses] = useState<Class[] | null>();

  const { control, handleSubmit } = useForm<FormInputs>();

  const filterData = (data: FormInputs) => {
    const { className, teacherName } = data;
    const classNameToFilter = className?.split(" ").join("").toLowerCase();

    const teacherNameToFilter = teacherName?.split(" ").join("").toLowerCase();

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

  // END FILTER DATA

  return (
    <div className={styles.container}>
      <div className={styles.classesHeader}>
        <div className={styles.titleContainer}>
          <h4>Tiara Academy</h4>
          <h1>All Classes</h1>
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
                <CustomClassTextField
                  {...field}
                  variant="outlined"
                  label="Class name"
                />
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
            variant="contained"
            sx={{
              backgroundColor: "#81403e",
              borderRadius: 0,
              width: "fit-content",
              alignSelf: "flex-end",
            }}
            onClick={handleSubmit(filterData)}
          >
            Filter
          </Button>
        </div>
      </div>
      <Divider sx={{ margin: "1em 0" }} />
      <div className={styles.classesBody}>
        {loading ? (
          <div className={styles.loaderContainer}>
            <CircularProgress sx={{ color: "#81403e" }} />
          </div>
        ) : (
          filteredClasses?.map((eachClass) => {
            const hours = Math.floor(
              Number(eachClass.duration) / 1000 / 60 / 60
            );

            if (eachClass.classInstructors.length > 1) {
              return eachClass.classInstructors.map((clsWithTeacher) => (
                <Card key={eachClass.id} className={styles.eachClassCard}>
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
                    <BrownLink
                      title="register"
                      href={`/classes/${eachClass.title
                        .toLowerCase()
                        .replace(
                          /\s+/g,
                          "-"
                        )}?teacher=${clsWithTeacher.instructor.name
                        .toLowerCase()
                        .replace(/\s+/g, "-")}&id=${eachClass.id}`}
                    />
                  </CardActions>
                </Card>
              ));
            }
            if (eachClass.classInstructors.length === 1) {
              return (
                <Card key={eachClass.id} className={styles.eachClassCard}>
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
                    <BrownLink
                      title="register"
                      href={`/classes/${eachClass.title
                        .toLowerCase()
                        .replace(
                          /\s+/g,
                          "-"
                        )}?teacher=${eachClass.classInstructors[0].instructor.name
                        .toLowerCase()
                        .replace(/\s+/g, "-")}&id=${eachClass.id}`}
                    />
                  </CardActions>
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
