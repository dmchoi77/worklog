import styled from '@emotion/styled';

interface IContainer {
  bgColor: string;
}

export const Container = styled.div<IContainer>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  border: 1px solid lightgrey;
  padding: 12px;
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 8px;
  height: auto;
  box-shadow:
    0px 2px 7px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14),
    0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  background: white;
`;
