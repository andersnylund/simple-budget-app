import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import ChartContainer from './ChartContainer';

const StyledPaper = styled(Paper)`
  width: 100%;
  overflow-x: auto;
`;

let id = 0;
const addId = transaction => {
  id += 1;
  return { id, party: transaction.party, amount: transaction.amount, date: transaction.date };
};

const SimpleTable = ({ transactions }) => (
  <ChartContainer>
    <StyledPaper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Party</TableCell>
            <TableCell numeric>Amount</TableCell>
            <TableCell numeric>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map(addId).map(t => (
            <TableRow key={t.id}>
              <TableCell component="th" scope="row">
                {t.party}
              </TableCell>
              <TableCell numeric>{t.amount}</TableCell>
              <TableCell numeric>{t.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledPaper>
  </ChartContainer>
);

SimpleTable.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      party: PropTypes.string.isRequired
    })
  ).isRequired
};

export default SimpleTable;
