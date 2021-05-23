import React, {Component} from 'react';
import styled from 'styled-components/native';
import {Alert, StatusBar} from 'react-native';

import MainTop from '../component/MainTop';
import MainRecords from '../component/MainRecords';
import MainFooter from '../component/MainFooter';

import SplashScreen from 'react-native-splash-screen';
import {BackButton} from 'react-router-native';
import Realm from 'realm';
import {
  FixedInSchema,
  FixedOutSchema,
  TodaySchema,
  OutRecordSchema,
  SchemaVersion,
} from '../component/Schema';
import moment from 'moment';
import 'moment/locale/ko';

const Page = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
`;

export default class Main extends Component {
  constructor(props) {
    super(props);

    moment.updateLocale('ko', {
      weekdays: [
        '일요일',
        '월요일',
        '화요일',
        '수요일',
        '목요일',
        '금요일',
        '토요일',
      ],
      weekdaysShort: ['일', '월', '화', '수', '목', '금', '토'],
    });

    this.state = {
      dailyLimit: 0,
      total: 0,
      dayRecords: [],
    };
  }

  componentDidMount() {
    SplashScreen.hide();

    Realm.open({
      schema: [FixedInSchema, FixedOutSchema, TodaySchema, OutRecordSchema],
      schemaVersion: SchemaVersion,
      migration: (oldRealm, newRelam) => {},
    }).then(realm => {
      realm.write(() => {
        /* 고정 수입 불러오기 */
        const fixedInRecord = realm.objects('FixedIn');
        let dailyLimit = 0;
        if (!fixedInRecord[0]) {
          realm.create('FixedIn', {in: 0, limit: 0});
        } else {
          dailyLimit = fixedInRecord[0].limit;
        }

        /* 시작과 끝 지정 */
        let start = moment().startOf('month');
        let end = moment();
        if (this.props.match.params.ym) {
          start = moment(this.props.match.params.ym, 'YYYYMM').startOf('month');
          end = moment(this.props.match.params.ym, 'YYYYMM').endOf('month');
        }

        /* 시작에서 끝까지 지출 내역 불러오기 */
        const query = `id >= ${start.format('YYYYMMDD')} AND id <= ${end.format(
          'YYYYMMDD',
        )}`;
        const dayRecords = realm
          .objects('Today')
          .filtered(query)
          .sorted('id', true);

        /* 일별 잔액 갱신 */
        const days = end.diff(start, 'days');
        let balance = 0;
        for (let d = 0; d <= days; d++) {
          const id = parseInt(
            moment(start)
              .add(d, 'd')
              .format('YYYYMMDD'),
            10,
          );
          const record = realm.objects('Today').filtered(`id = ${id}`)[0];
          if (!record) {
            balance += dailyLimit;
            realm.create('Today', {id, out: 0, balance: balance});
          } else {
            balance += dailyLimit - record.out;
            record.balance = balance;
          }
        }

        this.setState({total: dayRecords[0].balance, dailyLimit, dayRecords});
      });
    });
  }

  render() {
    const {total, dailyLimit, dayRecords} = this.state;
    let date = '';
    if (dayRecords.length > 0) {
      date = moment(dayRecords[0].id, 'YYYYMMDD').format('YYYY년 M월');
    }

    return (
      <Page>
        <StatusBar barStyle="default" />
        <BackButton />
        <MainTop
          today={dayRecords[0] || {}}
          fixedLimit={dailyLimit}
          total={total}
          goToPage={this.goToPage}
        />
        <MainRecords
          fixedLimit={dailyLimit}
          dayRecords={dayRecords}
          goToPage={this.goToPage}
        />
        <MainFooter date={date} getRecords={this.getRecords} />
      </Page>
    );
  }

  goToPage = url => {
    this.props.history.push(`/${url}`);
  };

  getRecords = add => {
    const {dayRecords} = this.state;
    const date = moment(dayRecords[0].id, 'YYYYMMDD').add(add, 'month');

    const start = date.startOf('month').format('YYYYMMDD');
    const end = date.endOf('month').format('YYYYMMDD');

    const query = `id >= ${start} AND id <= ${end}`;
    const realm = new Realm();
    const newRecords = realm
      .objects('Today')
      .filtered(query)
      .sorted('id', true);
    if (newRecords.length === 0) {
      Alert.alert('알림', '지출 기록이 없습니다.', [{text: '확인'}]);
      return;
    }

    this.props.history.replace(`/main/${date.format('YYYYMM')}`);
    this.setState({total: newRecords[0].balance, dayRecords: newRecords});
  };
}
