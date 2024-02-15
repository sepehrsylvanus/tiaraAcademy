import React from 'react'
import TextField from '@mui/material/TextField';
import styles from './classes.module.css'
import { Autocomplete, IconButton } from '@mui/material';
import ClassIcon from '@mui/icons-material/Class';
import SchoolIcon from '@mui/icons-material/School';
import CategoryIcon from '@mui/icons-material/Category';
import CustomAutoComplete from '@/components/autoComplete/CustomAutoComplete';
import { CustomClassTextField } from './styledComponents'
const page = async() => {
  
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
            <CustomClassTextField variant="outlined" label="Class name" />
          </div>
          <div className={styles.eachSearchbar}>
            <IconButton>
              <SchoolIcon />
            </IconButton>
            <CustomAutoComplete />
          </div>
          <div className={styles.eachSearchbar}>
            <IconButton>
              <CategoryIcon />
            </IconButton>
            <TextField variant="outlined" label="Category" />
          </div>
        </div>
      </div>
      <div className={styles.classesBody}></div>
    </div>
  );
}

export default page