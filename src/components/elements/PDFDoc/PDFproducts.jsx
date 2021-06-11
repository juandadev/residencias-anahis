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
          {cols[0].map((item, index) => (
            <Text key={`pdf-col-head-${index}`} style={styles.table_head_text}>
              {item}
            </Text>
          ))}
        </View>
        {data.map((item, index) => (
          <View key={`pdf-row-${index}`} style={styles.table_row}>
            <View style={styles.table_col_id}>
              <Text style={styles.cell_text}>{item.key_product}</Text>
            </View>
            <View style={styles.table_col_15}>
              <Text style={styles.cell_text}>{item.name_product}</Text>
            </View>
            <View style={styles.table_col_15}>
              <Text style={styles.cell_text}>
                {(item.fk_category_id === 1 && "recepción de compra") ||
                  (item.fk_category_id === 2 &&
                    "transferencia de orden abierta") ||
                  (item.fk_category_id === 3 && "estatus de inventario") ||
                  (item.fk_category_id === 4 && "transferencia de salida") ||
                  (item.fk_category_id === 5 && "transferencia de entrada") ||
                  (item.fk_category_id === 6 &&
                    "transferencia de producto entrante") ||
                  (item.fk_category_id === 7 && "mantenimiento de óptimos")}
              </Text>
            </View>
            <View style={styles.table_col_15}>
              <Text style={styles.cell_text}>
                {(item.fk_store_id === 1 && "delicias") ||
                  (item.fk_store_id === 2 && "jiménez") ||
                  (item.fk_store_id === 3 && "cuauhtémoc") ||
                  (item.fk_store_id === 4 && "casas grandes") ||
                  (item.fk_store_id === 5 && "torreón") ||
                  (item.fk_store_id === 6 && "durango")}
              </Text>
            </View>
            <View style={styles.table_col_15}>
              <Text style={styles.cell_text}>{item.stock_product}</Text>
            </View>
            <View style={styles.table_col_15}>
              <Text style={styles.cell_text}>
                {
                  cols[1].filter(
                    (vendor) => vendor.id_vendor === item.fk_vendor_id
                  )[0]?.name_vendor
                }
              </Text>
            </View>
            <View style={styles.table_col_15}>
              <Text style={styles.cell_text}>
                {(item.state_product === "success" && "No muy solicitado") ||
                  (item.state_product === "warning" && "Menos solicitado") ||
                  (item.state_product === "danger" && "Solicitado")}
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
