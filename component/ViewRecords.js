import React from 'react';
import styled from 'styled-components/native';
import { setComma } from '../component/Util';

const Scroll = styled.ScrollView`
  flex: 1;
  background-color: #ffffff;
`;

const Wrap = styled.TouchableOpacity`
  padding: 15px;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
`;

const Desc = styled.Text`
  flex: 2;
  font-size: 17px;
  text-align: left;
`;

const Price = styled.Text`
  flex: 1;
  font-size: 17px;
  text-align: right;
`;

export default function ViewRecords(props) {
  const { day, update } = props;

  return (
    <Scroll>
    {day.records.map((record, index) => (
        <Wrap key={record.id} onPress={() => update(record.id)} activeOpacity={0.7}>
          <Desc>{record.title}</Desc>
          <Price>{setComma(record.out)}원</Price>
        </Wrap>
    ))}
    </Scroll>
  );
}
