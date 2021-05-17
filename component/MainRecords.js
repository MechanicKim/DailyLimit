import React, { Component } from 'react';
import styled from 'styled-components/native';

import Record from './Record';

const Scroll = styled.ScrollView`
  flex: 1;
`;

export default class MainRecords extends Component {
  render() {
    const { fixedLimit, goToPage, dayRecords } = this.props;
    return (
      <Scroll>
      {
        dayRecords.map((record, index) => {
          return (
            <Record key={record.id}
                    day={record}
                    fixedLimit={fixedLimit} goToPage={goToPage} />
          );
        })
      }
      </Scroll>
    );
  }
};
