import { RouterProvider } from 'react-router';
import { router } from './routes';
import { TabsProvider } from './contexts/TabsContext';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <TabsProvider>
        <RouterProvider router={router} />
      </TabsProvider>
    </AuthProvider>
  );
}

export default App;