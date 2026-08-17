import { Link } from 'react-router-dom'
import DropdownMenu from './DropdownMenu'

// Navbar receives the menu structure as a prop and maps over it.
// It doesn't know or care what the individual items are — that
// separation is what lets menuData.js change without touching this file.
function Navbar({ items, universityName }) {
  return (
    <header className="navbar">
      <Link to="/" className="brand">
        {universityName}
      </Link>
      <nav>
        <ul className="nav-list">
          {items.map((item) => (
            <DropdownMenu key={item.path} item={item} />
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
