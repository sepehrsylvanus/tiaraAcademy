import { Writings } from "@/utils/types";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const MyPdf = ({ details }: { details: Writings }) => {
  // در این قسمت می توانید برای هریک از عناصر پی دی اف، استایل های مختلف را در نظر بگیرید
  console.log(details);
  const styles = StyleSheet.create({
    page: {
      backgroundColor: "white",

      padding: 32,
    },
    title: {
      backgroundColor: "#F4F1EB",

      paddingTop: 24,
      paddingBottom: 24,
      paddingLeft: 16,
      paddingRight: 16,
      fontWeight: "bold",
      fontSize: 20,
    },
  });

  return (
    <Document>
      {/* استایل های ایجاد شده برای پیج را به شکل زیر به آن اعمال می کنیم */}
      <Page size="A4" style={styles.page}>
        <View>
          <Text>{details.name}</Text>
          <Text>{details.email}</Text>
          <Text>{details.subject}</Text>
          <Image src={details.subjectImgURL} />
          <Text>{details.writing}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default MyPdf;
