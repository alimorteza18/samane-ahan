import styled from "styled-components";

export const TableContainer = styled.div`
  position: relative;
  display: block;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  max-width: 100%;
  height: 500px;
  overflow-y: auto;
  margin-top: 40px;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  margin-top: 20px;
  font-size: 0.9em;
  border: 1px solid #ddd;
  border-radius: 10px;

  thead {
    position: sticky;
    top: 0;
    z-index: 1;
  }

  th {
    background-color: #fff;
    color: black;
    padding: 12px;
    font-weight: 800;
    font-size: 0.9rem;
    text-align: center;
  }

  tr:first-child th:first-child {
    border-top-right-radius: 10px;
  }
  tr:first-child th:last-child {
    border-top-left-radius: 10px;
  }
  tr:last-child td:first-child {
    border-bottom-right-radius: 10px;
  }
  tr:last-child td:last-child {
    border-bottom-left-radius: 10px;
  }

  td {
    background-color: hsl(240, 50%, 90%);
    padding: 5px;
    text-align: center;
  }

  tr:nth-child(even) td {
    background-color: #ffffff;
  }

  tr:nth-child(odd) td {
    background-color: #f2f2f2;
  }

  tr:hover td {
    background-color: #ddd;
  }
`;
