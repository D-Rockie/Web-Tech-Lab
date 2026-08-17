import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import PageTemplate from './pages/PageTemplate'
import menuData from './menuData'
import './App.css'

function App() {
  return (
    <div className="app">
      <Navbar items={menuData} universityName="Shiv Nadar University" />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Top-level section pages (Campus Life, Placements, Contact Us
              have no children, so their own path is still a real page). */}
          {menuData.map((item) => (
            <Route
              key={item.path}
              path={item.path}
              element={
                <PageTemplate
                  title={item.label}
                  description={item.description}
                  facts={item.facts}
                />
              }
            />
          ))}

          {/* Submenu pages, e.g. /about/leadership, /academics/phd */}
          {menuData.flatMap((item) =>
            item.children.map((child) => (
              <Route
                key={child.path}
                path={child.path}
                element={
                  <PageTemplate
                    title={child.label}
                    description={child.description}
                    facts={child.facts}
                  />
                }
              />
            ))
          )}

          {/* Fallback for unmatched paths */}
          <Route
            path="*"
            element={
              <PageTemplate
                title="Page Not Found"
                description="The page you're looking for doesn't exist."
              />
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
