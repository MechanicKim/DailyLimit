import React from 'react';
import styled from 'styled-components/native';

import { setComma } from './Util';

const Wrap = styled.TouchableOpacity`
  padding-left: 20px;
  padding-top: 20px;
  padding-bottom: 30px;
  padding-right: 20px;
  background-color: #1976d2;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const Label = styled.View`
  margin-vertical: 10px;
`;

const Line = styled.View`
  background-color: #ffffff;
  height: 1px;
`;

const Text = styled.Text`
  text-align: right;
  color: #ffffff;
  font-size: ${props => props.size || 25}px;
`;

export default function MainTop(props) {
  const { today, fixedLimit, total, goToPage } = props;
  const balance = fixedLimit - (today.out || 0);

  return (
    <Wrap onPress={() => goToPage(`fixedOut`)} activeOpacity={0.9}>
      <Label>
        <Text size={35}>
          일한도 {setComma(fixedLimit)}원
        </Text>
      </Label>
      <Label>
        <Text>지출 {setComma(today.out || 0)}원</Text>
      </Label>
      <Line></Line>
      <Label>
        <Text>
          남은금액 {setComma(balance)}원
        </Text>
      </Label>
      <Label>
        <Text size={20}>
          이번 달 절약한 금액 {setComma(total)}원
        </Text>
      </Label>
    </Wrap>
  );
}
