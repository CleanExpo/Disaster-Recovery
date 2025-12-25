'use client';

import { useEffect, useState } from 'react';
import { useReportSchedules } from '@/hooks/useDashboards';

interface ReportScheduleManagerProps {
  dashboardId: string;
  onScheduleCreated?: (schedule: any) => void;
}

/**
 * Report Schedule Manager Component
 *
 * Manage scheduled reports and deliveries for dashboards
 */
export function ReportScheduleManager({ dashboardId, onScheduleCreated }: ReportScheduleManagerProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    frequency: 'daily' as const,
    recipients: '',
    format: 'pdf' as const,
    time: '09:00',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    customCron: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { schedules, isLoading, error, createSchedule, updateSchedule, deleteSchedule, pauseSchedule, resumeSchedule } =
    useReportSchedules(dashboardId);

  const handleCreateSchedule = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert('Schedule name is required');
      return;
    }

    if (!formData.recipients.trim()) {
      alert('At least one recipient is required');
      return;
    }

    setIsSubmitting(true);

    try {
      const recipientList = formData.recipients
        .split(',')
        .map(r => r.trim())
        .filter(r => r);

      await createSchedule(
        formData.name,
        formData.frequency,
        recipientList,
        formData.format,
        formData.frequency === 'custom' ? formData.customCron : undefined
      );

      setFormData({
        name: '',
        frequency: 'daily',
        recipients: '',
        format: 'pdf',
        time: '09:00',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        customCron: '',
      });
      setShowCreateForm(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleSchedule = async (scheduleId: string, isPaused: boolean) => {
    if (isPaused) {
      await resumeSchedule(scheduleId);
    } else {
      await pauseSchedule(scheduleId);
    }
  };

  const handleDeleteSchedule = async (scheduleId: string) => {
    if (confirm('Are you sure you want to delete this schedule?')) {
      await deleteSchedule(scheduleId);
    }
  };

  if (isLoading && !schedules) {
    return (
      <div className="bg-white rounded-lg shadow p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-800">Error: {error}</p>
      </div>
    );
  }

  const getFrequencyLabel = (frequency: string) => {
    switch (frequency) {
      case 'daily':
        return '📅 Daily';
      case 'weekly':
        return '📆 Weekly';
      case 'monthly':
        return '📊 Monthly';
      case 'custom':
        return '⚙️ Custom';
      default:
        return frequency;
    }
  };

  const getFormatEmoji = (format: string) => {
    switch (format) {
      case 'pdf':
        return '📄';
      case 'email':
        return '📧';
      case 'slack':
        return '💬';
      case 'webhook':
        return '🔗';
      default:
        return '📋';
    }
  };

  const getFrequencyDescription = (frequency: string) => {
    switch (frequency) {
      case 'daily':
        return 'Delivered every day at the specified time';
      case 'weekly':
        return 'Delivered every week on the specified day';
      case 'monthly':
        return 'Delivered on the first day of each month';
      case 'custom':
        return 'Custom schedule based on cron expression';
      default:
        return 'Custom schedule';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">📧 Report Schedules</h2>
          <p className="text-gray-600 mt-1">Automate report delivery to your team</p>
        </div>

        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
        >
          {showCreateForm ? '✕ Cancel' : '+ New Schedule'}
        </button>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Create Report Schedule</h3>

          <form onSubmit={handleCreateSchedule} className="space-y-4">
            {/* Schedule Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Schedule Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Weekly Team Report, Daily Metrics"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Recipients */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Recipients *</label>
              <input
                type="text"
                value={formData.recipients}
                onChange={(e) => setFormData({ ...formData, recipients: e.target.value })}
                placeholder="team@company.com, john@company.com (comma-separated)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <p className="text-xs text-gray-600 mt-1">Separate multiple recipients with commas</p>
            </div>

            {/* Frequency Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {(['daily', 'weekly', 'monthly', 'custom'] as const).map((freq) => (
                  <label
                    key={freq}
                    className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                      formData.frequency === freq
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="frequency"
                      value={freq}
                      checked={formData.frequency === freq}
                      onChange={(e) => setFormData({ ...formData, frequency: e.target.value as any })}
                      className="w-4 h-4"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {getFrequencyLabel(freq)}
                    </span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-gray-600 mt-2">{getFrequencyDescription(formData.frequency)}</p>
            </div>

            {/* Custom Cron (if custom frequency selected) */}
            {formData.frequency === 'custom' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cron Expression *</label>
                <input
                  type="text"
                  value={formData.customCron}
                  onChange={(e) => setFormData({ ...formData, customCron: e.target.value })}
                  placeholder="0 9 * * 1 (9 AM every Monday)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                  required={formData.frequency === 'custom'}
                />
                <p className="text-xs text-gray-600 mt-1">
                  Format: minute hour day month weekday (0=Sunday)
                </p>
              </div>
            )}

            {/* Time Selection */}
            {formData.frequency !== 'custom' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Time</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                  <select
                    value={formData.timezone}
                    onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">EST</option>
                    <option value="America/Chicago">CST</option>
                    <option value="America/Denver">MST</option>
                    <option value="America/Los_Angeles">PST</option>
                    <option value="Europe/London">GMT</option>
                    <option value="Europe/Paris">CET</option>
                    <option value="Asia/Tokyo">JST</option>
                    <option value="Asia/Hong_Kong">HKT</option>
                    <option value="Australia/Sydney">AEDT</option>
                  </select>
                </div>
              </div>
            )}

            {/* Format Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Format</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {(['pdf', 'email', 'slack', 'webhook'] as const).map((fmt) => (
                  <label
                    key={fmt}
                    className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                      formData.format === fmt
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="format"
                      value={fmt}
                      checked={formData.format === fmt}
                      onChange={(e) => setFormData({ ...formData, format: e.target.value as any })}
                      className="w-4 h-4"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {getFormatEmoji(fmt)} {fmt.charAt(0).toUpperCase() + fmt.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-2 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold rounded-lg transition-colors"
              >
                {isSubmitting ? 'Creating...' : 'Create Schedule'}
              </button>

              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Schedules List */}
      <div>
        {schedules && schedules.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {schedules.map((schedule: any) => (
              <div
                key={schedule.id}
                className={`bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 border-l-4 ${
                  schedule.isPaused ? 'border-gray-400' : 'border-blue-500'
                }`}
              >
                {/* Schedule Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg">{schedule.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {getFrequencyLabel(schedule.frequency)}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 ${
                      schedule.isPaused
                        ? 'bg-gray-100 text-gray-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {schedule.isPaused ? '⏸️ Paused' : '▶️ Active'}
                  </span>
                </div>

                {/* Schedule Details */}
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center text-gray-700">
                    <span className="w-24 font-medium">Frequency:</span>
                    <span>{schedule.frequency === 'custom' ? `Custom (${schedule.cronExpression})` : schedule.frequency}</span>
                  </div>

                  {schedule.deliveryTime && (
                    <div className="flex items-center text-gray-700">
                      <span className="w-24 font-medium">Time:</span>
                      <span>{schedule.deliveryTime} {schedule.timezone}</span>
                    </div>
                  )}

                  <div className="flex items-center text-gray-700">
                    <span className="w-24 font-medium">Format:</span>
                    <span>{getFormatEmoji(schedule.format)} {schedule.format}</span>
                  </div>

                  <div className="flex items-start text-gray-700">
                    <span className="w-24 font-medium">Recipients:</span>
                    <span className="flex-1">{schedule.recipients.join(', ')}</span>
                  </div>
                </div>

                {/* Execution Stats */}
                {schedule.lastExecutedAt && (
                  <div className="mb-4 p-3 bg-gray-50 rounded text-sm">
                    <p className="text-gray-700">
                      Last executed: {new Date(schedule.lastExecutedAt).toLocaleString()}
                    </p>
                    {schedule.nextExecutionAt && (
                      <p className="text-gray-700 mt-1">
                        Next execution: {new Date(schedule.nextExecutionAt).toLocaleString()}
                      </p>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggleSchedule(schedule.id, schedule.isPaused)}
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      schedule.isPaused
                        ? 'bg-green-100 hover:bg-green-200 text-green-700'
                        : 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700'
                    }`}
                  >
                    {schedule.isPaused ? '▶️ Resume' : '⏸️ Pause'}
                  </button>

                  <button
                    onClick={() => handleDeleteSchedule(schedule.id)}
                    className="px-3 py-2 text-sm font-medium rounded-lg bg-red-100 hover:bg-red-200 text-red-700 transition-colors"
                  >
                    🗑️ Delete
                  </button>
                </div>

                {/* Schedule Created Info */}
                <p className="text-xs text-gray-500 mt-3">
                  Created {new Date(schedule.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-600 text-lg mb-2">No scheduled reports yet</p>
            <p className="text-gray-500">Create your first schedule to automate report delivery</p>
          </div>
        )}
      </div>
    </div>
  );
}
