import styled from '@emotion/styled';

export interface IList {
  isDraggingOver: boolean;
}

export const List = styled.div<IList>`
  flex-grow: 1;
  padding: 10px 0;
  height: 100%;
  overflow-y: auto;
`;
