import styled from 'styled-components/native';

const RoundedImage = styled.Image<{ border?: string, width?: number, hiehgt?: number }>`
  border-radius: 999px;
  width: ${({ width }) => width || 60}px;
  height: ${({ height }) => height || 60}px;
  border: ${({ border }) => border || 'none'};
`;

export { RoundedImage };
