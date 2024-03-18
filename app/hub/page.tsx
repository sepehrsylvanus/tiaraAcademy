import { Card, CardContent } from "@/components/ui/card";

import { Star, AccessTime } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { getFeaturedClasses } from "@/actions/actions";

import MyCourses from "@/components/MyCourses";

export default async function Home() {
  const featuredClasses = await getFeaturedClasses();
  console.log(featuredClasses);
  return (
    <div className="px-2 pb-4">
      <div className="featuredClasses">
        <h2 className="font-bold text-2xl mb-2 border-b border-dashed">
          Featured Classes
        </h2>
        <div className="featuredContainer grid grid-cols-1 gap-4">
          {featuredClasses.map((featuredClass) => {
            console.log(featuredClass.duration);
            const seconds = Math.floor(Number(featuredClass.duration) / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;

            return (
              <Card
                key={featuredClass.id}
                className="eachFeatured bg-slate-300 p-2"
              >
                <img
                  src="/article.jpg"
                  alt="featuredCourseImg"
                  width={"100%"}
                  height={200}
                  className="rounded-md"
                />
                <div className="teacherPaper flex px-4  justify-between items-center bg-white w-[90%] shadow-lg rounded-md relative bottom-6 left-2">
                  <Avatar
                    src={
                      featuredClass.classInstructors[0].instructor.profileImg
                    }
                    sx={{ width: 54, height: 54 }}
                  />
                  <span className="text-sm">
                    {" "}
                    {featuredClass.classInstructors[0].instructor.name}
                  </span>
                </div>
                <CardContent className="">
                  <h4>{featuredClass.title}</h4>
                  <div className="flex gap-8 mt-4">
                    <p className="flex gap-2">
                      <AccessTime />
                      {`${hours > 0 ? `${hours}hr` : ""} ${remainingMinutes}m`}
                    </p>
                    <p className="flex gap-2">
                      <Star />
                      {featuredClass.rating}/5
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      <MyCourses />
    </div>
  );
}
