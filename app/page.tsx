
import styles from "./page.module.css";
import FeaturedCourse from "@/components/featuredCourses/FeaturedCourse";
import Categories from "@/components/categories/Categories";
import MyCourses from "@/components/myCourses/MyCourses";
export default function Home() {

  
  return (
    <div className={styles.container}>
     
      <div className={styles.main}>
        <section className={styles.featuredCourses}>
          <FeaturedCourse />
        </section>
        <section className={styles.categories}>
          <Categories/>
        </section>
        <section className={styles.myCourses}>
          <MyCourses/>
        </section>
      </div>
    </div>
  );
}
