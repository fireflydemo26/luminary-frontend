import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/api/client'
import { Widget } from '@/types'

export function useDashboard(dashboardId: string) {
  return useQuery({
    queryKey: ['dashboard', dashboardId],
    queryFn: () => api.get<{ widgets: Widget[] }>(`/dashboards/${dashboardId}`),
  })
}

export function useAddWidget(dashboardId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (widget: Omit<Widget, 'id'>) =>
      api.post<Widget>(`/dashboards/${dashboardId}/widgets`, widget),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['dashboard', dashboardId] }),
  })
}
