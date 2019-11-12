import React from 'react';
import styled from 'styled-components';
import ConversionForm from './components/ConversionForm/ConversionFormContainer';
import Color from './constants/color';
import "ie-array-find-polyfill";

const Main = styled.div``;

const Header = styled.header`
  background-color: ${Color.SECONDARY};
  display: flex;
  padding-left: 20px;
  font-size: calc(10px + 2vmin);
  color: ${Color.PRIMARY};
`;

const HeaderTitle = styled.h1`
  font-size: 32px;
`;

const Content = styled.div`
  padding:10px;
  text-align: center;
`;


const App: React.FC = () => {
  return (
    <Main>
      <Header className="App-header">
        <HeaderTitle>FX-Calc</HeaderTitle>
      </Header>
      <Content>
        <h2>Convert Your Currency</h2>
        <ConversionForm />
      </Content>
    </Main>
  );
}

export default App;
