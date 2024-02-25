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
import { resourceUsage } from "process";
const page = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [teachersName, setTeachersName] = useState<string[]>([]);
  const [teacherNameFilter, setTeacherNameFilter] = useState<Class[]>([]);
  const [classNameFilter, setClassNameFilter] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  // START FILTER DATA
  const [filteredClasses, setFilteredClasses] = useState<Class[]>();
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

  useEffect(() => {
    console.log({ classes });
  }, [classes]);

  const filterOnClassName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputToFilter = e.target.value.toLowerCase();

    const filtered = classes.filter((eachClass) => {
      const nameToFilter = eachClass.title
        .split("")
        .filter((item) => item !== " ")
        .join("")
        .toLowerCase();

      return nameToFilter.startsWith(inputToFilter);
    });

    setClassNameFilter(filtered);
    applyFilters({ classNameFilter: filtered });
  };

  const filterOnTeacherName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const teacherName = e.target.value.split(" ").join("").toLowerCase();
    console.log({ teacherName });

    const flatClasses: Class[] = [];

    classes.map((eachClass: Class) => {
      if (eachClass.classInstructors.length > 1) {
        eachClass.classInstructors.forEach((item) => {
          // Create a new object for each iteration
          const flatClass = { ...eachClass };
          flatClass.classInstructors = [item];
          flatClasses.push(flatClass);
        });
      } else {
        const flatClass = { ...eachClass };
        flatClasses.push(flatClass);
      }
    });

  
    const filtered = flatClasses.filter((eachClass) =>
      eachClass.classInstructors.some((instructor) =>
        instructor.instructor.name
          .split(" ")
          .join("")
          .toLowerCase()
          .includes(teacherName)
      )
    );
    
    setTeacherNameFilter(filtered);
    applyFilters({ teacherNameFilter: filtered });
  };
  const applyFilters = ({ classNameFilter , teacherNameFilter }: any) => {
    if (classNameFilter && teacherNameFilter) {
      const filtered = classNameFilter.filter((cls: Class) =>
        teacherNameFilter.some((teacherCls: Class) =>
          cls.classInstructors.some((instructor) =>
            instructor.instructor.name.toLowerCase() ===
            teacherCls.classInstructors[0].instructor.name.toLowerCase()
          )
        )
      );
      setFilteredClasses(filtered);
    } else if (classNameFilter) {
      setFilteredClasses(classNameFilter);
    } else if (teacherNameFilter) {
      setFilteredClasses(teacherNameFilter);
    } else {
      setFilteredClasses(classes);
    }
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
            <CustomClassTextField
              name="class-name"
              variant="outlined"
              label="Class name"
              onChange={filterOnClassName}
            />
          </div>
          <div className={styles.eachSearchbar}>
            <IconButton>
              <SchoolIcon />
            </IconButton>
            <FormControl fullWidth>
              <CustomClassTextField
                select
                variant="outlined"
                label="Choose your teacher"
                onChange={filterOnTeacherName}
              >
                {teachersName.map((item) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </CustomClassTextField>
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
                    <BrownLink title="Register" href={`/${eachClass.link}`} />
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
                    <BrownLink title="Register" href={`/${eachClass.link}`} />
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
