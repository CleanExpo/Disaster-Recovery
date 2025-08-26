'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { disasterEvents, getRecentEvents, DisasterEvent } from '@/lib/events-gallery';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Shield, 
  Camera,
  ChevronRight,
  AlertTriangle,
  Droplets,
  Flame,
  Wind,
  Biohazard
} from 'lucide-react';

// Metadata would be defined in a layout.tsx file or using generateMetadata function for server components

// Icon mapping for event types
const eventTypeIcons = {
  flood: Droplets,
  fire: Flame,
  storm: Wind,
  mould: Shield,
  biohazard: Biohazard,
  other: AlertTriangle
};

// Severity color mapping
const severityColors = {
  minor: 'bg-yellow-100 text-yellow-800',
  moderate: 'bg-orange-100 text-orange-800',
  severe: 'bg-red-100 text-red-800',
  catastrophic: 'bg-purple-100 text-purple-800'
};

export default function EventsGalleryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-24 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/events/gallery-hero.jpg"
            alt="Disaster Recovery Events"
            fill
            className="object-cover opacity-30"
            priority
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-blue-500 text-white">Project Documentation</Badge>
            <h1 className="text-5xl font-bold mb-6">
              Disaster Recovery Events Gallery
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Visual documentation of our emergency response and restoration projects. 
              See how we help Queensland communities recover from disasters.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Camera className="mr-2 h-5 w-5" />
                View All Projects
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Download Case Studies
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Overview */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600">1000+</div>
              <div className="text-gray-600 mt-2">Properties Restored</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600">24/7</div>
              <div className="text-gray-600 mt-2">Emergency Response</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600">50+</div>
              <div className="text-gray-600 mt-2">Major Events</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600">100%</div>
              <div className="text-gray-600 mt-2">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600">&lt; 2hrs</div>
              <div className="text-gray-600 mt-2">Response Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Filters */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-12">
              <TabsTrigger value="all">All Events</TabsTrigger>
              <TabsTrigger value="flood">Floods</TabsTrigger>
              <TabsTrigger value="fire">Fire Damage</TabsTrigger>
              <TabsTrigger value="storm">Storms</TabsTrigger>
              <TabsTrigger value="mould">Mould</TabsTrigger>
              <TabsTrigger value="biohazard">Biohazard</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {disasterEvents.map((event) => {
                  const IconComponent = eventTypeIcons[event.type];
                  return (
                    <Card key={event.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300">
                      {/* Event Header Image */}
                      <div className="relative h-48 bg-gray-200">
                        <Image
                          src={event.images[0]?.url || '/images/events/placeholder.jpg'}
                          alt={event.title}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/images/events/placeholder.jpg';
                          }}
                        />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <Badge className={severityColors[event.severity]}>
                            {event.severity}
                          </Badge>
                          <Badge className="bg-black/70 text-white">
                            {event.type}
                          </Badge>
                        </div>
                      </div>

                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-xl line-clamp-2">{event.title}</CardTitle>
                          <IconComponent className="h-6 w-6 text-gray-400 flex-shrink-0" />
                        </div>
                        <CardDescription className="space-y-1 mt-2">
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-2" />
                            {event.date}
                          </div>
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 mr-2" />
                            {event.location}
                          </div>
                        </CardDescription>
                      </CardHeader>

                      <CardContent>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {event.description}
                        </p>

                        {/* Key Statistics */}
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          {event.statistics.slice(0, 2).map((stat, index) => (
                            <div key={index} className="bg-gray-50 p-2 rounded text-center">
                              <div className="font-bold text-blue-600">{stat.value}</div>
                              <div className="text-xs text-gray-600">{stat.label}</div>
                            </div>
                          ))}
                        </div>

                        <Link href={`/events/${event.id}`}>
                          <Button className="w-full" variant="default">
                            View Full Documentation
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="flood" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {disasterEvents.filter(e => e.type === 'flood').map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="fire" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {disasterEvents.filter(e => e.type === 'fire').map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="storm" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {disasterEvents.filter(e => e.type === 'storm').map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="mould" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {disasterEvents.filter(e => e.type === 'mould').map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="biohazard" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {disasterEvents.filter(e => e.type === 'biohazard').map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Featured Before/After Gallery */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Before & After Gallery</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See the dramatic transformations our team achieves in disaster recovery situations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {disasterEvents.slice(0, 3).map((event) => 
              event.beforeAfter.map((ba, index) => (
                <div key={`${event.id}-ba-${index}`} className="group">
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="relative h-64">
                      <div className="absolute inset-0 grid grid-cols-2">
                        <div className="relative">
                          <Image
                            src={ba.before}
                            alt="Before"
                            fill
                            className="object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/images/before-placeholder.jpg';
                            }}
                          />
                          <div className="absolute bottom-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
                            BEFORE
                          </div>
                        </div>
                        <div className="relative">
                          <Image
                            src={ba.after}
                            alt="After"
                            fill
                            className="object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/images/after-placeholder.jpg';
                            }}
                          />
                          <div className="absolute bottom-2 right-2 bg-green-500 text-white px-2 py-1 text-xs rounded">
                            AFTER
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-700 font-medium">{ba.description}</p>
                      <p className="text-xs text-gray-500 mt-2">{event.location}</p>
                    </CardContent>
                  </Card>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Client Testimonials</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from the families and businesses we've helped recover from disasters
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {disasterEvents
              .filter(e => e.testimonial)
              .map((event) => (
                <Card key={event.id} className="bg-white">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-yellow-400">★</span>
                        ))}
                      </div>
                    </div>
                    <blockquote className="text-gray-700 italic mb-4">
                      "{event.testimonial?.quote}"
                    </blockquote>
                    <div className="border-t pt-4">
                      <p className="font-semibold text-gray-900">{event.testimonial?.author}</p>
                      <p className="text-sm text-gray-600">{event.testimonial?.role}</p>
                      <p className="text-xs text-gray-500 mt-1">{event.location}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Need Emergency Disaster Recovery Services?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our experienced team is ready to respond 24/7 to help you recover from any disaster
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Shield className="mr-2 h-5 w-5" />
              Emergency Response: 1300 776 062
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              Request Assessment
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

// Event Card Component (for tab content)
function EventCard({ event }: { event: DisasterEvent }) {
  const IconComponent = eventTypeIcons[event.type];
  
  return (
    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300">
      <div className="relative h-48 bg-gray-200">
        <Image
          src={event.images[0]?.url || '/images/events/placeholder.jpg'}
          alt={event.title}
          fill
          className="object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/events/placeholder.jpg';
          }}
        />
        <div className="absolute top-4 left-4">
          <Badge className={severityColors[event.severity]}>
            {event.severity}
          </Badge>
        </div>
      </div>

      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl">{event.title}</CardTitle>
          <IconComponent className="h-6 w-6 text-gray-400" />
        </div>
        <CardDescription>
          <div className="flex items-center text-sm mt-2">
            <Calendar className="h-4 w-4 mr-2" />
            {event.date}
          </div>
          <div className="flex items-center text-sm mt-1">
            <MapPin className="h-4 w-4 mr-2" />
            {event.location}
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-gray-600 text-sm mb-4">
          {event.description}
        </p>
        <Link href={`/events/${event.id}`}>
          <Button className="w-full">
            View Details
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
