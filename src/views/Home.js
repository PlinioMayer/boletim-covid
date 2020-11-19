import { Container, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const FullContainer = styled(Container)( ({ theme }) => ({
  flex: 1,
  paddingTop: 128,
  paddingLeft: theme.spacing(8)
}));



const Home = () => (
  <FullContainer maxWidth="lg">
    <Typography variant="subtitle1">
      Acesse uma da entidades para começar
    </Typography>
  </FullContainer>
);

export default Home;