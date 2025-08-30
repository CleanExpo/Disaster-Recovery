import Link from 'next/link';
import { AlertTriangle, Home, Search, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white flex items-centre justify-centre px-4">
      <div className="max-w-2xl w-full">
        <Card className="p-8 text-centre">
          <div className="mb-6">
            <AlertTriangle className="h-24 w-24 text-orange-500 mx-auto mb-4" />
            <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Page Not Found
            </h2>
          </div>
          
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for. 
            It may have been moved or doesn't exist.
          </p>
          
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              If you're experiencing an emergency, get help immediately:
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-centre">
              <Link href="/get-help">
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Get Emergency Help
                </Button>
              </Link>
              
              <Link href="/">
                <Button variant="outline">
                  <Home className="mr-2 h-4 w-4" />
                  Back to Homepage
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t">
            <p className="text-sm text-gray-500 mb-4">
              Popular pages you might be looking for:
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <Link href="/services" className="text-blue-600 hover:underline">
                Our Services
              </Link>
              <Link href="/locations" className="text-blue-600 hover:underline">
                Service Areas
              </Link>
              <Link href="/pricing" className="text-blue-600 hover:underline">
                Pricing Guide
              </Link>
              <Link href="/faq" className="text-blue-600 hover:underline">
                FAQs
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}