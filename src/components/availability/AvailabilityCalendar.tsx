'use client';

import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight,
  Plus,
  Edit,
  Trash2,
  Clock,
  AlertCircle,
  CheckCircle,
  Info,
  Sun,
  Moon,
  Coffee,
  Repeat
} from 'lucide-react';
import { 
  ScheduledAvailabilityWindow,
  RecurringSchedule,
  WeeklySchedule,
  AvailabilityPeriod,
  AvailabilityStatus,
  BlackoutDate
} from '@/types/availability-management';

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
  windows: ScheduledAvailabilityWindow[];
  recurringPeriods: AvailabilityPeriod[];
  isBlackout: boolean;
}

interface TimeSlot {
  time: string;
  status: AvailabilityStatus;
  capacity: number;
}

const AvailabilityCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);
  const [scheduledWindows, setScheduledWindows] = useState<ScheduledAvailabilityWindow[]>([]);
  const [recurringSchedule, setRecurringSchedule] = useState<RecurringSchedule | null>(null);
  const [blackoutDates, setBlackoutDates] = useState<BlackoutDate[]>([]);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showRecurringModal, setShowRecurringModal] = useState(false);
  const [editingWindow, setEditingWindow] = useState<ScheduledAvailabilityWindow | null>(null);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');

  // Form states
  const [newWindow, setNewWindow] = useState({
    date: '',
    startTime: '',
    endTime: '',
    status: 'offline' as AvailabilityStatus,
    reason: '',
    notes: ''
  });

  const [weeklyScheduleForm, setWeeklyScheduleForm] = useState<WeeklySchedule[]>([]);

  useEffect(() => {
    loadScheduleData();
    generateCalendar();
  }, [currentDate, viewMode]);

  const loadScheduleData = () => {
    // Mock data
    const mockWindows: ScheduledAvailabilityWindow[] = [
      {
        id: 'SW001',
        contractorId: 'C001',
        startDateTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        endDateTime: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'vacation',
        reason: {
          category: 'planned_vacation',
          description: 'Annual family vacation',
          requiresApproval: false
        },
        notes: 'Beach vacation with family',
        createdAt: new Date().toISOString(),
        createdBy: 'contractor',
        notificationsSent: true,
        approved: true,
        approvedBy: 'admin',
        approvalDate: new Date().toISOString(),
        minimumNoticeHours: 168
      },
      {
        id: 'SW002',
        contractorId: 'C001',
        startDateTime: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
        endDateTime: new Date(Date.now() + 22 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'training',
        reason: {
          category: 'training_certification',
          description: 'IICRC Certification Renewal',
          requiresApproval: false
        },
        notes: 'Annual certification renewal',
        createdAt: new Date().toISOString(),
        createdBy: 'contractor',
        notificationsSent: false,
        approved: true,
        approvedBy: 'auto',
        approvalDate: new Date().toISOString(),
        minimumNoticeHours: 48
      }
    ];

    const mockRecurring: RecurringSchedule = {
      id: 'RS001',
      contractorId: 'C001',
      enabled: true,
      weeklySchedule: [
        {
          dayOfWeek: 0, // Sunday
          periods: [{ startTime: '00:00', endTime: '23:59', status: 'offline', capacity: 0 }]
        },
        {
          dayOfWeek: 1, // Monday
          periods: [
            { startTime: '08:00', endTime: '12:00', status: 'available', capacity: 100 },
            { startTime: '12:00', endTime: '13:00', status: 'offline', capacity: 0 },
            { startTime: '13:00', endTime: '18:00', status: 'available', capacity: 100 }
          ]
        },
        {
          dayOfWeek: 2,
          periods: [
            { startTime: '08:00', endTime: '12:00', status: 'available', capacity: 100 },
            { startTime: '12:00', endTime: '13:00', status: 'offline', capacity: 0 },
            { startTime: '13:00', endTime: '18:00', status: 'available', capacity: 100 }
          ]
        },
        {
          dayOfWeek: 3,
          periods: [
            { startTime: '08:00', endTime: '12:00', status: 'available', capacity: 100 },
            { startTime: '12:00', endTime: '13:00', status: 'offline', capacity: 0 },
            { startTime: '13:00', endTime: '18:00', status: 'available', capacity: 100 }
          ]
        },
        {
          dayOfWeek: 4,
          periods: [
            { startTime: '08:00', endTime: '12:00', status: 'available', capacity: 100 },
            { startTime: '12:00', endTime: '13:00', status: 'offline', capacity: 0 },
            { startTime: '13:00', endTime: '18:00', status: 'available', capacity: 100 }
          ]
        },
        {
          dayOfWeek: 5,
          periods: [
            { startTime: '08:00', endTime: '12:00', status: 'available', capacity: 100 },
            { startTime: '12:00', endTime: '13:00', status: 'offline', capacity: 0 },
            { startTime: '13:00', endTime: '17:00', status: 'available', capacity: 75 }
          ]
        },
        {
          dayOfWeek: 6, // Saturday
          periods: [
            { startTime: '09:00', endTime: '13:00', status: 'available', capacity: 50 }
          ]
        }
      ],
      exceptions: [],
      timezone: 'America/Chicago',
      lastUpdated: new Date().toISOString()
    };

    const mockBlackouts: BlackoutDate[] = [
      {
        id: 'BD001',
        contractorId: 'C001',
        startDate: '2024-12-24',
        endDate: '2024-12-26',
        reason: 'Christmas Holiday',
        recurring: true,
        recurringType: 'annual',
        approved: true,
        approvedBy: 'admin'
      },
      {
        id: 'BD002',
        contractorId: 'C001',
        startDate: '2024-07-04',
        endDate: '2024-07-04',
        reason: 'Independence Day',
        recurring: true,
        recurringType: 'annual',
        approved: true,
        approvedBy: 'admin'
      }
    ];

    setScheduledWindows(mockWindows);
    setRecurringSchedule(mockRecurring);
    setBlackoutDates(mockBlackouts);
    setWeeklyScheduleForm(mockRecurring.weeklySchedule);
  };

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days: CalendarDay[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const dayWindows = scheduledWindows.filter(w => {
        const windowStart = new Date(w.startDateTime);
        const windowEnd = new Date(w.endDateTime);
        return date >= windowStart && date <= windowEnd;
      });

      const dayOfWeek = date.getDay();
      const recurringPeriods = recurringSchedule?.weeklySchedule.find(s => s.dayOfWeek === dayOfWeek)?.periods || [];

      const isBlackout = blackoutDates.some(bd => {
        const blackoutStart = new Date(bd.startDate);
        const blackoutEnd = new Date(bd.endDate);
        return date >= blackoutStart && date <= blackoutEnd;
      });

      days.push({
        date,
        isCurrentMonth: date.getMonth() === month,
        isToday: date.getTime() === today.getTime(),
        isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
        windows: dayWindows,
        recurringPeriods,
        isBlackout
      });
    }

    setCalendarDays(days);
  };

  const navigateMonth = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const handleDayClick = (day: CalendarDay) => {
    if (!day.isCurrentMonth) return;
    setSelectedDate(day.date);
    
    // Pre-fill form with date
    const dateStr = day.date.toISOString().split('T')[0];
    setNewWindow(prev => ({ ...prev, date: dateStr }));
    
    if (viewMode === 'month') {
      setViewMode('day');
    }
  };

  const handleScheduleWindow = () => {
    if (!newWindow.date || !newWindow.startTime || !newWindow.endTime) return;

    const startDateTime = new Date(`${newWindow.date}T${newWindow.startTime}`);
    const endDateTime = new Date(`${newWindow.date}T${newWindow.endTime}`);

    const window: ScheduledAvailabilityWindow = {
      id: `SW${Date.now()}`,
      contractorId: 'C001',
      startDateTime: startDateTime.toISOString(),
      endDateTime: endDateTime.toISOString(),
      status: newWindow.status,
      reason: {
        category: 'other',
        description: newWindow.reason,
        requiresApproval: false
      },
      notes: newWindow.notes,
      createdAt: new Date().toISOString(),
      createdBy: 'contractor',
      notificationsSent: false,
      approved: false,
      minimumNoticeHours: 24
    };

    setScheduledWindows([...scheduledWindows, window]);
    setShowScheduleModal(false);
    resetForm();
    generateCalendar();
  };

  const handleDeleteWindow = (windowId: string) => {
    setScheduledWindows(scheduledWindows.filter(w => w.id !== windowId));
    generateCalendar();
  };

  const saveRecurringSchedule = () => {
    if (!recurringSchedule) return;

    const updated: RecurringSchedule = {
      ...recurringSchedule,
      weeklySchedule: weeklyScheduleForm,
      lastUpdated: new Date().toISOString()
    };

    setRecurringSchedule(updated);
    setShowRecurringModal(false);
    generateCalendar();
  };

  const resetForm = () => {
    setNewWindow({
      date: '',
      startTime: '',
      endTime: '',
      status: 'offline',
      reason: '',
      notes: ''
    });
    setEditingWindow(null);
  };

  const getStatusColor = (status: AvailabilityStatus) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      case 'vacation': return 'bg-blue-500';
      case 'sick_leave': return 'bg-red-500';
      case 'training': return 'bg-purple-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusIcon = (status: AvailabilityStatus) => {
    switch (status) {
      case 'available': return CheckCircle;
      case 'busy': return Clock;
      case 'offline': return Moon;
      case 'vacation': return Sun;
      case 'training': return Coffee;
      default: return Info;
    }
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getDayScheduleSummary = (day: CalendarDay) => {
    if (day.isBlackout) return { status: 'blackout', label: 'Blackout' };
    if (day.windows.length > 0) return { status: day.windows[0].status, label: day.windows[0].status };
    
    const hasAvailable = day.recurringPeriods.some(p => p.status === 'available');
    if (hasAvailable) return { status: 'available', label: 'Available' };
    
    return { status: 'offline', label: 'Offline' };
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-centre justify-between mb-4">
          <div className="flex items-centre space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CalendarIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Availability Calendar</h2>
              <p className="text-sm text-gray-500">Plan and manage your future availability</p>
            </div>
          </div>
          <div className="flex items-centre space-x-2">
            <button
              onClick={() => setShowRecurringModal(true)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-centre space-x-2"
            >
              <Repeat className="h-4 w-4" />
              <span>Recurring Schedule</span>
            </button>
            <button
              onClick={() => setShowScheduleModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-centre space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Schedule Window</span>
            </button>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-centre space-x-2">
          {(['month', 'week', 'day'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1 rounded-lg capitalize ${
                viewMode === mode
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-centre justify-between mb-4">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h3 className="text-lg font-semibold">
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Calendar Grid */}
        {viewMode === 'month' && (
          <>
            <div className="grid grid-cols-7 gap-px bg-gray-200">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="bg-gray-50 p-2 text-centre text-sm font-medium">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-px bg-gray-200 mt-px">
              {calendarDays.map((day, index) => {
                const summary = getDayScheduleSummary(day);
                return (
                  <div
                    key={index}
                    onClick={() => handleDayClick(day)}
                    className={`bg-white p-2 min-h-[80px] cursor-pointer hover:bg-gray-50 ${
                      !day.isCurrentMonth ? 'text-gray-400' : ''
                    } ${day.isToday ? 'ring-2 ring-blue-500' : ''}`}
                  >
                    <div className="flex justify-between items-start">
                      <span className={`text-sm font-medium ${
                        day.isWeekend ? 'text-gray-500' : ''
                      }`}>
                        {day.date.getDate()}
                      </span>
                      {day.isBlackout && (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    
                    {/* Status Indicator */}
                    {(day.windows.length > 0 || day.recurringPeriods.length > 0) && (
                      <div className="mt-1">
                        <div className={`text-xs px-1 py-0.5 rounded ${
                          summary.status === 'available' ? 'bg-green-100 text-green-700' :
                          summary.status === 'vacation' ? 'bg-blue-100 text-blue-700' :
                          summary.status === 'training' ? 'bg-purple-100 text-purple-700' :
                          summary.status === 'blackout' ? 'bg-red-100 text-red-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {summary.label}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Day View */}
        {viewMode === 'day' && selectedDate && (
          <div className="mt-4">
            <h4 className="font-medium mb-4">
              {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </h4>

            {/* Time Slots */}
            <div className="space-y-2">
              {Array.from({ length: 24 }, (_, i) => {
                const hour = i.toString().padStart(2, '0');
                const time = `${hour}:00`;
                
                // Check for scheduled windows
                const windowAtTime = scheduledWindows.find(w => {
                  const start = new Date(w.startDateTime);
                  const end = new Date(w.endDateTime);
                  const currentTime = new Date(selectedDate);
                  currentTime.setHours(i);
                  return currentTime >= start && currentTime <= end;
                });

                // Check recurring schedule
                const dayOfWeek = selectedDate.getDay();
                const recurringPeriod = recurringSchedule?.weeklySchedule
                  .find(s => s.dayOfWeek === dayOfWeek)?.periods
                  .find(p => {
                    const [startHour] = p.startTime.split(':').map(Number);
                    const [endHour] = p.endTime.split(':').map(Number);
                    return i >= startHour && i < endHour;
                  });

                const status = windowAtTime?.status || recurringPeriod?.status || 'offline';
                const StatusIcon = getStatusIcon(status);

                return (
                  <div key={i} className="flex items-centre space-x-3 p-2 rounded-lg hover:bg-gray-50">
                    <span className="text-sm text-gray-500 w-16">{formatTime(time)}</span>
                    <div className={`flex-1 p-2 rounded flex items-centre space-x-2 ${
                      status === 'available' ? 'bg-green-50' :
                      status === 'busy' ? 'bg-yellow-50' :
                      status === 'vacation' ? 'bg-blue-50' :
                      status === 'training' ? 'bg-purple-50' :
                      'bg-gray-50'
                    }`}>
                      <StatusIcon className={`h-4 w-4 ${
                        status === 'available' ? 'text-green-600' :
                        status === 'busy' ? 'text-yellow-600' :
                        status === 'vacation' ? 'text-blue-600' :
                        status === 'training' ? 'text-purple-600' :
                        'text-gray-600'
                      }`} />
                      <span className="text-sm capitalize">{status}</span>
                      {windowAtTime && (
                        <span className="text-xs text-gray-500">({windowAtTime.reason.description})</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Scheduled Windows List */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Upcoming Scheduled Windows</h3>
        
        <div className="space-y-3">
          {scheduledWindows
            .filter(w => new Date(w.startDateTime) > new Date())
            .sort((a, b) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime())
            .slice(0, 5)
            .map((window) => {
              const StatusIcon = getStatusIcon(window.status);
              return (
                <div key={window.id} className="flex items-centre justify-between p-3 border rounded-lg">
                  <div className="flex items-centre space-x-3">
                    <StatusIcon className={`h-5 w-5 ${getStatusColor(window.status).replace('bg-', 'text-')}`} />
                    <div>
                      <p className="font-medium">
                        {new Date(window.startDateTime).toLocaleDateString()} - 
                        {new Date(window.endDateTime).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">{window.reason.description}</p>
                      {window.notes && (
                        <p className="text-xs text-gray-500 mt-1">{window.notes}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-centre space-x-2">
                    {window.approved ? (
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                        Approved
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                        Pending
                      </span>
                    )}
                    <button
                      onClick={() => {
                        setEditingWindow(window);
                        setShowScheduleModal(true);
                      }}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Edit className="h-4 w-4 text-gray-500" />
                    </button>
                    <button
                      onClick={() => handleDeleteWindow(window.id)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Schedule Window Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-centre justify-centre z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">
              {editingWindow ? 'Edit' : 'Schedule'} Availability Window
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <input
                  type="date"
                  value={newWindow.date}
                  onChange={(e) => setNewWindow({ ...newWindow, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Start Time</label>
                  <input
                    type="time"
                    value={newWindow.startTime}
                    onChange={(e) => setNewWindow({ ...newWindow, startTime: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">End Time</label>
                  <input
                    type="time"
                    value={newWindow.endTime}
                    onChange={(e) => setNewWindow({ ...newWindow, endTime: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  value={newWindow.status}
                  onChange={(e) => setNewWindow({ ...newWindow, status: e.target.value as AvailabilityStatus })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="offline">Offline</option>
                  <option value="vacation">Vacation</option>
                  <option value="training">Training</option>
                  <option value="sick_leave">Sick Leave</option>
                  <option value="busy">Busy</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Reason</label>
                <input
                  type="text"
                  value={newWindow.reason}
                  onChange={(e) => setNewWindow({ ...newWindow, reason: e.target.value })}
                  placeholder="Brief description..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Notes (Optional)</label>
                <textarea
                  value={newWindow.notes}
                  onChange={(e) => setNewWindow({ ...newWindow, notes: e.target.value })}
                  placeholder="Additional details..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowScheduleModal(false);
                  resetForm();
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleScheduleWindow}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {editingWindow ? 'Update' : 'Schedule'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recurring Schedule Modal */}
      {showRecurringModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-centre justify-centre z-50 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full m-4">
            <h3 className="text-lg font-semibold mb-4">Edit Recurring Weekly Schedule</h3>
            
            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              {weeklyScheduleForm.map((day, dayIndex) => {
                const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][day.dayOfWeek];
                return (
                  <div key={day.dayOfWeek} className="border rounded-lg p-4">
                    <h4 className="font-medium mb-3">{dayName}</h4>
                    <div className="space-y-2">
                      {day.periods.map((period, periodIndex) => (
                        <div key={periodIndex} className="flex items-centre space-x-2">
                          <input
                            type="time"
                            value={period.startTime}
                            onChange={(e) => {
                              const updated = [...weeklyScheduleForm];
                              updated[dayIndex].periods[periodIndex].startTime = e.target.value;
                              setWeeklyScheduleForm(updated);
                            }}
                            className="px-2 py-1 border border-gray-300 rounded"
                          />
                          <span>to</span>
                          <input
                            type="time"
                            value={period.endTime}
                            onChange={(e) => {
                              const updated = [...weeklyScheduleForm];
                              updated[dayIndex].periods[periodIndex].endTime = e.target.value;
                              setWeeklyScheduleForm(updated);
                            }}
                            className="px-2 py-1 border border-gray-300 rounded"
                          />
                          <select
                            value={period.status}
                            onChange={(e) => {
                              const updated = [...weeklyScheduleForm];
                              updated[dayIndex].periods[periodIndex].status = e.target.value as AvailabilityStatus;
                              setWeeklyScheduleForm(updated);
                            }}
                            className="px-2 py-1 border border-gray-300 rounded"
                          >
                            <option value="available">Available</option>
                            <option value="busy">Busy</option>
                            <option value="offline">Offline</option>
                          </select>
                          <input
                            type="number"
                            value={period.capacity || 100}
                            onChange={(e) => {
                              const updated = [...weeklyScheduleForm];
                              updated[dayIndex].periods[periodIndex].capacity = parseInt(e.target.value);
                              setWeeklyScheduleForm(updated);
                            }}
                            className="w-16 px-2 py-1 border border-gray-300 rounded"
                            min="0"
                            max="100"
                          />
                          <span className="text-sm text-gray-500">% capacity</span>
                          <button
                            onClick={() => {
                              const updated = [...weeklyScheduleForm];
                              updated[dayIndex].periods.splice(periodIndex, 1);
                              setWeeklyScheduleForm(updated);
                            }}
                            className="p-1 text-red-500 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const updated = [...weeklyScheduleForm];
                          updated[dayIndex].periods.push({
                            startTime: '09:00',
                            endTime: '17:00',
                            status: 'available',
                            capacity: 100
                          });
                          setWeeklyScheduleForm(updated);
                        }}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        + Add period
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowRecurringModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={saveRecurringSchedule}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailabilityCalendar;