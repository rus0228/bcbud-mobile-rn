import React from 'react';
import {View, ScrollView, StyleSheet, useWindowDimensions} from 'react-native';
import {Table, Row} from 'react-native-table-component';

const tableHeads = ['Start Number', 'CompetitorName', 'Winner Name'];
const widths = [100, 130, 130];

const Winnings = ({items, style}) => {
  const windowWidth = useWindowDimensions().width;
  const winArray = React.useMemo(() => {
    return (items ?? []).map((win) => {
      return [win.startNumber, win.competitorName, win.winnerName];
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
              {winArray.map((row, index) => (
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

export default Winnings;
