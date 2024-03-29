import styled from 'styled-components'

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 3.5rem;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme['gray-100']};
  }
`

export const HistoryList = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    thead {
      tr {
        background-color: ${(props) => props.theme['gray-600']};
      }
    }
    tbody {
      tr {
        background-color: ${(props) => props.theme['gray-700']};
      }
      tr:hover {
        background: ${(props) => props.theme['gray-600']};
      }
    }

    th {
      padding: 1rem;
      text-align: left;
      color: ${(props) => props.theme['gray-100']};
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        width: 50%;
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-left: 1.5rem;
      }
    }
    td {
      border-top: 4px solid ${(props) => props.theme['gray-800']};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;
      &:first-child {
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-left: 1.5rem;
      }
    }
  }
`
export const ListButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme['gray-900']};
  color: ${(props) => props.theme.white};
`
export const ListDeleteButton = styled(ListButton)`
  background: ${(props) => props.theme['red-700']};
`
