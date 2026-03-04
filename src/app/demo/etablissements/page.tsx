import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Store, MapPin } from 'lucide-react'
import { MOCK_BUSINESSES } from '@/lib/mock-data'

export default function DemoEtablissementsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mes établissements</h1>
        <p className="text-gray-500 mt-1">Gérez vos commerces connectés à Google Business</p>
      </div>

      <div className="grid gap-4">
        {MOCK_BUSINESSES.map((business) => (
          <Card key={business.id}>
            <CardContent className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-50 rounded-lg">
                  <Store className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{business.business_name}</h3>
                  {business.address && (
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3.5 w-3.5" />
                      {business.address}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={business.is_active ? 'success' : 'default'}>
                  {business.is_active ? 'Actif' : 'Inactif'}
                </Badge>
                <Badge variant={business.response_mode === 'auto' ? 'info' : 'warning'}>
                  {business.response_mode === 'auto' ? 'Auto' : 'Validation'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
