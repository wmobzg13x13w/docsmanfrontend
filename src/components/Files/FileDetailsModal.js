import React, { useRef } from "react";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
  },
  section: {
    margin: 10,
  },
  invoice: {
    fontFamily: "Helvetica",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: { margin: "auto", flexDirection: "row" },
  tableCol: {
    width: "50%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: { margin: "auto", marginTop: 5, fontSize: 10 },
});

const InvoiceDocument = ({ file }) => (
  <Document>
    <Page size='A4' style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.invoice}>Votre Société</Text>
        <Text>Votre Adresse</Text>
        <Text>Votre Numéro de Téléphone</Text>
      </View>

      <View style={styles.section}>
        <Text>Facturé à:</Text>
        <Text>{file.company}</Text>
        <Text>{file.destination}</Text>
      </View>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Date de Paiement</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Montant</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Type de Paiement</Text>
          </View>
        </View>

        {file.payments.map((payment) => (
          <View style={styles.tableRow} key={payment._id}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {new Date(payment.date).toLocaleDateString()}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{payment.amount} DT</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{payment.paymentType}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text>Total: {file.totalPrice} DT</Text> {/* Display the total */}
        <Text>
          Total Payé: {file.payments.reduce((sum, p) => sum + p.amount, 0)} DT
        </Text>{" "}
        {/* Calculate and display total paid */}
        <Text>
          Reste à Payer:{" "}
          {file.totalPrice -
            file.payments.reduce((sum, p) => sum + p.amount, 0)}{" "}
          DT
        </Text>{" "}
      </View>
    </Page>
  </Document>
);

const FileDetailsModal = ({ isOpen, toggleModal, file }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>Facture</ModalHeader>
      <ModalBody>
        <PDFViewer width='100%' height='500px'>
          {" "}
          {/* Adjust height as needed */}
          <InvoiceDocument file={file} />
        </PDFViewer>
      </ModalBody>
      <ModalFooter>
        <Button color='secondary' onClick={toggleModal}>
          Fermer
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default FileDetailsModal;
