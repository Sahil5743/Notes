import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import Notes from './components/Notes';
import ViewNotes from './components/ViewNotes';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: 
      <div>
        <Navbar />
        <Home />
        <Footer /> 
      </div>
    },
    {
      path: "/notes",
      element:
      <div>
        <Navbar />
        <Notes />
        <Footer /> 
      </div>
    },
    {
      path: "/notes/:id",
      element:
      <div>
        <Navbar />
        <ViewNotes />
        <Footer /> 
      </div>
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
