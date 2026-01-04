'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'

interface NotificationPreferences {
  soundEnabled: boolean
  soundType: string
  smsEnabled: boolean
  smsPhone: string | null
  smsOfflineDelay: number
  newJobEnabled: boolean
  statusUpdateEnabled: boolean
  urgentJobAlarm: boolean
  quietHoursEnabled: boolean
  quietHoursStart: string | null
  quietHoursEnd: string | null
  quietHoursTimezone: string
}

interface NotificationSettingsProps {
  className?: string
}

const SOUND_OPTIONS = [
  { value: 'subtle_chime', label: 'Subtle Chime', description: 'Gentle notification' },
  { value: 'urgent_alarm', label: 'Urgent Alarm', description: 'Attention-grabbing' },
  { value: 'bell', label: 'Bell', description: 'Classic bell sound' },
  { value: 'none', label: 'None', description: 'Silent notifications' },
]

const TIMEZONE_OPTIONS = [
  { value: 'Australia/Sydney', label: 'Sydney (AEST/AEDT)' },
  { value: 'Australia/Melbourne', label: 'Melbourne (AEST/AEDT)' },
  { value: 'Australia/Brisbane', label: 'Brisbane (AEST)' },
  { value: 'Australia/Perth', label: 'Perth (AWST)' },
  { value: 'Australia/Adelaide', label: 'Adelaide (ACST/ACDT)' },
  { value: 'Australia/Darwin', label: 'Darwin (ACST)' },
  { value: 'Australia/Hobart', label: 'Hobart (AEST/AEDT)' },
]

export function NotificationSettings({ className }: NotificationSettingsProps) {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    soundEnabled: true,
    soundType: 'subtle_chime',
    smsEnabled: true,
    smsPhone: null,
    smsOfflineDelay: 120,
    newJobEnabled: true,
    statusUpdateEnabled: true,
    urgentJobAlarm: true,
    quietHoursEnabled: false,
    quietHoursStart: '22:00',
    quietHoursEnd: '07:00',
    quietHoursTimezone: 'Australia/Sydney',
  })

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  // Fetch current preferences
  useEffect(() => {
    async function fetchPreferences() {
      try {
        const res = await fetch('/api/realtime/notifications/settings')
        if (res.ok) {
          const data = await res.json()
          setPreferences(data)
        }
      } catch (error) {
        console.error('Failed to fetch preferences:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPreferences()
  }, [])

  // Update preference
  const updatePreference = useCallback(<K extends keyof NotificationPreferences>(
    key: K,
    value: NotificationPreferences[K]
  ) => {
    setPreferences(prev => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }, [])

  // Save preferences
  const savePreferences = async () => {
    setIsSaving(true)
    try {
      const res = await fetch('/api/realtime/notifications/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferences),
      })

      if (res.ok) {
        setHasChanges(false)
      }
    } catch (error) {
      console.error('Failed to save preferences:', error)
    } finally {
      setIsSaving(false)
    }
  }

  // Play sound preview
  const playSound = (soundType: string) => {
    if (typeof window === 'undefined' || !('AudioContext' in window)) return

    try {
      const audioContext = new AudioContext()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      switch (soundType) {
        case 'subtle_chime':
          oscillator.frequency.value = 523.25 // C5
          oscillator.type = 'sine'
          gainNode.gain.value = 0.1
          break
        case 'urgent_alarm':
          oscillator.frequency.value = 880 // A5
          oscillator.type = 'square'
          gainNode.gain.value = 0.15
          break
        case 'bell':
          oscillator.frequency.value = 659.25 // E5
          oscillator.type = 'triangle'
          gainNode.gain.value = 0.12
          break
        default:
          return
      }

      oscillator.start()
      oscillator.stop(audioContext.currentTime + 0.3)
    } catch {
      // Audio not supported
    }
  }

  if (isLoading) {
    return (
      <Card className={className}>
        <CardContent className="py-8 text-center text-muted-foreground">
          Loading preferences...
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Sound Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Sound Notifications</CardTitle>
          <CardDescription>
            Configure how you receive audio notifications for new jobs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="sound-enabled">Enable Sounds</Label>
              <p className="text-sm text-muted-foreground">
                Play audio for notifications
              </p>
            </div>
            <Switch
              id="sound-enabled"
              checked={preferences.soundEnabled}
              onCheckedChange={(checked) => updatePreference('soundEnabled', checked)}
            />
          </div>

          {preferences.soundEnabled && (
            <>
              <div className="space-y-2">
                <Label>Notification Sound</Label>
                <div className="flex gap-2">
                  <Select
                    value={preferences.soundType}
                    onValueChange={(value) => updatePreference('soundType', value)}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {SOUND_OPTIONS.map((sound) => (
                        <SelectItem key={sound.value} value={sound.value}>
                          <div>
                            <div>{sound.label}</div>
                            <div className="text-xs text-muted-foreground">
                              {sound.description}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => playSound(preferences.soundType)}
                    disabled={preferences.soundType === 'none'}
                  >
                    🔊
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="urgent-alarm">Urgent Job Alarm</Label>
                  <p className="text-sm text-muted-foreground">
                    Louder alarm for emergency jobs
                  </p>
                </div>
                <Switch
                  id="urgent-alarm"
                  checked={preferences.urgentJobAlarm}
                  onCheckedChange={(checked) => updatePreference('urgentJobAlarm', checked)}
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Notification Types */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Notification Types</CardTitle>
          <CardDescription>
            Choose which events trigger notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="new-job">New Job Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Notify when a new job is available
              </p>
            </div>
            <Switch
              id="new-job"
              checked={preferences.newJobEnabled}
              onCheckedChange={(checked) => updatePreference('newJobEnabled', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="status-update">Status Updates</Label>
              <p className="text-sm text-muted-foreground">
                Notify on job status changes
              </p>
            </div>
            <Switch
              id="status-update"
              checked={preferences.statusUpdateEnabled}
              onCheckedChange={(checked) => updatePreference('statusUpdateEnabled', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* SMS Fallback */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">SMS Fallback</CardTitle>
          <CardDescription>
            Receive SMS when you&apos;re offline or miss notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="sms-enabled">Enable SMS Fallback</Label>
              <p className="text-sm text-muted-foreground">
                Send SMS for critical alerts when offline
              </p>
            </div>
            <Switch
              id="sms-enabled"
              checked={preferences.smsEnabled}
              onCheckedChange={(checked) => updatePreference('smsEnabled', checked)}
            />
          </div>

          {preferences.smsEnabled && (
            <>
              <div className="space-y-2">
                <Label htmlFor="sms-phone">Mobile Number</Label>
                <Input
                  id="sms-phone"
                  type="tel"
                  placeholder="04XX XXX XXX"
                  value={preferences.smsPhone || ''}
                  onChange={(e) => updatePreference('smsPhone', e.target.value || null)}
                />
                <p className="text-xs text-muted-foreground">
                  Australian mobile number for SMS alerts
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Offline Delay</Label>
                  <span className="text-sm text-muted-foreground">
                    {Math.floor(preferences.smsOfflineDelay / 60)} min {preferences.smsOfflineDelay % 60} sec
                  </span>
                </div>
                <Slider
                  value={[preferences.smsOfflineDelay]}
                  onValueChange={([value]) => updatePreference('smsOfflineDelay', value)}
                  min={30}
                  max={300}
                  step={30}
                />
                <p className="text-xs text-muted-foreground">
                  Time to wait before sending SMS when offline
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Quiet Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quiet Hours</CardTitle>
          <CardDescription>
            Silence non-urgent notifications during specific times
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="quiet-hours">Enable Quiet Hours</Label>
              <p className="text-sm text-muted-foreground">
                Only emergency jobs will notify during quiet hours
              </p>
            </div>
            <Switch
              id="quiet-hours"
              checked={preferences.quietHoursEnabled}
              onCheckedChange={(checked) => updatePreference('quietHoursEnabled', checked)}
            />
          </div>

          {preferences.quietHoursEnabled && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quiet-start">Start Time</Label>
                  <Input
                    id="quiet-start"
                    type="time"
                    value={preferences.quietHoursStart || '22:00'}
                    onChange={(e) => updatePreference('quietHoursStart', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quiet-end">End Time</Label>
                  <Input
                    id="quiet-end"
                    type="time"
                    value={preferences.quietHoursEnd || '07:00'}
                    onChange={(e) => updatePreference('quietHoursEnd', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Timezone</Label>
                <Select
                  value={preferences.quietHoursTimezone}
                  onValueChange={(value) => updatePreference('quietHoursTimezone', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TIMEZONE_OPTIONS.map((tz) => (
                      <SelectItem key={tz.value} value={tz.value}>
                        {tz.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Save Button */}
      {hasChanges && (
        <div className="sticky bottom-4 flex justify-end">
          <Button
            onClick={savePreferences}
            disabled={isSaving}
            className="shadow-lg"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      )}
    </div>
  )
}
