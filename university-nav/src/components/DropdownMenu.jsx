import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'

// DropdownMenu renders one top-level nav item.
// If it has children (passed as props), it becomes a hoverable/clickable
// dropdown. If not, it's a plain link. This is the reusability payoff of
// driving the menu from data instead of writing a component per section.
function DropdownMenu({ item }) {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef(null)

  const hasChildren = item.children && item.children.length > 0

  // Small delay on close so moving the mouse from the parent link
  // to the dropdown panel doesn't close it mid-transit.
  const handleMouseEnter = () => {
    clearTimeout(closeTimer.current)
    setOpen(true)
  }

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 150)
  }

  // Click handling matters for touch/mobile, where there's no hover.
  const handleToggleClick = (e) => {
    if (!hasChildren) return
    e.preventDefault()
    setOpen((prev) => !prev)
  }

  return (
    <li
      className="nav-item"
      onMouseEnter={hasChildren ? handleMouseEnter : undefined}
      onMouseLeave={hasChildren ? handleMouseLeave : undefined}
    >
      <Link
        to={item.path}
        className="nav-link"
        onClick={handleToggleClick}
        aria-haspopup={hasChildren}
        aria-expanded={hasChildren ? open : undefined}
      >
        {item.label}
        {hasChildren && <span className={`caret ${open ? 'caret-open' : ''}`}>▾</span>}
      </Link>

      {hasChildren && (
        <ul className={`dropdown ${open ? 'dropdown-open' : ''}`}>
          {item.children.map((child) => (
            <li key={child.path}>
              <Link
                to={child.path}
                className="dropdown-link"
                onClick={() => setOpen(false)}
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

export default DropdownMenu
