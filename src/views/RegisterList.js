import { Table } from '../components';
import { styled } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const StyledBox = styled(Box)({
  width: '60%',
  margin: '0 auto'
});

const RegisterList = ({ headers, entities, title }) => (
  <StyledBox>
    <Table
      headers={headers}
      entities={entities}
      title={title}
    />
  </StyledBox>
);

export default RegisterList;
