import { useState } from 'react';

import Sidebar from './Sidebar';
import Home from './Home';

function Dashboard() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
  

        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
     
          <Home />
          

      </div>

  );
}

export default Dashboard;
