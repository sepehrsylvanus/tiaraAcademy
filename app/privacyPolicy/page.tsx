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

        {/* Information We Collect */}
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

        <Separator />

        {/* How We Collect Information */}
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

        <Separator />

        {/* How We Use Your Information */}
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

        <Separator />

        {/* Payment and Refund Policy */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            {locale === "en"
              ? "4. Payment and Refund Policy"
              : "۴. سیاست پرداخت و بازپرداخت"}
          </h2>
          <ul className="list-disc list-inside space-y-2 pl-4 text-muted-foreground">
            <li>
              {locale === "en"
                ? "No Refunds: All purchases are final. Refunds are not available once payment is completed, including video courses, classes, or writing services."
                : "عدم بازپرداخت: تمامی خریدها نهایی هستند. بازپرداخت برای ویدیوهای آموزشی، کلاس‌ها یا خدمات تصحیح نوشته امکان‌پذیر نیست."}
            </li>
            <li>
              {locale === "en"
                ? "Class Rescheduling: Online class schedules can only be changed with at least 24 hours’ notice. Missed classes without prior notice will not be refunded or rescheduled."
                : "تغییر زمان کلاس‌ها: زمان‌بندی کلاس‌ها فقط با حداقل ۲۴ ساعت اطلاع قبلی قابل تغییر است. کلاس‌هایی که بدون اطلاع قبلی از دست بروند، بازپرداخت یا مجدداً برنامه‌ریزی نخواهند شد."}
            </li>
            <li>
              {locale === "en"
                ? "Access to Courses: Purchased video courses are available for your account and cannot be transferred or shared."
                : "دسترسی به دوره‌ها: دوره‌های ویدیویی خریداری شده فقط برای حساب کاربری شما در دسترس هستند و نمی‌توانند منتقل یا به اشتراک گذاشته شوند."}
            </li>
          </ul>
        </section>

        <Separator />

        {/* Content Usage Rules */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            {locale === "en"
              ? "5. Content Usage Rules"
              : "۵. قوانین استفاده از محتوا"}
          </h2>
          <ul className="list-disc list-inside space-y-2 pl-4 text-muted-foreground">
            <li>
              {locale === "en"
                ? "Non-Transferable: Content (including videos, materials, and feedback) is for personal use only and may not be shared, reproduced, or distributed without written permission."
                : "غیرقابل انتقال: محتوا (شامل ویدیوها، مطالب و بازخوردها) فقط برای استفاده شخصی است و بدون اجازه کتبی نمی‌تواند به اشتراک گذاشته شود، تکثیر شود یا توزیع شود."}
            </li>
            <li>
              {locale === "en"
                ? "Copyright: All content is the intellectual property of Tiara Academy. Unauthorized use will result in immediate suspension of services and potential legal action."
                : "حق تألیف: تمام محتوا متعلق به آکادمی تیرا است. استفاده غیرمجاز منجر به تعلیق فوری خدمات و اقدام قانونی احتمالی خواهد شد."}
            </li>
          </ul>
        </section>

        <Separator />

        {/* Account Usage Policy */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            {locale === "en"
              ? "6. Account Usage Policy"
              : "۶. سیاست استفاده از حساب کاربری"}
          </h2>
          <p className="leading-7">
            {locale === "en"
              ? "Access to your Tiara Academy account is limited to you alone. Sharing login credentials with others is strictly prohibited and may result in account suspension or termination."
              : "دسترسی به حساب کاربری شما در آکادمی تیرا فقط محدود به شما است. اشتراک‌گذاری اطلاعات ورود با دیگران به‌طور جدی ممنوع است و ممکن است منجر به تعلیق یا بسته شدن حساب کاربری شود."}
          </p>
        </section>

        <Separator />

        {/* User Responsibilities */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            {locale === "en"
              ? "7. User Responsibilities"
              : "۷. مسئولیت‌های کاربران"}
          </h2>
          <ul className="list-disc list-inside space-y-2 pl-4 text-muted-foreground">
            <li>
              {locale === "en"
                ? "Accurate Information: Users must provide accurate and up-to-date information during registration and purchases."
                : "اطلاعات صحیح: کاربران باید اطلاعات دقیق و به‌روز را در هنگام ثبت‌نام و خرید ارائه دهند."}
            </li>
            <li>
              {locale === "en"
                ? "Account Security: Users are responsible for maintaining the confidentiality of their account login details. Any unauthorized use must be reported immediately."
                : "امنیت حساب کاربری: کاربران مسئول حفظ محرمانگی اطلاعات ورود به حساب کاربری خود هستند. هرگونه استفاده غیرمجاز باید فوراً گزارش شود."}
            </li>
            <li>
              {locale === "en"
                ? "Respectful Behavior: Users must communicate respectfully with our staff and other users. Abusive behavior will not be tolerated and may result in service suspension."
                : "رفتار محترمانه: کاربران باید با کارکنان و دیگر کاربران ما به‌طور محترمانه ارتباط برقرار کنند. رفتار توهین‌آمیز تحمل نخواهد شد و ممکن است منجر به تعلیق خدمات شود."}
            </li>
            <li>
              {locale === "en"
                ? "Prohibited Activities: Users must not engage in activities that disrupt the website or violate applicable laws, including hacking, spamming, or distributing malicious software."
                : "فعالیت‌های ممنوعه: کاربران نباید در فعالیت‌هایی که موجب اختلال در وب‌سایت می‌شود یا قوانین جاری را نقض می‌کند، مانند هک کردن، ارسال اسپم یا توزیع نرم‌افزارهای مخرب، شرکت کنند."}
            </li>
          </ul>
        </section>

        <Separator />

        {/* Data Security */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            {locale === "en" ? "8. Data Security" : "۸. امنیت داده‌ها"}
          </h2>
          <p className="leading-7">
            {locale === "en"
              ? "We implement industry-standard measures to protect your data, including encryption and secure servers. However, no method of data transmission or storage is 100% secure, and we cannot guarantee absolute security."
              : "ما اقدامات استاندارد صنعتی را برای محافظت از داده‌های شما، از جمله رمزگذاری و سرورهای امن، اجرا می‌کنیم. با این حال، هیچ روشی برای انتقال یا ذخیره‌سازی داده‌ها 100٪ امن نیست و ما نمی‌توانیم امنیت کامل را تضمین کنیم."}
          </p>
        </section>

        <Separator />

        {/* Cookies and Tracking Technologies */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            {locale === "en"
              ? "9. Cookies and Tracking Technologies"
              : "۹. کوکی‌ها و فناوری‌های ردیابی"}
          </h2>
          <p className="leading-7">
            {locale === "en"
              ? "We use cookies to:"
              : "ما از کوکی‌ها برای موارد زیر استفاده می‌کنیم:"}
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4 text-muted-foreground">
            <li>
              {locale === "en"
                ? "Save your preferences and login details."
                : "ذخیره تنظیمات و اطلاعات ورود شما."}
            </li>
            <li>
              {locale === "en"
                ? "Analyze website traffic and improve user experience."
                : "تجزیه‌وتحلیل ترافیک وب‌سایت و بهبود تجربه کاربری."}
            </li>
          </ul>
          <p className="leading-7">
            {locale === "en"
              ? "You can disable cookies through your browser settings, but this may limit certain features of the website."
              : "شما می‌توانید کوکی‌ها را از طریق تنظیمات مرورگر خود غیرفعال کنید، اما ممکن است برخی از ویژگی‌های وب‌سایت محدود شود."}
          </p>
        </section>

        <Separator />

        {/* Changes to This Policy */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            {locale === "en"
              ? "10. Changes to This Policy"
              : "۱۰. تغییرات در این سیاست"}
          </h2>
          <p className="leading-7">
            {locale === "en"
              ? "We reserve the right to modify or update this Privacy Policy at any time. Changes will be posted on this page, and the updated date will be indicated at the top."
              : "ما حق داریم که این سیاست حریم خصوصی را در هر زمان تغییر دهیم یا به‌روزرسانی کنیم. تغییرات در این صفحه منتشر خواهد شد و تاریخ به‌روزرسانی در بالای صفحه نمایش داده خواهد شد."}
          </p>
        </section>

        <Separator />

        {/* Contact Information */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            {locale === "en" ? "11. Contact Information" : "۱۱. اطلاعات تماس"}
          </h2>
          <p className="leading-7">
            {locale === "en"
              ? "If you have any questions or concerns about this Privacy Policy, please contact us at support@tiaraacademy.com."
              : "اگر سوال یا نگرانی در مورد این سیاست حریم خصوصی دارید، لطفاً با ما از طریق ایمیل support@tiaraacademy.com تماس بگیرید."}
          </p>
        </section>
      </div>
    </div>
  );
}
