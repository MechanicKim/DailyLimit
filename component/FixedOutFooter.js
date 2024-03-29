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

export default function FixedOutFooter(props) {
  const {back, add, save} = props;

  return (
    <Footer>
      <Button onPress={() => back()} activeOpacity={0.7}>
        <Text>목록</Text>
      </Button>
      <Button onPress={() => add()} activeOpacity={0.7}>
        <Text>추가</Text>
      </Button>
      <Button onPress={() => save()} activeOpacity={0.7}>
        <Text>저장</Text>
      </Button>
    </Footer>
  );
}
