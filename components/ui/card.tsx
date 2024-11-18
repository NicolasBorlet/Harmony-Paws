import styled from 'styled-components/native';

const DogCard = styled.View`
  border-radius: 20px;
  flex: 1;
  height: 331px;
  padding: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  overflow: hidden;
  gap: 8px;
`;

const RideCard = styled.View`
  border-radius: 20px;
  flex: 1;
  height: 139px;
  padding: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  overflow: hidden;
  gap: 2px;
`;

const MasterDogCard = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding-vertical: 16px;
  padding-horizontal: 12px;
  border-radius: 10px;
  background-color: white;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 29.3px;
  elevation: 4;
`;

export { DogCard, MasterDogCard, RideCard };

