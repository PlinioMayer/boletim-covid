import { styled } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const UnstyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit'
});

export default UnstyledLink;
