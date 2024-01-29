import React from 'react'
import styles from './categories.module.css'
import ShowChartIcon from "@mui/icons-material/ShowChart";
import GroupsIcon from "@mui/icons-material/Groups";
import GestureIcon from "@mui/icons-material/Gesture";
import LaptopIcon from "@mui/icons-material/Laptop";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const Categories = () => {
  return (
    <div className={styles.container}>
      <h3>Categories</h3>
      <div className={styles.categoryCards}>
        <div className={styles.eachCard}>
          <ShowChartIcon/>
          <p>Grammer</p>
        </div>
      </div>
    </div>
  )
}

export default Categories