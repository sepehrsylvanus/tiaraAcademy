import { getSingleClass } from "@/actions/actions";
import { verifyPayment } from "@/actions/payment";
import { getSingleUser } from "@/actions/userActions";
import { getMyWritingCharge } from "@/actions/writing";
import { User } from "@/utils/types";
import { getMessages } from "next-intl/server";
import Link from "next/link";

type Params = {
  params: {
    class: string;
  };
  searchParams: {
    Authority: string;
    Status: string;
    type: "class" | "playlist" | "writingCharge";
  };
};

export default async function PaymentRedirect(params: Params) {
  console.log(params);
  const { Authority, Status, type } = params.searchParams;
  const messages = (await getMessages()) as any;
  const t = messages.PaymentRedirect;
  const user = (await getSingleUser()) as User;
  let verified = await verifyPayment({ user, authority: Authority, type });

  const myCharge = await getMyWritingCharge(user.id);
  console.log(myCharge);
  console.log(verified);

  return (
    <div className="flex  flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        {verified ? (
          <CircleCheckIcon className="mx-auto h-16 w-16 text-green-500" />
        ) : (
          <CircleXIcon className="mx-auto h-16 w-16 text-green-500" />
        )}
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {verified ? t.paymentSuccessful : t.paymentUnsuccessful}
        </h1>
        <p className="mt-4 text-muted-foreground">
          Your writing token charged to
        </p>
        <div className="mt-8">
          <Link
            href={"/hub/writing"}
            className="inline-flex items-center rounded-md bg-lightText text-white px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            prefetch={false}
          >
            {t.return}
          </Link>
        </div>
      </div>
    </div>
  );
}
// http://localhost:4000/hub/cm00lbuyn000pk16s6dke6inq/paymentRedirect?Authority=A000000000000000000000000000ydjwxllj&Status=OK

function CircleCheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function CircleXIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
}