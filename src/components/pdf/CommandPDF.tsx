"use client";

// CommandDetailsPDF.tsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { Commande, Product } from '@/types'; // Import the types if necessary
import Converter from '@/dateConverter';

interface Props {
    command?: Commande;
    products: Product[];
  }

// Define styles using StyleSheet.create()
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 20, // Add padding to the page
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    marginBottom: 3,
  },
  image: {
    width: 100, // Set the width of the image
    height: 100, // Set the height of the image
    marginBottom: 10, // Add some bottom margin to the image
  },
  table: {
    display: 'table' as any, // Cast the display property value to any    
    //width: 'auto',
    borderStyle: 'solid',
    borderWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableColHeader: {
    padding: 6,
    textAlign: "center",
    fontSize: 12,
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
  tableCol: {
    padding: 6,
    textAlign: "center",
    fontSize: 12,
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
  },
});

const CommandDetailsPDF: React.FC<Props> = ({ command, products }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Bon de Commande Extern N {command?.number}</Text>
        <Text style={styles.subtitle}>État: {command?.status}</Text>
        <Text style={styles.text}>Date: <Converter date={command?.orderdate} /></Text>
        <Text style={styles.text}>Date de livraison: <Converter date={command?.deliverydate} /></Text>
        <Text style={styles.text}>Spécifications: {command?.orderspecifications}</Text>
        <Text style={styles.subtitle}>Produits:</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Nom Produit</Text>
            <Text style={styles.tableColHeader}>Caractéristiques</Text>
            <Text style={styles.tableColHeader}>Prix Unitaire</Text>
          </View>
          {products.map((product, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCol}>{product.name}</Text>
              <Text style={styles.tableCol}>{product.caracteristics}</Text>
              <Text style={styles.tableCol}>{product.price}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.text}>Total TTC: {command?.total_ttc}</Text>
      </View>
    </Page>
  </Document>
);

export default CommandDetailsPDF;
