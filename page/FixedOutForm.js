import React, {Component} from 'react';
import styled from 'styled-components/native';
import {Alert, StatusBar} from 'react-native';

import {BackButton} from 'react-router-native';
import Realm from 'realm';
import moment from 'moment';

import FixedOutRecords from '../component/FixedOutRecords';
import FixedOutBoard from '../component/FixedOutBoard';
import FixedOutFooter from '../component/FixedOutFooter';
import Popup from '../component/Popup';

const Page = styled.SafeAreaView`
  flex: 1;
  background-color: #1976d2;
`;

export default class FixedOutForm extends Component {
  constructor(props) {
    super(props);

    const realm = new Realm();
    const inRecord = realm.objects('FixedIn');
    const outRecords = realm.objects('FixedOutRecord');

    let total = '0';
    if (inRecord[0]) {
      total = String(inRecord[0].in);
    }

    //let records = [{ desc: '', out: '' }];
    let records = [];
    if (outRecords[0]) {
      records = outRecords.map(record => {
        return {
          desc: record.desc,
          out: String(record.out),
        };
      });
    }

    this.state = {total, outRecords: records, popupOn: false, record: null};
  }

  render() {
    let {total, outRecords, popupOn, record} = this.state;
    let lastTotal = parseInt(total || 0, 10);
    outRecords.forEach(r => {
      lastTotal -= parseInt(r.out || 0, 10);
    });

    return (
      <Page>
        <StatusBar barStyle="default" />
        <BackButton />
        <FixedOutRecords
          records={outRecords}
          update={this.openUPdate}
          remove={this.removeOut}
        />
        <FixedOutBoard
          total={total}
          onChangeTotal={this.onChangeTotal}
          lastTotal={lastTotal}
        />
        <FixedOutFooter
          back={this.props.history.goBack}
          add={this.openPopup}
          save={this.saveOut}
        />
        {popupOn && (
          <Popup close={this.closePopup} add={this.addOut} record={record} />
        )}
      </Page>
    );
  }

  onChangeTotal = total => {
    this.setState({total: total.replace(/[^0-9]/g, '')});
  };

  openPopup = () => {
    this.setState({popupOn: true, record: null});
  };

  closePopup = () => {
    this.setState({popupOn: false});
  };

  openUpdate = (record, index) => {
    this.setState({
      popupOn: true,
      record: {index, desc: record.desc, out: record.out},
    });
  };

  addOut = (desc, out) => {
    let {outRecords, record} = this.state;

    if (record) {
      outRecords[record.index] = {desc, out};
    } else {
      outRecords.push({desc, out});
    }

    this.setState({outRecords, popupOn: false, record: null});
  };

  removeOut = key => {
    let {outRecords} = this.state;

    outRecords.splice(key, 1);
    this.setState({outRecords});
  };

  saveOut = () => {
    let {total, outRecords} = this.state;
    if (!total) {
      Alert.alert('알림', '월 수입을 적어주세요.', [{text: '확인'}]);
      return;
    }

    let finalTotal = parseInt(total, 10);
    outRecords.forEach(record => {
      finalTotal -= parseInt(record.out || 0, 10);
    });
    if (finalTotal < 0) {
      Alert.alert('알림', '월 수입이 지출보다 적습니다.', [{text: '확인'}]);
      return;
    }

    const realm = new Realm();
    realm.write(() => {
      realm.delete(realm.objects('FixedIn'));
      realm.delete(realm.objects('FixedOutRecord'));

      const days = moment().daysInMonth();
      const limit = Math.floor(finalTotal / days);
      realm.create('FixedIn', {in: parseInt(total, 10), limit});
      outRecords.forEach((record, index) => {
        if (!record.desc || !record.out) {
          return;
        }
        realm.create('FixedOutRecord', {
          id: index,
          desc: record.desc,
          out: parseInt(record.out, 10),
        });
      });

      const start = moment()
        .startOf('month')
        .format('YYYYMMDD');
      const end = moment();
      const recordDays = end.diff(moment(start, 'YYYYMMDD'), 'days');
      for (let d = 0; d <= recordDays; d++) {
        const id = parseInt(
          moment(start, 'YYYYMMDD')
            .add(d, 'd')
            .format('YYYYMMDD'),
          10,
        );
        const record = realm.objects('Today').filtered(`id = ${id}`)[0];
        record.balance = limit - record.out;
      }

      this.props.history.goBack();
    });
  };
}
