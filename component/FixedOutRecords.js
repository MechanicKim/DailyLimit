import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Scroll = styled.ScrollView`
  flex: 1;
  padding: 10px;
`;

const Record = styled.TouchableOpacity`
  flex-direction: row;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: #ffffff;
`;

const Group = styled.View`
  flex: 1;
`;

const Desc = styled.Text`
  color: #212121;
`;

const Out = styled.Text`
  font-size: 17px;
  color: #212121;
`;

const Button = styled.TouchableOpacity`
  width: 50px;
  padding-horizontal: 10px;
  justify-content: center;
  align-items: center;
`;

export default function FixedOutRecords(props) {
  const { records, update, remove } = props;

  return (
    <Scroll>
    {records.map((record, index) => (
      <Record key={index} onPress={() => update(record, index)} activeOpacity={0.7}>
        <Group>
          <Desc>{record.desc || '없음'}</Desc>
          <Out>{record.out || 0}원</Out>
        </Group>
        <Button onPress={() => remove(index)} activeOpacity={0.7}>
          <Icon name="times" size={17} color="#212121" solid />
        </Button>
      </Record>
    ))}
    </Scroll>
  );
}
