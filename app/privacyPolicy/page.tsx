import { Separator } from "@/components/ui/separator";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

export default async function PrivacyPolicy() {
  const locale = await getLocale();

  return (
    <div className="container max-w-4xl py-12">
      <Link
        href={"/"}
        className="absolute top-2 left-2 md:ltr:left-[5em] ltr:left-2"
      >
        <Image src={"/logo.png"} alt="Logo" width={60} height={60} />
      </Link>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {locale === "en" ? "Privacy Policy" : "قوانین و حریم خصوصی"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {locale === "en"
              ? "Effective Date: December 2024"
              : "تاریخ اجرا: آذر 1403"}
          </p>
        </div>

        <div className="space-y-4">
          <p className="leading-7">
            {locale === "en" ? (
              <>
                Welcome to Tiara Academy! Your trust is important to us. This
                Privacy and Policy page explains how we collect, use, and
                protect your information, along with terms to ensure smooth use
                of our services. By accessing or using Tiara Academy, you agree
                to the following terms.
              </>
            ) : (
              <>
                به آکادمی تیرا خوش آمدید! اعتماد شما برای ما بسیار ارزشمند است.
                این صفحه « قوانین و حریم خصوصی » توضیح می‌دهد که چگونه اطلاعات
                شما را جمع‌آوری، استفاده و محافظت می‌کنیم و شرایطی را برای
                استفاده آسان از خدمات ما مشخص می‌کند. با دسترسی به آکادمی تیرا
                یا استفاده از آن، شما با این شرایط موافقت می‌کنید.
              </>
            )}
          </p>
        </div>

        <Separator />

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            {locale === "en"
              ? "1. Information We Collect"
              : "۱. اطلاعاتی که جمع‌آوری می‌کنیم"}
          </h2>
          <p className="leading-7">
            {locale === "en"
              ? "We may collect the following types of information:"
              : "ممکن است اطلاعات زیر را جمع‌آوری کنیم:"}
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4 text-muted-foreground">
            <li>
              {locale === "en"
                ? "Personal Information: Name, email address and phone number provided during registration or purchases."
                : "اطلاعات شخصی: نام، آدرس ایمیل و شماره تلفن که در زمان ثبت‌نام یا خرید ارائه می‌کنید."}
            </li>
            <li>
              {locale === "en"
                ? "Usage Data: Information about your interactions with our website, such as pages visited, time spent on the site, and click data."
                : "داده‌های استفاده: اطلاعات مربوط به تعاملات شما با وب‌سایت ما، مانند صفحات بازدید شده، مدت زمان صرف شده در سایت و کلیک‌ها."}
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            {locale === "en"
              ? "2. How We Collect Information"
              : "۲. نحوه جمع‌آوری اطلاعات"}
          </h2>
          <p className="leading-7">
            {locale === "en"
              ? "We gather data through:"
              : "ما اطلاعات را از طریق روش‌های زیر جمع‌آوری می‌کنیم:"}
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4 text-muted-foreground">
            <li>
              {locale === "en"
                ? "User Input: Forms submitted during course registration, class bookings, or writing submissions."
                : "ورودی کاربران: فرم‌هایی که در زمان ثبت‌نام، رزرو کلاس‌ها یا ارسال نوشته‌ها پر می‌کنید."}
            </li>
            <li>
              {locale === "en"
                ? "Cookies: Small files stored on your device to enhance your browsing experience."
                : "کوکی‌ها: فایل‌های کوچکی که در دستگاه شما ذخیره می‌شوند تا تجربه مرور شما بهبود یابد."}
            </li>
            <li>
              {locale === "en"
                ? "Third-Party Services: Payment gateways (e.g., Zarin Pal) that process transactions securely."
                : "خدمات شخص ثالث: درگاه‌های پرداخت (مانند زرین‌پال) که تراکنش‌ها را به‌صورت امن پردازش می‌کنند."}
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            {locale === "en"
              ? "3. How We Use Your Information"
              : "۳. نحوه استفاده از اطلاعات شما"}
          </h2>
          <p className="leading-7">
            {locale === "en"
              ? "Your information helps us to:"
              : "اطلاعات شما به ما کمک می‌کند تا:"}
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4 text-muted-foreground">
            <li>
              {locale === "en"
                ? "Provide and personalize our services."
                : "خدمات خود را ارائه و شخصی‌سازی کنیم."}
            </li>
            <li>
              {locale === "en"
                ? "Process payments and manage your account."
                : "پرداخت‌ها را پردازش کرده و حساب کاربری شما را مدیریت کنیم."}
            </li>
            <li>
              {locale === "en"
                ? "Improve our platform based on user feedback."
                : "پلتفرم خود را بر اساس بازخورد کاربران بهبود دهیم."}
            </li>
            <li>
              {locale === "en"
                ? "Communicate with you regarding updates, offers, or support."
                : "در مورد به‌روزرسانی‌ها، پیشنهادات یا پشتیبانی با شما ارتباط برقرار کنیم."}
            </li>
          </ul>
        </section>

        {/* Repeat similar sections for the remaining items */}

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            {locale === "en" ? "11. Contact Us" : "۱۱. تماس با ما"}
          </h2>
          <p className="leading-7 text-muted-foreground">
            {locale === "en" ? (
              <>
                If you have questions or concerns about this Privacy Policy,
                please contact us at{" "}
                <a
                  href="mailto:TiaraAcademyTehran@gmail.com"
                  className="text-primary hover:underline"
                >
                  TiaraAcademyTehran@gmail.com
                </a>
              </>
            ) : (
              <>
                اگر سؤال یا نگرانی‌ای در مورد این سیاست‌های حریم خصوصی دارید،
                لطفاً از طریق آدرس ایمیل زیر با ما تماس بگیرید:{" "}
                <a
                  href="mailto:TiaraAcademyTehran@gmail.com"
                  className="text-primary hover:underline"
                >
                  TiaraAcademyTehran@gmail.com
                </a>
              </>
            )}
          </p>
        </section>
      </div>
    </div>
  );
}
