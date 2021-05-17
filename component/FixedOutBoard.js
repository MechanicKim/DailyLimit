import React from 'react';
import styled from 'styled-components/native';
import { setComma } from '../component/Util';

const Board = styled.View`
  padding: 10px;
  background-color: #ffffff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const Group = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Desc = styled.Text`
  flex: 2;
  padding-right: 10px;
  text-align: right;
  font-size: 17px;
  color: #212121;
`;

const Balance = styled.Text`
  flex: 1;
  padding: 10px;
  color: #212121;
  text-align: right;
  font-size: 17px;
`;

const Input = styled.TextInput`
  flex: 1;
  padding: 10px;
  text-align: right;
  font-size: 17px;
  background-color: #eeeeee;
  border-radius: 5px;
`;

const Unit = styled.Text`
  width: 50px;
  text-align: center;
  color: #212121;
  font-size: 17px;
`;
export default function FixedOutBoard(props) {
  const { total, onChangeTotal, lastTotal } = props;

  return (
    <Board>
      <Group>
        <Desc>월 수입</Desc>
        <Input value={total} onChangeText={onChangeTotal} placeholder="금액" keyboardType="numeric" />
        <Unit>원</Unit>
      </Group>
      <Group>
        <Desc>월 수입 - 고정지출</Desc>
        <Balance>{setComma(lastTotal)}</Balance>
        <Unit>원</Unit>
      </Group>
    </Board>
  );
}
