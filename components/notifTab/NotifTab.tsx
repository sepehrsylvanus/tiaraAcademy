import { formatTimeFromNow } from "@/utils/helperFunctions";
import { Notifs, NotifType } from "@prisma/client";
import { UserCheckIcon, UserPlusIcon } from "lucide-react";
import { FC, useState } from "react";
import { TabsContent } from "../ui/tabs";

interface NotifTabProps {
  data?: Notifs[];
  value: string;
}

const NotifTab: FC<NotifTabProps> = ({ data, value }) => {
  console.log(data);

  return (
    <TabsContent value={value}>
      {data?.map((notif, index) => (
        <div
          key={index}
          className="eachNotif flex items-center rtl:flex-row-reverse p-7 shadow-lg"
        >
          <div className="flex rtl:flex-row-reverse mr-4 rtl:ml-4">
            {notif.type === NotifType.joinClass ? (
              <UserPlusIcon className="w-5 h-5" />
            ) : (
              <UserCheckIcon className="w-5 h-5" />
            )}
          </div>
          <div
            className="flex flex-col gap-4 
              "
          >
            <p className="rtl:text-end">{notif.title}</p>
            <p className="rtl:text-end">{formatTimeFromNow(notif.createdAt)}</p>
          </div>
        </div>
      ))}
    </TabsContent>
  );
};

export default NotifTab;