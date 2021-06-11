import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 25,
    backgroundColor: "#fff",
    fontSize: 14,
  },
  h1: {
    fontSize: 24,
    fontWeight: 700,
  },
  tractores: {
    marginRight: 5,
    width: 150,
  },
  newh: {
    width: 110,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  secondary_text: {
    fontSize: 10,
    color: "rgba(0, 0, 0, 0.5)",
  },
  table_head: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px 15px",
    width: "100%",
    backgroundColor: "#e9ecef",
  },
  table_col_id: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 5,
    width: "10%",
    height: "100%",
    backgroundColor: "#fff",
    border: "1px solid #e9ecef",
  },
  table_col_25: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 5,
    width: "25%",
    height: "100%",
    backgroundColor: "#fff",
    border: "1px solid #e9ecef",
  },
  table_col_15: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 5,
    width: "15%",
    height: "100%",
    backgroundColor: "#fff",
    border: "1px solid #e9ecef",
  },
  table_col_18: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 5,
    width: "18%",
    height: "100%",
    backgroundColor: "#fff",
    border: "1px solid #e9ecef",
  },
  table_row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  table_head_text: {
    fontWeight: 700,
    fontSize: 12,
  },
  cell_text: {
    fontSize: 10,
    fontWeight: 300,
    textTransform: "capitalize",
  },
  cell_text_email: {
    fontSize: 10,
    fontWeight: 300,
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
  },
  footer_text: {
    fontSize: 10,
  },
});

export default styles;
