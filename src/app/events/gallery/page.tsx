'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
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
  Biohazard,
  ZoomIn,
  Download,
  Share2,
  Heart,
  Eye,
  Star
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

// Severity colour mapping
const severityColors = {
  minor: 'bg-yellow-100 text-yellow-800',
  moderate: 'bg-orange-100 text-orange-800',
  severe: 'bg-red-100 text-red-800',
  catastrophic: 'bg-purple-100 text-purple-800'
};

export default function EventsGalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const toggleFavorite = (eventId: string) => {
    setFavorites(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50/30 to-indigo-50/30"
    >
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white py-24 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 2 }}
          >
            <Image
              src="/images/events/gallery-hero.jpg"
              alt="Disaster Recovery Events"
              fill
              className="object-cover"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/60" />
        </div>
        
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="container mx-auto relative z-10"
        >
          <div className="max-w-4xl mx-auto text-centre">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Badge className="mb-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 text-sm font-semibold">
                Project Documentation
              </Badge>
            </motion.div>
            
            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent"
            >
              Disaster Recovery Events Gallery
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-lg sm:text-xl text-blue-100 mb-8 leading-relaxed max-w-3xl mx-auto"
            >
              Visual documentation of our emergency response and restoration projects. 
              See how we help Queensland communities recover from disasters.
            </motion.p>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-centre"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-xl px-8 py-4">
                  <Camera className="mr-2 h-5 w-5" />
                  View All Projects
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="text-white border-white/50 hover:bg-white/10 backdrop-blur-sm px-8 py-4">
                  <Download className="mr-2 h-5 w-5" />
                  Download Case Studies
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Statistics Overview */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 bg-white/80 backdrop-blur-sm border-b border-gray-200/50"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
            {[
              { value: '1000+', label: 'Properties Restored', colour: 'text-blue-600', bgColor: 'bg-blue-100', delay: 0.1 },
              { value: '24/7', label: 'Emergency Response', colour: 'text-green-600', bgColor: 'bg-green-100', delay: 0.2 },
              { value: '50+', label: 'Major Events', colour: 'text-orange-600', bgColor: 'bg-orange-100', delay: 0.3 },
              { value: '100%', label: 'Success Rate', colour: 'text-purple-600', bgColor: 'bg-purple-100', delay: 0.4 },
              { value: '< 2hrs', label: 'Response Time', colour: 'text-red-600', bgColor: 'bg-red-100', delay: 0.5 },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: stat.delay }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-centre group cursor-pointer"
              >
                <div className={`mx-auto w-20 h-20 ${stat.bgColor} rounded-2xl flex items-centre justify-centre mb-4 group-hover:shadow-lg transition-all duration-300`}>
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: stat.delay + 0.2, type: "spring", stiffness: 200 }}
                    className={`text-2xl md:text-3xl font-bold ${stat.colour}`}
                  >
                    {stat.value}
                  </motion.div>
                </div>
                <div className="text-gray-700 font-semibold text-sm md:text-base group-hover:text-gray-900 transition-colours">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

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
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              >
                {disasterEvents.map((event, index) => {
                  const IconComponent = eventTypeIcons[event.type];
                  const isFavorite = favorites.includes(event.id);
                  
                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -8 }}
                      className="group"
                    >
                      <Card className="overflow-hidden bg-white/80 backdrop-blur-sm border-gray-200/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 h-full">
                        {/* Event Header Image */}
                        <div className="relative h-56 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.4 }}
                            className="relative w-full h-full"
                          >
                            <Image
                              src={event.images[0]?.url || '/images/events/placeholder.jpg'}
                              alt={event.title}
                              fill
                              className="object-cover group-hover:brightness-110 transition-all duration-300"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/images/events/placeholder.jpg';
                              }}
                            />
                          </motion.div>
                          
                          {/* Badges and Actions */}
                          <div className="absolute top-4 left-4 flex gap-2">
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: index * 0.1 + 0.3 }}
                            >
                              <Badge className={`${severityColors[event.severity]} font-semibold`}>
                                {event.severity}
                              </Badge>
                            </motion.div>
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: index * 0.1 + 0.4 }}
                            >
                              <Badge className="bg-gradient-to-r from-gray-800 to-gray-700 text-white">
                                {event.type}
                              </Badge>
                            </motion.div>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => toggleFavorite(event.id)}
                              className={`p-2 rounded-full backdrop-blur-sm transition-colours ${
                                isFavorite 
                                  ? 'bg-red-500 text-white' 
                                  : 'bg-white/80 text-gray-600 hover:bg-white'
                              }`}
                            >
                              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setSelectedImage(event.images[0]?.url || '')}
                              className="p-2 rounded-full bg-white/80 text-gray-600 hover:bg-white backdrop-blur-sm transition-colours"
                            >
                              <ZoomIn className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 rounded-full bg-white/80 text-gray-600 hover:bg-white backdrop-blur-sm transition-colours"
                            >
                              <Share2 className="w-4 h-4" />
                            </motion.button>
                          </div>
                          
                          {/* View Count */}
                          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-centre">
                            <Eye className="w-3 h-3 mr-1" />
                            {Math.floor(Math.random() * 500) + 100}
                          </div>
                        </div>

                        <CardHeader className="pb-4">
                          <div className="flex items-start justify-between mb-3">
                            <CardTitle className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colours">
                              {event.title}
                            </CardTitle>
                            <div className="p-2 bg-gray-100 rounded-xl group-hover:bg-blue-100 transition-colours">
                              <IconComponent className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colours" />
                            </div>
                          </div>
                          
                          <CardDescription className="space-y-2">
                            <motion.div 
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 + 0.5 }}
                              className="flex items-centre text-sm text-gray-600"
                            >
                              <div className="p-1 bg-blue-100 rounded mr-2">
                                <Calendar className="h-3 w-3 text-blue-600" />
                              </div>
                              {event.date}
                            </motion.div>
                            <motion.div 
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 + 0.6 }}
                              className="flex items-centre text-sm text-gray-600"
                            >
                              <div className="p-1 bg-green-100 rounded mr-2">
                                <MapPin className="h-3 w-3 text-green-600" />
                              </div>
                              {event.location}
                            </motion.div>
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="flex flex-col flex-1">
                          <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.1 + 0.7 }}
                            className="text-gray-700 text-sm mb-4 line-clamp-3 leading-relaxed"
                          >
                            {event.description}
                          </motion.p>

                          {/* Key Statistics */}
                          <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.8 }}
                            className="grid grid-cols-2 gap-3 mb-6 flex-1"
                          >
                            {event.statistics.slice(0, 2).map((stat, statIndex) => (
                              <motion.div 
                                key={statIndex}
                                whileHover={{ scale: 1.05 }}
                                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3 rounded-xl text-centre border border-blue-100"
                              >
                                <div className="font-bold text-lg text-blue-600">{stat.value}</div>
                                <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
                              </motion.div>
                            ))}
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.9 }}
                          >
                            <Link href={`/events/${event.id}`}>
                              <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                  View Full Documentation
                                  <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                              </motion.div>
                            </Link>
                          </motion.div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
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
          <div className="text-centre mb-12">
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
          <div className="text-centre mb-12">
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
        <div className="container mx-auto px-4 text-centre">
          <h2 className="text-4xl font-bold mb-6">
            Need Emergency Disaster Recovery Services?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our experienced team is ready to respond 24/7 to help you recover from any disaster
          </p>
          <div className="flex flex-wrap gap-4 justify-centre">
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

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-centre justify-centre p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <Image
                  src={selectedImage}
                  alt="Enlarged view"
                  width={800}
                  height={600}
                  className="object-contain max-h-[80vh] w-full"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 p-2 bg-white/90 rounded-full text-gray-700 hover:bg-white transition-colours"
                >
                  <ChevronRight className="w-6 h-6 rotate-45" />
                </motion.button>
              </div>
              <div className="p-6 bg-gray-50">
                <div className="flex items-centre justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">High Resolution View</h3>
                    <p className="text-sm text-gray-600">Click outside to close</p>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colours"
                    >
                      <Download className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colours"
                    >
                      <Share2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
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
          <div className="flex items-centre text-sm mt-2">
            <Calendar className="h-4 w-4 mr-2" />
            {event.date}
          </div>
          <div className="flex items-centre text-sm mt-1">
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
