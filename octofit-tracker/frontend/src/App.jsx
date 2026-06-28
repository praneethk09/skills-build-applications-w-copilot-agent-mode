import './App.css'

function App() {
  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <h1 className="display-5 fw-bold mb-3">OctoFit Tracker</h1>
              <p className="lead text-muted mb-4">
                A modern multi-tier fitness tracker for logging workouts, managing
                teams, and following your progress.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <a className="btn btn-primary btn-lg" href="/">
                  Explore dashboard
                </a>
                <a className="btn btn-outline-secondary btn-lg" href="/">
                  View leaderboard
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
