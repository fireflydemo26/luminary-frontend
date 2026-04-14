// GLOW-14: rework — original PR marked Done without verifying AC.
// AC specifies copy: "Add your first widget to get started"
// Previous implementation used: "No widgets yet. Add one to get started."

interface Props {
  onAddWidget: () => void
}

export function DashboardEmptyState({ onAddWidget }: Props) {
  return (
    <div className="dashboard-empty" role="status">
      <div className="dashboard-empty__icon" aria-hidden="true">◫</div>
      <h2 className="dashboard-empty__heading">Add your first widget to get started</h2>
      <p className="dashboard-empty__body">
        Widgets show deployment frequency, incident trends, lead time, and more.
      </p>
      <button className="btn btn--primary" onClick={onAddWidget}>
        Add widget
      </button>
    </div>
  )
}
