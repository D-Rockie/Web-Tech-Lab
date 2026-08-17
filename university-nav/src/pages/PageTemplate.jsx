// One component renders every leaf page. Content differs only through
// props passed from App.jsx's route definitions.
//
// New: `facts` is an optional array of short strings. When present,
// it renders as a "Quick Facts" panel — a second content block per
// page instead of a single paragraph, still driven entirely by props.
function PageTemplate({ title, description, facts }) {
  return (
    <section className="page">
      <h1>{title}</h1>
      <p>{description}</p>

      {facts && facts.length > 0 && (
        <div className="quick-facts">
          <h2>Quick Facts</h2>
          <ul>
            {facts.map((fact, index) => (
              <li key={index}>{fact}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

export default PageTemplate
