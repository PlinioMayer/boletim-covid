import { Container, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const FullContainer = styled(Container)( ({ theme }) => ({
  flex: 1,
  paddingTop: theme.spacing(8),
  paddingLeft: theme.spacing(4)
}));



const Home = () => (
  <FullContainer maxWidth="lg">
    <Typography variant="subtitle1">
      Acesse uma da entidades para começar
    </Typography>
  </FullContainer>
);

export default Home;