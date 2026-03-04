'use client'

import { Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const MOCK_HOURS = [
  { day: 'Lundi',    jsDay: 1, slots: ['12:00 – 14:30', '19:00 – 22:30'] },
  { day: 'Mardi',    jsDay: 2, slots: ['12:00 – 14:30', '19:00 – 22:30'] },
  { day: 'Mercredi', jsDay: 3, slots: ['12:00 – 14:30', '19:00 – 22:30'] },
  { day: 'Jeudi',    jsDay: 4, slots: ['12:00 – 14:30', '19:00 – 23:00'] },
  { day: 'Vendredi', jsDay: 5, slots: ['12:00 – 14:30', '19:00 – 23:00'] },
  { day: 'Samedi',   jsDay: 6, slots: ['10:00 – 15:00', '19:00 – 23:30'] },
  { day: 'Dimanche', jsDay: 0, slots: [] },
]

const GOOGLE_DAY_MAP: Record<string, number> = {
  SUNDAY: 0, MONDAY: 1, TUESDAY: 2, WEDNESDAY: 3,
  THURSDAY: 4, FRIDAY: 5, SATURDAY: 6,
}
const FR_DAYS = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']

interface GooglePeriod {
  openDay: string
  openTime?: { hours?: number; minutes?: number }
  closeDay: string
  closeTime?: { hours?: number; minutes?: number }
}

interface GoogleHours {
  periods?: GooglePeriod[]
}

function parseGoogleHours(hours: GoogleHours) {
  const byDay: Record<number, string[]> = {}

  for (const period of hours.periods || []) {
    const jsDay = GOOGLE_DAY_MAP[period.openDay]
    if (jsDay === undefined) continue
    if (!byDay[jsDay]) byDay[jsDay] = []

    const oh = period.openTime?.hours ?? 0
    const om = period.openTime?.minutes ?? 0
    const ch = period.closeTime?.hours ?? 0
    const cm = period.closeTime?.minutes ?? 0

    const open = `${String(oh).padStart(2, '0')}:${String(om).padStart(2, '0')}`
    const close = `${String(ch).padStart(2, '0')}:${String(cm).padStart(2, '0')}`
    byDay[jsDay].push(`${open} – ${close}`)
  }

  return [0, 1, 2, 3, 4, 5, 6].map((jsDay) => ({
    day: FR_DAYS[jsDay],
    jsDay,
    slots: byDay[jsDay] || [],
  }))
}

function parseMinutes(time: string) {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

export function HoursCard({ hours }: { hours?: GoogleHours | null }) {
  const today = new Date().getDay()
  const now = new Date()
  const currentMin = now.getHours() * 60 + now.getMinutes()

  const displayHours = hours ? parseGoogleHours(hours) : MOCK_HOURS

  const todayEntry = displayHours.find(h => h.jsDay === today)
  const isOpen = todayEntry?.slots.some(slot => {
    const [start, end] = slot.split(' – ')
    return currentMin >= parseMinutes(start) && currentMin <= parseMinutes(end)
  }) ?? false

  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-gray-400" />
            <h3 className="text-sm font-semibold text-gray-900">Horaires d&apos;ouverture</h3>
          </div>
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
            isOpen ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-500'
          }`}>
            {isOpen ? '● Ouvert' : '● Fermé'}
          </span>
        </div>

        <div className="space-y-0">
          {displayHours.map(({ day, jsDay, slots }) => {
            const isToday = jsDay === today
            return (
              <div
                key={day}
                className={`flex items-start justify-between px-2 py-1 rounded-md ${
                  isToday ? 'bg-blue-50' : 'hover:bg-gray-50'
                }`}
              >
                <span className={`text-xs w-22 flex-shrink-0 ${
                  isToday ? 'font-bold text-blue-700' : 'text-gray-600'
                }`}>
                  {day}
                  {isToday && <span className="ml-1 text-[10px] font-normal text-blue-400">(aujourd&apos;hui)</span>}
                </span>
                <div className="text-right">
                  {slots.length === 0 ? (
                    <span className="text-xs text-gray-400 italic">Fermé</span>
                  ) : (
                    slots.map((slot, i) => (
                      <div key={i} className={`text-xs ${isToday ? 'text-blue-700 font-medium' : 'text-gray-700'}`}>
                        {slot}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {!hours && (
          <p className="text-[10px] text-gray-400 text-center mt-2">
            Modifiez vos horaires dans les paramètres
          </p>
        )}
      </CardContent>
    </Card>
  )
}
