import React from "react";
import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import { format } from "date-fns";
import styles from "./PDFStyles";
import tractoresLogo from "../../../utils/img/logoTNO.png";
import newHLogo from "../../../utils/img/newhlogo.png";

function PDFDoc({ data, module, cols }) {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Image style={styles.tractores} source={tractoresLogo} />
          <Image style={styles.newh} source={newHLogo} />
          <View style={styles.title}>
            <Text style={styles.h1}>{`Reporte de ${
              module === "proveedor" ? `${module}es` : `${module}s`
            }`}</Text>
          </View>
        </View>
        <View style={styles.table_head}>
          {cols.map((item, index) => (
            <Text key={`pdf-col-head-${index}`} style={styles.table_head_text}>
              {item}
            </Text>
          ))}
        </View>
        {data.map((item, index) => (
          <View key={`pdf-row-${index}`} style={styles.table_row}>
            <View style={styles.table_col_id}>
              <Text style={styles.cell_text}>{index + 1}</Text>
            </View>
            <View style={styles.table_col_18}>
              <Text style={styles.cell_text}>{item.name_user}</Text>
            </View>
            <View style={styles.table_col_18}>
              <Text style={styles.cell_text}>{item.address_user}</Text>
            </View>
            <View style={styles.table_col_18}>
              <Text style={styles.cell_text}>{item.phone_user}</Text>
            </View>
            <View style={styles.table_col_18}>
              <Text style={styles.cell_text_email}>{item.email_user}</Text>
            </View>
            <View style={styles.table_col_18}>
              <Text style={styles.cell_text}>
                {(item.level_user === "admin" && "administrador") ||
                  (item.level_user === "user" && "usuario")}
              </Text>
            </View>
          </View>
        ))}
        <View style={styles.footer}>
          <View>
            <Text style={styles.footer_text}>
              AGROTRACTORES DEL NORTE S. A. DE C. V.
            </Text>
            <Text style={styles.footer_text}>
              CARR. PANAMERICANA ENTRONQUE LAS PAMAS S/N
            </Text>
            <Text style={styles.footer_text}>JIMENEZ, CHIHUAHUA</Text>
            <Text style={styles.footer_text}>(629) 542 1045</Text>
          </View>
          <View>
            <Text style={styles.secondary_text}>
              {format(new Date(), "MM/dd/yyyy")}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default PDFDoc;
