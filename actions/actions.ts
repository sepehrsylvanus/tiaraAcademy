"use server";

import { title } from "process";

const getClass = async(className: string)=>{
  const resultClass = await prisma?.class.findFirst({
    where:{title: className},
  })
  console.log(resultClass)
}