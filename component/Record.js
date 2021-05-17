import React, { Component } from 'react';
import styled, { css } from 'styled-components/native';

import { setComma } from './Util';
import moment from "moment";
import Icon from 'react-native-vector-icons/FontAwesome5';

const Wrap = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
`;

const Record = styled.View`
  flex-direction: row;
  background-color: #fafafa;
`;

const Toggle = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
`;

const Group1 = styled.View`
  width: 70px;
  justify-content: center;
  align-items: center;
`;

const Date = styled.Text`
  color: #000000;
  font-size: 15px;
  text-align: center;
  padding-vertical: 2px;
`;

const Group2 = styled.View`
  flex: 1;
  justify-content: center;
  border-left-width: 1px;
  border-left-color: #eeeeee;
`;

const Group3 = styled.View`
  width: 70px;
  justify-content: center;
  border-left-width: 1px;
  border-left-color: #eeeeee;
`;

const Text = styled.Text`
  ${props => css`
    color: ${props.color || '#000000'}
    text-align: ${props.align || 'center'};
  `}
  font-size: 15px;
  padding-vertical: 7px;
  padding-horizontal: 5px;
`;

const Text1 = styled.Text`
  color: #000000;
  text-align: center;
  font-size: 15px;
  padding-vertical: 2px;
`;

const Hr = styled.View`
  width: 100%;
  height: 1px;
  background-color: #eeeeee;
`;

const Link = styled.TouchableOpacity`
  width: 50px;
  justify-content: center;
  align-items: center;

  border-left-width: 1px;
  border-left-color: #eeeeee;
`;

const Detail = styled.View`
  flex-direction: row;
  background-color: #eeeeee;
`;

const DetailDesc = styled.Text`
  flex: 1;
  margin-left: 140px;
  padding-vertical: 5px;
  padding-right: 5px;
  color: #212121;
  font-size: 15px;
  text-align: right;
`;

const DetailPrice = styled.Text`
  flex: 1;
  margin-right: 50px;
  padding-vertical: 5px;
  padding-right: 5px;
  color: #212121;
  font-size: 15px;
  text-align: right;
`;

export default class MainBottom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.day.id !== prevProps.day.id) {
      this.setState({ detail: false });
    }
  }

  render() {
    const { detail } = this.state;
    const { day, fixedLimit, goToPage } = this.props;
    const date1 = moment(day.id, 'YYYYMMDD').format('M/D', 'ko');
    const date2 = moment(day.id, 'YYYYMMDD').format('ddd', 'ko');

    return (
      <Wrap>
        <Record>
          <Toggle onPress={e => this.setState({detail: !detail})} activeOpacity={0.7}>
            <Group1>
              <Date>{date1}</Date>
              <Date>{date2}요일</Date>
            </Group1>
            <Group2>
              <Text1>지출</Text1>
              <Text1>{setComma(day.out)}원</Text1>
            </Group2>
            <Group3>
              <Text>잔액</Text>
              <Hr />
              <Text>누적</Text>
            </Group3>
            <Group2>
              <Text align="right" color={day.balance < 0 ? '#bf360c' : '#0d47a1'}>
                {setComma(fixedLimit - day.out)}원
              </Text>
              <Hr />
              <Text align="right">
                {setComma(day.balance)}원
              </Text>
            </Group2>
          </Toggle>
          <Link onPress={() => goToPage(`record/${day.id}`)}>
            <Icon name="angle-right" size={25} color="#424242" />
          </Link>
        </Record>
        {
          (detail && day.records.length > 0) &&
          <>
            {day.records.map(record => {
              return (
                <Detail key={record.id}>
                  <DetailDesc>{record.title}</DetailDesc>
                  <DetailPrice size={15}>{setComma(record.out)}원</DetailPrice>
                </Detail>
              )
            })}
          </>
        }
      </Wrap>
    );
  }
};
