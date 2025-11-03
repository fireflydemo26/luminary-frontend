import { Widget } from '@/types'

const WIDGET_TEMPLATES: Array<Pick<Widget, 'type' | 'title'>> = [
  { type: 'chart', title: 'Deployment Frequency' },
  { type: 'metric', title: 'Mean Time to Recovery' },
  { type: 'chart', title: 'Lead Time for Changes' },
  { type: 'table', title: 'Recent Incidents' },
  { type: 'heatmap', title: 'Commit Activity' },
  { type: 'metric', title: 'Change Failure Rate' },
]

interface Props { onSelect: (type: Widget['type'], title: string) => void }

export function WidgetPicker({ onSelect }: Props) {
  return (
    <div className="widget-picker" role="dialog" aria-label="Add widget">
      <h2>Add widget</h2>
      <ul>
        {WIDGET_TEMPLATES.map((t) => (
          <li key={t.title}>
            <button onClick={() => onSelect(t.type, t.title)}>{t.title}</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
