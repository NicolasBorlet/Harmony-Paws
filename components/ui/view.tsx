import styled from "styled-components/native";

const GridItem = styled.View`
    padding-vertical: 6px;
    padding-horizontal: 14px;
    border-radius: 20px;
    border: 1px solid #F49819;
`

const GridItemBackground = styled.View`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding-vertical: 20px;
    padding-horizontal: 24px;
    border-radius: 10px;
    background-color: rgba(102, 51, 153, 0.1);
    shadow-color: #000;
    shadow-offset: 0px 4px;
    shadow-opacity: 0.15;
    shadow-radius: 6.3px;
    elevation: 4;
`
const RouteItemView = styled.View<{ even?: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 8px;
    background-color: ${({ even }) => (even ? "rgba(102, 51, 153, 0.1)" : "#FDE6D7")};
    border-radius: 10px;
    height: 100%;
    padding-horizontal: 20px;
    justify-content: center;
`

export { GridItem, GridItemBackground, RouteItemView };
