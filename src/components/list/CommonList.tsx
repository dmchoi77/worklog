import styled from '@emotion/styled';

export interface IList {
  isDraggingOver: boolean;
}

export const List = styled.div<IList>`
  flex-grow: 1;
`;
