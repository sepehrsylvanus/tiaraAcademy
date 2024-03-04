import React from "react";

const DetailCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) => {
  return (
    <div className=" shadow-md text-center min-w-[150px]">
      <div className=" shadow-sm text-center p-4 mx-2">{icon}</div>
      <div className=" p-6">
        <p className=" font-bold text-sm">{title}</p>
        <p className=" font-bold">{value}</p>
      </div>
    </div>
  );
};

export default DetailCard;
