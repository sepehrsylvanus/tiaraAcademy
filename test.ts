export const sendClassCodeTess = async () => {
  try {
    const className = "sms test" as string;
    const link = "telegram Link" as string;
    const sendCode = await request.post(
      {
        url: "http://ippanel.com/api/select",
        body: {
          op: "pattern",
          user: process.env.NEXT_PUBLIC_SMS_USERNAME,
          pass: process.env.NEXT_PUBLIC_SMS_PASS,
          fromNum: "+983000505",
          toNum: "+989360207963",
          patternCode: "hd02udgv2i77muw",
          inputData: [{ className }, { link }],
        },
        json: true,
      },
      async function (error: any, response: any, body: any) {
        if (!error && response.statusCode === 200) {
          //YOU‌ CAN‌ CHECK‌ THE‌ RESPONSE‌ AND SEE‌ ERROR‌ OR‌ SUCCESS‌ MESSAGE
          console.log(response.body);
          console.log(body);
          console.log(error);
          return response.body;
        } else {
          console.log("whatever you want");
        }
      }
    );
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
