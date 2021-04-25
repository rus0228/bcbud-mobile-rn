import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {Roboto} from '@/components/Text';
import {FontSizes} from '@/styles/Sizes';
import Space from '@/components/Space';
import {TouchableOpacity} from 'react-native';
import MIcon from '@/components/MIcon';
import * as Styles from '@/styles';
import Colors from '@/styles/Colors';

const BidItem = ({item, onEdit, onRemove}) => {
  return (
    <View>
      <Container>
        <ItemText>{`Car ${item.carNumber}`}</ItemText>
        <Button onPress={onEdit}>
          <MIcon name="edit" color="black" />
        </Button>
        <Button onPress={onRemove}>
          <MIcon name="delete" color="black" />
        </Button>
      </Container>
      <LineSeparator />
    </View>
  );
};

const Container = styled.View`
  flex-direction: row;
  height: 35px;
  align-items: center;
`;

const ItemText = styled(Roboto)`
  font-size: ${FontSizes.label}px;
  flex: 1;
`;

const Button = styled.TouchableOpacity`
  height: 35px;
  width: 30px;
  ${Styles.center};
`;

const LineSeparator = styled.View`
  border-top-width: 1px;
  border-top-color: ${Colors.grey};
`;

export default BidItem;
