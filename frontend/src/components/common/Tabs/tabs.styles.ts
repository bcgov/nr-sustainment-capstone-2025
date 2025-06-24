import styled from '@emotion/styled';

export const TabsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end; // Align tabs to the bottom
`;

export const Tab = styled.button<{ active: boolean; clickable: boolean }>`
  padding: 10px 20px;
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
  background-color: ${({ active }) => (active ? '#fff' : '#ccc')};
  color: ${({ active }) => (active ? '#000' : '#000')};
  border-bottom: ${({ active }) => (active ? 'none' : 'none')};
  border-top: ${({ active }) => (active ? 'none' : '0.5px solid #fff')};
  border-left: ${({ active }) => (active ? 'none' : '0.5px solid #fff')};
  border-right: ${({ active }) => (active ? 'none' : '0.5px solid #fff')};
  border-radius: 5px 5px 0 0;
  height: 40px;
  margin-top: ${({ active }) => (active ? '0' : '115px')};
`;

export const TabContent = styled.div`
  padding: 10px;
  background-color: #fff;
  width: 100%;
`;