import React, {Component} from 'react';
import styled from 'styled-components/native';
import {Alert} from 'react-native';

const Popup = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;

const Form = styled.View`
  margin-top: 50px;
  margin-horizontal: 20px;
  padding: 20px;
  border-radius: 5px;
  background-color: #ffffff;
`;

const DescInput = styled.TextInput`
  padding-horizontal: 10px;
  border-radius: 3px;
  font-size: 17px;
  color: #212121;
  background-color: #eeeeee;
`;

const PriceInput = styled.TextInput`
  padding-horizontal: 10px;
  margin-top: 10px;
  border-radius: 3px;
  font-size: 17px;
  color: #212121;
  background-color: #eeeeee;
`;

const Group = styled.View`
  flex-direction: row;
`;

const Button = styled.TouchableOpacity`
  flex: 1;
  padding-vertical: 15px;
  padding-horizontal: 10px;
`;

const Text = styled.Text`
  font-size: 17px;
  text-align: center;
`;

export default class FixedOutForm extends Component {
  constructor(props) {
    super(props);

    if (this.props.record) {
      this.state = {
        desc: this.props.record.desc,
        out: this.props.record.out,
      };
    } else {
      this.state = {desc: '', out: ''};
    }
  }

  render() {
    let {desc, out} = this.state;

    return (
      <Popup>
        <Form>
          <DescInput
            value={desc}
            onChangeText={this.onChangeDesc}
            placeholder="지출내역"
            placeholderTextColor="#212121"
          />
          <PriceInput
            value={out}
            onChangeText={this.onChangeAmount}
            placeholder="금액"
            placeholderTextColor="#212121"
            keyboardType="numeric"
          />
          <Group>
            <Button activeOpacity={0.7} onPress={this.props.close}>
              <Text>취소</Text>
            </Button>
            {this.props.record && (
              <Button activeOpacity={0.7} onPress={this.add}>
                <Text>수정</Text>
              </Button>
            )}
            {!this.props.record && (
              <Button activeOpacity={0.7} onPress={this.add}>
                <Text>추가</Text>
              </Button>
            )}
          </Group>
        </Form>
      </Popup>
    );
  }

  onChangeDesc = desc => {
    this.setState({desc});
  };

  onChangeAmount = out => {
    this.setState({out: out.replace(/[^0-9]/g, '')});
  };

  add = () => {
    const {desc, out} = this.state;

    if (!desc) {
      Alert.alert('알림', '지출내역을 적어주세요.', [{text: '확인'}]);
      return;
    }

    if (!out) {
      Alert.alert('알림', '지출금액을 적어주세요.', [{text: '확인'}]);
      return;
    }

    this.props.add(desc, out);
  };
}
