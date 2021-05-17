import React from 'react';
import styled, { css } from 'styled-components/native';
import { setComma } from '../component/Util';

const Wrap = styled.View`
  padding-left: 20px;
  padding-bottom: 30px;
  padding-right: 20px;
  background-color: #1976d2;
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

export default function ViewStat(props) {
  const { limit, day } = props;

  return (
    <Wrap>
      <Label>
        <Text size={35}>
          한도 {setComma(limit)}원
        </Text>
      </Label>
      <Label>
        <Text>지출 {setComma(day.out)}원</Text>
      </Label>
      <Line></Line>
      <Label>
        <Text>
          남은금액 {setComma(limit - day.out)}원
        </Text>
      </Label>
    </Wrap>
  );
}
