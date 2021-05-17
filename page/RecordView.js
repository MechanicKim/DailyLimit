import React, { Component } from 'react';
import styled, { css } from 'styled-components/native';
import { StatusBar } from 'react-native';
import { BackButton } from "react-router-native";
import Realm from 'realm';
import moment from "moment";

import ViewStat from '../component/ViewStat';
import ViewRecords from '../component/ViewRecords';
import ViewFooter from '../component/ViewFooter';

const Page = styled.SafeAreaView`
  flex: 1;
  background-color: #1976d2;
`;

const Label = styled.Text`
  padding-vertical: 10px;
  padding-horizontal: 15px;
  color: #ffffff;
  font-size: 18px;
`;

export default class RecordView extends Component {
  constructor(props) {
    super(props);

    const realm = new Realm();
    const fixedInRecord = realm.objects('FixedIn')[0];
    const todayId = this.props.match.params.id;
    const day = realm.objects('Today').filtered(`id = ${todayId}`)[0];

    this.date = moment(day.id, 'YYYYMMDD').format('YYYY년 M월 D일 ddd', 'ko');
    this.state = { day, limit: fixedInRecord.limit };
  }

  render() {
    const { day, limit } = this.state;

    return (
      <Page>
        <StatusBar barStyle="default" />
        <BackButton />
        <Label>{this.date}</Label>
        <ViewStat limit={limit} day={day} />
        <ViewRecords day={day} update={this.goToForm} />
        <ViewFooter back={this.props.history.goBack} update={this.goToForm} />
      </Page>
    );
  }

  goToForm = id => {
    this.props.history.push(`/record/${this.state.day.id}/${id || 0}`);
  }
};
