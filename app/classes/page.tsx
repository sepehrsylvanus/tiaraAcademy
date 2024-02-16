import React from "react";
import TextField from "@mui/material/TextField";
import styles from "./classes.module.css";
import {
  Autocomplete,
  Card,
  CardActions,
  CardContent,
  CardMedia,
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
const page = async () => {
  const teachersName = await retrieveTeacherName();

  const allClasses = await retrieveAllClasses();
  console.log(allClasses);
  return (
    <div className={styles.container}>
      <div className={styles.classesHeader}>
        <div className={styles.titleContainer}>
          <h4>Tiara Academy</h4>
          <h1>Products</h1>
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
              >
                {teachersName.map((item) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </CustomClassTextField>
            </FormControl>
          </div>
          <div className={styles.eachSearchbar}>
            <IconButton>
              <CategoryIcon />
            </IconButton>
            <CustomClassTextField variant="outlined" label="Category" />
          </div>
        </div>
      </div>
      <Divider sx={{margin: '1em 0'}}/>
      <div className={styles.classesBody}>
        {allClasses.map((eachClass) => {
          const hours = Math.floor(Number(eachClass.duration) / 1000 / 60 / 60);
          if(eachClass.classInstructors.length === 1){
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
                  <p>Teacher's name</p>
                  <h4>{`${(eachClass.price * 10)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} IRR`}</h4>
                </div>
                <div className={styles.classDetailsRight}>
                  <p>{`${hours > 0 ? hours + 'hr' : ''} ${(Number(eachClass.duration) / 1000 / 60) % 60} m`}</p>
                </div>
              </CardContent>
              <CardActions>
                <BrownLink title="Register" href={`/${eachClass.link}`} />
              </CardActions>
            </Card>
            )
          }else{
            
          }
        })}
      </div>
    </div>
  );
};

export default page;
