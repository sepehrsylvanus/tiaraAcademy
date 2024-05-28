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

  const styles = StyleSheet.create({
    page: {
      backgroundColor: "white",

      padding: 32,
    },
    title: {
      backgroundColor: "#594943",
      color: "white",
      paddingTop: 24,
      paddingBottom: 24,
      paddingLeft: 16,
      paddingRight: 16,
      fontWeight: "bold",
      fontSize: 50,
      textAlign: "center",
      marginBottom: 16,
    },
    name: {
      fontSize: 30,
      textAlign: "center",
      marginBottom: 16,
    },
    email: {
      textAlign: "center",
      marginBottom: 16,
    },
    image: {
      borderRadius: 5,
      width: 300,
      height: 300,
      margin: "0 auto",
      objectFit: "contain",
    },
    writing: {
      marginTop: 16,
      lineHeight: 1.5,
    },
  });

  return (
    <Document>
      {/* استایل های ایجاد شده برای پیج را به شکل زیر به آن اعمال می کنیم */}
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.title}>{details.subject}</Text>
          <Text style={styles.name}>{details.name}</Text>
          <Text style={styles.email}>{details.email}</Text>
          {details.subjectImgURL && (
            <Image style={styles.image} src={details.subjectImgURL} />
          )}
          <Text style={styles.writing}>{details.writing}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default MyPdf;
