import styles from "./home.module.css";
import FeaturedCourse from "@/components/featuredCourses/FeaturedCourse";
import MyCourses from "@/components/myCourses/MyCourses";

export default async function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <section className={styles.featuredCourses}>
          <FeaturedCourse />
        </section>
        <section className={styles.myCourses}>
          <MyCourses />
        </section>
      </div>
    </div>
  );
}
