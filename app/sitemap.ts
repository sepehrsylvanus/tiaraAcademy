import { getArticles, getClasses } from "@/actions/actions";
import { getTeachers } from "@/actions/userActions";
import { Class } from "@/utils/types";
import { url } from "inspector";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Articles
  const articles = await getArticles();
  console.log(articles);
  const blogEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/hub/blogs/${article.id}`,
  }));
  // Classes
  const classes = await getClasses();
  const classEntries: MetadataRoute.Sitemap = classes.map((cls: Class) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/hub/classes/${cls.id}`,
  }));

  // TEACHERS
  const teachers = await getTeachers();
  const teacherEntries: MetadataRoute.Sitemap = teachers.map((teacher) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/hub/teachers/${teacher.id}`,
  }));
  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/sign-up`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/sign-in`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/forgetPass`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/contact`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/hub/blogs`,
    },
    ...blogEntries,
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/hub/classes`,
    },
    ...classEntries,
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/hub/notifications`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/hub/payments`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/hub/teachers`,
    },
    ...teacherEntries,
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/hub/videos`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/hub/videos`,
    },
  ];
}
