import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const MyPdf = () => {
  // در این قسمت می توانید برای هریک از عناصر پی دی اف، استایل های مختلف را در نظر بگیرید
  const styles = StyleSheet.create({
    page: {
      padding: 40,
    },
    CodeNightTitle: {
      fontSize: 16,
    },
  });

  return (
    <Document>
      {/* استایل های ایجاد شده برای پیج را به شکل زیر به آن اعمال می کنیم */}
      <Page size="A4" style={styles.page}>
        <View>
          {/* استایل های ایجاد شده برای تایتل کدنایت را به شکل زیر به آن اعمال می کنیم */}
          <Text style={styles.CodeNightTitle}>سلام</Text>
        </View>
      </Page>
    </Document>
  );
};

export default MyPdf;
