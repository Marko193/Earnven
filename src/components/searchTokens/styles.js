import styled from 'styled-components';

export const MainLayout = styled.div`
  display: flex;

  @media (max-width: 1000px) {
    display: none;
  }
`;

export const SearchIcon = styled.img`
  height: 20px;
  width: 17px;
  margin-right: 10px;
`;

export const CoinItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 221px;
  padding-right: 10px;
  border-radius: 10px;

  img {
    width: 20px;
    height: 20px;
  }

  span {
    margin-left: 10px;
  }

  :hover {
    background-color: transparent !important;
  }
`;
