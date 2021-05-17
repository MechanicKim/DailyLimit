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

export default function FormFooter(props) {
  const { back, rid, remove, save  } = props;

  return (
    <Footer>
      <Button onPress={() => back()}>
        <Text>취소</Text>
      </Button>
      {rid !== '0' &&
        (
          <Button onPress={() => remove()}>
            <Text>삭제</Text>
          </Button>
        )
      }
      <Button onPress={() => save()}>
        <Text>저장</Text>
      </Button>
    </Footer>
  );
}
