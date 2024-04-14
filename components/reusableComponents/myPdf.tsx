import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const MyPdf = () => {
  // در این قسمت می توانید برای هریک از عناصر پی دی اف، استایل های مختلف را در نظر بگیرید
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
          <Text>
            Sepehr
            <br />
            Haghdoust
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default MyPdf;
