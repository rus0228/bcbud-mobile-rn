import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Table, Row} from 'react-native-table-component';

const tableHeads = [
  'CarNo',
  'NumOf\nBids',
  'TotalPrice',
  'Invoice\nSent',
  'ReadyForDraw',
];
const widths = [100, 50, 130, 80, 60];

const CurrentBids = ({items, style}) => {
  const bidArray = React.useMemo(() => {
    return (items ?? []).map((bid) => {
      return [
        bid.carNo,
        bid.numOfBids,
        bid.totalPrice,
        bid.invoiceSent,
        bid.readyForDraw,
      ];
    });
  }, [items]);
  return (
    <View style={style}>
      <ScrollView horizontal>
        <View>
          <Table borderStyle={styles.borderStyle}>
            <Row
              data={tableHeads}
              widthArr={widths}
              style={styles.cell}
              textStyle={styles.headerCell}
            />
          </Table>
          <ScrollView style={{marginTop: -1}}>
            <Table borderStyle={styles.borderStyle}>
              {bidArray.map((row, index) => (
                <Row
                  key={index}
                  data={row}
                  widthArr={widths}
                  style={styles.cell}
                  textStyle={styles.dataCell}
                />
              ))}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  borderStyle: {borderWidth: 1, borderColor: 'white'},
  cell: {backgroundColor: '#eceef6'},
  headerCell: {fontSize: 12, textAlign: 'center', padding: 2},
  dataCell: {fontSize: 12, textAlign: 'right', padding: 2},
});

export default CurrentBids;
