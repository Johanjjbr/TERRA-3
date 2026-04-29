import { RouterProvider } from 'react-router';
import { router } from './routes';
import { TabsProvider } from './contexts/TabsContext';

function App() {
  return (
    <TabsProvider>
      <RouterProvider router={router} />
    </TabsProvider>
  );
}

export default App;