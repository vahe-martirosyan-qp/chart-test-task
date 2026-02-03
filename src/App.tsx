import { Analytics } from './components/Analytics/Analytics';
import { mockEmployees } from './data/mockEmployees';
import styled from 'styled-components';

const AppContainer = styled.div`
  padding: 24px;
`;

function App() {
  return (
    <AppContainer>
      <Analytics employees={mockEmployees} />
    </AppContainer>
  );
}

export default App;
