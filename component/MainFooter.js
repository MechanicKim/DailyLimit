import React from 'react';
import styled from 'styled-components/native';

const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  padding-vertical: 15px;
  background-color: #212121;
`;

const Button = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
`;

const Text = styled.Text`
  color: #fafafa;
  font-size: 18px;
`;

export default function MainFooter(props) {
  const {date, getRecords} = props;

  return (
    <Footer>
      <Button onPress={() => getRecords(-1)} activeOpacity={0.7}>
        <Text>이전</Text>
      </Button>
      <Button activeOpacity={1}>
        <Text>{date}</Text>
      </Button>
      <Button onPress={() => getRecords(1)} activeOpacity={0.7}>
        <Text>다음</Text>
      </Button>
    </Footer>
  );
}
