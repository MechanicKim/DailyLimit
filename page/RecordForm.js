import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Alert, StatusBar } from 'react-native';

import { BackButton } from "react-router-native";
import Realm from 'realm';

import FormFooter from '../component/FormFooter';

const Page = styled.SafeAreaView`
  flex: 1;
  background-color: #1976d2;
`;

const Top = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Label = styled.View`
  margin-bottom: 10px;
`;

const Input = styled.TextInput`
  width: 250px;
  background-color: #ffffff;
  border-radius: 5px;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 20px;
`;

const Text = styled.Text`
  text-align: center;
  color: #ffffff;
  font-size: 18px;
  text-align: center;
  font-weight: normal;
`;

export default class ReocrdForm extends Component {
  constructor(props) {
    super(props);

    const realm = new Realm();
    const { rid } = this.props.match.params;
    const outRecord = realm.objects('OutRecord').filtered(`id = ${rid}`)[0];
    if (outRecord) {
      this.state = { title: outRecord.title, out: String(outRecord.out) };
    } else {
      this.state = { title: '', out: '' };
    }
  }

  render() {
    const { title, out } = this.state;
    const { history, match } = this.props;

    return (
      <Page>
        <StatusBar barStyle="default" />
        <BackButton />
        <Top>
          <Label>
            <Text>무엇을 위해 썼나요?</Text>
          </Label>
          <Input value={title} onChangeText={this.onChangeTitle} />
          <Label>
            <Text>얼마나 썼나요?</Text>
          </Label>
          <Input value={out} onChangeText={this.onChangeOut} keyboardType="numeric" />
        </Top>
        <FormFooter back={history.goBack} rid={match.params.rid}
                    remove={this.remove} save={this.save} />
      </Page>
    );
  }

  onChangeTitle = (title) => {
    this.setState({ title });
  }

  onChangeOut = (out) => {
    out = out.replace(/[^0-9]/g, '');
    this.setState({ out });
  }

  remove = () => {
    const { out } = this.state;
    const { id, rid } = this.props.match.params;

    Alert.alert(
      '확인',
      '해당 기록을 삭제할까요?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '삭제',
          onPress: () => {
            const realm = new Realm();
            realm.write(() => {
              let today = realm.objects('Today').filtered(`id = ${id}`)[0];
              let record = realm.objects('OutRecord').filtered(`id = ${rid}`)[0];

              today.out -= parseInt(out);
              today.balance += parseInt(out);
              realm.delete(record);

              this.props.history.goBack();
            });
          }
        },
      ],
      {cancelable: true},
    );
  }

  save = () => {
    const { title, out } = this.state;

    if (!title) {
      Alert.alert('알림', '지출내역을 입력해주세요.', [{ text: '확인' }]);
      return;
    }

    if (!out) {
      Alert.alert('알림', '지출금액을 입력해주세요.', [{ text: '확인' }]);
      return;
    }

    const { id, rid } = this.props.match.params;
    const realm = new Realm();
    realm.write(() => {
      let today = realm.objects('Today').filtered(`id = ${id}`)[0];
      if (parseInt(rid) !== 0) {
        let record = realm.objects('OutRecord').filtered(`id = ${rid}`)[0];
        record.title = title;
        record.out = parseInt(out);
      } else {
        today.records.push({
          id: new Date().getTime(),
          todayId: parseInt(id),
          title,
          out: parseInt(out)
        });
      }

      const fixedInRecord = realm.objects('FixedIn')[0];
      today.out = realm.objects('OutRecord').filtered(`todayId = ${id}`).sum('out');
      //today.balance = fixedInRecord.limit - today.out;
      today.balance -= parseInt(out);

      this.props.history.goBack();
    });
  }
};
