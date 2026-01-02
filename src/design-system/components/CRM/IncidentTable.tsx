/**
 * DesignOS CRM Incident Table Component
 *
 * High-density table view for CRM dashboard
 * Strategic decision: 20+ incidents visible per screen (power user efficiency)
 *
 * Features:
 * - Priority-based auto-sorting (critical → top)
 * - Color coding (red, orange, yellow, green)
 * - Row height varies by priority (larger for critical)
 * - 30-second auto-refresh with subtle notifications
 * - Compact design (48px row height)
 */

'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Flame, Clock, Circle, CheckCircle } from 'lucide-react';
import { Button } from '../Button/Button';

export type IncidentPriority = 'critical' | 'high' | 'medium' | 'low';
export type IncidentStatus = 'new' | 'matching' | 'assigned' | 'in-progress' | 'completed';

export interface Incident {
  id: string;
  priority: IncidentPriority;
  clientName: string;
  type: string;
  location: string;
  status: IncidentStatus;
  assignedTo?: string;
  ageMinutes: number;
}

export interface IncidentTableProps {
  incidents: Incident[];
  onIncidentClick?: (incident: Incident) => void;
  onRefresh?: () => void;
  lastRefreshTime?: Date;
  className?: string;
}

const priorityIcons = {
  critical: Flame,
  high: Clock,
  medium: Circle,
  low: CheckCircle,
};

const priorityColors = {
  critical: 'text-red-600',
  high: 'text-amber-600',
  medium: 'text-yellow-600',
  low: 'text-green-600',
};

// Row heights by priority (4. Size indicator)
const rowHeights = {
  critical: 'h-14', // 56px
  high: 'h-13',     // 52px
  medium: 'h-12',   // 48px
  low: 'h-11',      // 44px
};

export function IncidentTable({
  incidents,
  onIncidentClick,
  onRefresh,
  lastRefreshTime,
  className,
}: IncidentTableProps) {
  // Sort by priority (critical first) - 3. Position indicator
  const sortedIncidents = React.useMemo(() => {
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    return [...incidents].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  }, [incidents]);

  // Auto-refresh every 30 seconds (strategic decision)
  React.useEffect(() => {
    if (!onRefresh) return;

    const interval = setInterval(() => {
      onRefresh();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [onRefresh]);

  return (
    <div className={cn('bg-white rounded-lg border overflow-hidden', className)}>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assigned
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Age
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedIncidents.map((incident) => {
              const PriorityIcon = priorityIcons[incident.priority];
              const priorityColor = priorityColors[incident.priority];
              const rowHeight = rowHeights[incident.priority];

              return (
                <tr
                  key={incident.id}
                  className={cn(
                    rowHeight,
                    'hover:bg-gray-50 cursor-pointer transition-colors',
                    // 1. Color indicator (border-left)
                    incident.priority === 'critical' && 'border-l-4 border-red-600 bg-red-50/30',
                    incident.priority === 'high' && 'border-l-4 border-amber-500 bg-amber-50/30',
                    incident.priority === 'medium' && 'border-l-4 border-yellow-400',
                    incident.priority === 'low' && 'border-l-4 border-green-500 opacity-90',
                    // 4. Size/prominence (font weight increases with priority)
                    incident.priority === 'critical' && 'font-semibold'
                  )}
                  onClick={() => onIncidentClick?.(incident)}
                >
                  {/* Priority */}
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      {/* 2. Icon indicator */}
                      <PriorityIcon className={cn('h-4 w-4', priorityColor)} />
                      <span className={cn('text-xs font-semibold uppercase', priorityColor)}>
                        {incident.priority}
                      </span>
                    </div>
                  </td>

                  {/* ID */}
                  <td className="px-4 py-2 text-sm text-gray-900">#{incident.id}</td>

                  {/* Client */}
                  <td className="px-4 py-2 text-sm text-gray-900">{incident.clientName}</td>

                  {/* Type */}
                  <td className="px-4 py-2 text-sm text-gray-600">{incident.type}</td>

                  {/* Location */}
                  <td className="px-4 py-2 text-sm text-gray-600">{incident.location}</td>

                  {/* Status */}
                  <td className="px-4 py-2">
                    <span
                      className={cn(
                        'inline-flex px-2 py-1 text-xs font-medium rounded-full',
                        incident.status === 'new' && 'bg-blue-100 text-blue-800',
                        incident.status === 'matching' && 'bg-purple-100 text-purple-800',
                        incident.status === 'assigned' && 'bg-amber-100 text-amber-800',
                        incident.status === 'in-progress' && 'bg-cyan-100 text-cyan-800',
                        incident.status === 'completed' && 'bg-green-100 text-green-800'
                      )}
                    >
                      {incident.status}
                    </span>
                  </td>

                  {/* Assigned */}
                  <td className="px-4 py-2">
                    {incident.assignedTo ? (
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-medium text-gray-700">
                          {incident.assignedTo.charAt(0)}
                        </div>
                        <span className="text-sm text-gray-600">{incident.assignedTo}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">Unassigned</span>
                    )}
                  </td>

                  {/* Age */}
                  <td className="px-4 py-2">
                    <span
                      className={cn(
                        'text-sm',
                        incident.ageMinutes > 60 && 'text-red-600 font-semibold',
                        incident.ageMinutes <= 60 && 'text-gray-600'
                      )}
                    >
                      {incident.ageMinutes < 60
                        ? `${incident.ageMinutes} min`
                        : `${Math.floor(incident.ageMinutes / 60)}h ${incident.ageMinutes % 60}m`}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        onIncidentClick?.(incident);
                      }}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer with auto-refresh indicator */}
      {lastRefreshTime && (
        <div className="px-4 py-2 bg-gray-50 border-t text-xs text-gray-500 flex items-center justify-between">
          <span>
            Last updated: {lastRefreshTime.toLocaleTimeString()} • {incidents.length} total incidents
          </span>
          <span className="text-blue-600">Auto-refreshing every 30 seconds</span>
        </div>
      )}
    </div>
  );
}

/**
 * Example usage:
 *
 * const [incidents, setIncidents] = useState<Incident[]>([...]);
 * const [lastRefresh, setLastRefresh] = useState(new Date());
 *
 * <IncidentTable
 *   incidents={incidents}
 *   onIncidentClick={(incident) => openIncidentModal(incident)}
 *   onRefresh={async () => {
 *     const updated = await fetchIncidents();
 *     setIncidents(updated);
 *     setLastRefresh(new Date());
 *   }}
 *   lastRefreshTime={lastRefresh}
 * />
 */
