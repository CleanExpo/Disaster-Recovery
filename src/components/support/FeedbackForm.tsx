'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  MessageSquare,
  Lightbulb,
  Bug,
  Send,
  User,
  Mail,
  Shield,
  Upload,
  AlertCircle,
  CheckCircle,
  X,
  Paperclip,
  Star
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import type { FeedbackSubmission, TicketPriority } from '@/types/support';

interface FeedbackFormProps {
  embedded?: boolean;
  defaultType?: 'feedback' | 'feature_request' | 'bug_report';
  onSuccess?: () => void;
}

export function FeedbackForm({ 
  embedded = false, 
  defaultType = 'feedback',
  onSuccess
}: FeedbackFormProps) {
  const [formData, setFormData] = useState({
    type: defaultType,
    category: '',
    title: '',
    description: '',
    impact: 'medium' as 'low' | 'medium' | 'high',
    isAnonymous: false,
    userName: '',
    userEmail: '',
    attachments: [] as File[]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(0);

  const categories = {
    feedback: [
      'User Interface',
      'Performance',
      'Documentation',
      'Support Experience',
      'General'
    ],
    feature_request: [
      'Dashboard',
      'Compliance',
      'Billing',
      'Job Management',
      'Reporting',
      'Mobile App',
      'Other'
    ],
    bug_report: [
      'Login/Authentication',
      'Data Display',
      'File Upload',
      'Payment Processing',
      'Notifications',
      'Search',
      'Other Technical Issue'
    ]
  };

  const impactDescriptions = {
    low: 'Nice to have, but not critical',
    medium: 'Would improve my experience',
    high: 'Critical for my workflow'
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.title || !formData.description || !formData.category) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }

    if (!formData.isAnonymous && (!formData.userName || !formData.userEmail)) {
      toast({
        title: 'Contact Information Required',
        description: 'Please provide your name and email or submit anonymously.',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // In production, submit to backend
      await new Promise(resolve => setTimeout(resolve, 1500));

      const submission: FeedbackSubmission = {
        id: `feedback-${Date.now()}`,
        type: formData.type,
        userId: formData.isAnonymous ? undefined : 'current-user',
        userName: formData.isAnonymous ? undefined : formData.userName,
        userEmail: formData.isAnonymous ? undefined : formData.userEmail,
        isAnonymous: formData.isAnonymous,
        category: formData.category,
        title: formData.title,
        description: formData.description,
        impact: formData.impact,
        status: 'new',
        votes: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      console.log('Submitting feedback:', submission);
      
      setSubmitted(true);
      
      if (onSuccess) {
        onSuccess();
      }

      // Reset form after a delay
      setTimeout(() => {
        setFormData({
          type: defaultType,
          category: '',
          title: '',
          description: '',
          impact: 'medium',
          isAnonymous: false,
          userName: '',
          userEmail: '',
          attachments: []
        });
        setRating(0);
        setSubmitted(false);
      }, 5000);

    } catch (error) {
      toast({
        title: 'Submission Failed',
        description: 'Failed to submit your feedback. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'feedback':
        return <MessageSquare className="h-5 w-5" />;
      case 'feature_request':
        return <Lightbulb className="h-5 w-5" />;
      case 'bug_report':
        return <Bug className="h-5 w-5" />;
      default:
        return <MessageSquare className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'feedback':
        return 'text-blue-600 bg-blue-100';
      case 'feature_request':
        return 'text-purple-600 bg-purple-100';
      case 'bug_report':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (submitted) {
    return (
      <Card className={embedded ? 'border-0 shadow-none' : ''}>
        <CardContent className="py-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
            <p className="text-gray-600 mb-4">
              Your {formData.type.replace('_', ' ')} has been submitted successfully.
            </p>
            {!formData.isAnonymous && (
              <p className="text-sm text-gray-500">
                We'll send updates to {formData.userEmail}
              </p>
            )}
            <Button
              variant="outline"
              className="mt-6"
              onClick={() => setSubmitted(false)}
            >
              Submit Another
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={embedded ? 'border-0 shadow-none' : ''}>
      <CardHeader>
        <CardTitle>Share Your Feedback</CardTitle>
        <CardDescription>
          Help us improve by sharing your thoughts, reporting issues, or suggesting new features
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Feedback Type */}
        <div className="space-y-3">
          <Label>What would you like to share?</Label>
          <RadioGroup
            value={formData.type}
            onValueChange={(value: any) => setFormData({ ...formData, type: value, category: '' })}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <label
                className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colours ${
                  formData.type === 'feedback' ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                }`}
              >
                <RadioGroupItem value="feedback" />
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${formData.type === 'feedback' ? getTypeColor('feedback') : 'bg-gray-100'}`}>
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <span className="font-medium">General Feedback</span>
                </div>
              </label>

              <label
                className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colours ${
                  formData.type === 'feature_request' ? 'border-purple-500 bg-purple-50' : 'hover:bg-gray-50'
                }`}
              >
                <RadioGroupItem value="feature_request" />
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${formData.type === 'feature_request' ? getTypeColor('feature_request') : 'bg-gray-100'}`}>
                    <Lightbulb className="h-4 w-4" />
                  </div>
                  <span className="font-medium">Feature Request</span>
                </div>
              </label>

              <label
                className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colours ${
                  formData.type === 'bug_report' ? 'border-red-500 bg-red-50' : 'hover:bg-gray-50'
                }`}
              >
                <RadioGroupItem value="bug_report" />
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${formData.type === 'bug_report' ? getTypeColor('bug_report') : 'bg-gray-100'}`}>
                    <Bug className="h-4 w-4" />
                  </div>
                  <span className="font-medium">Bug Report</span>
                </div>
              </label>
            </div>
          </RadioGroup>
        </div>

        {/* Category */}
        <div>
          <Label htmlFor="category">Category *</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData({ ...formData, category: value })}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories[formData.type].map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Title */}
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder={
              formData.type === 'bug_report'
                ? 'Brief description of the issue'
                : 'Brief summary of your feedback'
            }
          />
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder={
              formData.type === 'bug_report'
                ? 'Please describe the issue in detail. Include steps to reproduce if possible.'
                : 'Please share your thoughts in detail...'
            }
            rows={6}
          />
        </div>

        {/* Impact Level (for feature requests and bugs) */}
        {(formData.type === 'feature_request' || formData.type === 'bug_report') && (
          <div>
            <Label>Impact Level</Label>
            <RadioGroup
              value={formData.impact}
              onValueChange={(value: any) => setFormData({ ...formData, impact: value })}
            >
              <div className="space-y-2 mt-2">
                {(['low', 'medium', 'high'] as const).map((level) => (
                  <label
                    key={level}
                    className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colours ${
                      formData.impact === level ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <RadioGroupItem value={level} />
                    <div>
                      <p className="font-medium capitalize">{level} Impact</p>
                      <p className="text-sm text-gray-500">{impactDescriptions[level]}</p>
                    </div>
                  </label>
                ))}
              </div>
            </RadioGroup>
          </div>
        )}

        {/* Rating (for general feedback) */}
        {formData.type === 'feedback' && (
          <div>
            <Label>Overall Experience Rating</Label>
            <div className="flex gap-2 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-gray-500 self-center">
                {rating > 0 && `${rating} out of 5`}
              </span>
            </div>
          </div>
        )}

        {/* Attachments */}
        <div>
          <Label htmlFor="attachments">Attachments (Optional)</Label>
          <div className="mt-2">
            <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <div className="text-center">
                <Upload className="h-6 w-6 text-gray-400 mx-auto mb-1" />
                <p className="text-xs text-gray-600">
                  Click to upload screenshots or files
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, PDF up to 5MB
                </p>
              </div>
              <input
                id="attachments"
                type="file"
                multiple
                accept="image/*,.pdf"
                className="hidden"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  setFormData({ ...formData, attachments: files });
                }}
              />
            </label>
            {formData.attachments.length > 0 && (
              <div className="mt-2 space-y-1">
                {formData.attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded">
                    <div className="flex items-center gap-2">
                      <Paperclip className="h-4 w-4 text-gray-500" />
                      <span>{file.name}</span>
                      <span className="text-gray-500">
                        ({(file.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newFiles = [...formData.attachments];
                        newFiles.splice(index, 1);
                        setFormData({ ...formData, attachments: newFiles });
                      }}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Anonymous Submission */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Checkbox
              id="anonymous"
              checked={formData.isAnonymous}
              onCheckedChange={(checked) => 
                setFormData({ ...formData, isAnonymous: checked as boolean })
              }
            />
            <Label htmlFor="anonymous" className="flex items-center gap-2 cursor-pointer">
              <Shield className="h-4 w-4 text-gray-500" />
              Submit anonymously
            </Label>
          </div>

          {!formData.isAnonymous && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Your Name *</Label>
                <Input
                  id="name"
                  value={formData.userName}
                  onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.userEmail}
                  onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
                  placeholder="john@example.com"
                />
              </div>
            </div>
          )}

          {formData.isAnonymous && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Your feedback will be submitted anonymously. We won't be able to follow up 
                with you directly, but we value your input.
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setFormData({
                type: defaultType,
                category: '',
                title: '',
                description: '',
                impact: 'medium',
                isAnonymous: false,
                userName: '',
                userEmail: '',
                attachments: []
              });
              setRating(0);
            }}
          >
            Clear Form
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Submit {formData.type === 'feature_request' ? 'Request' : formData.type === 'bug_report' ? 'Report' : 'Feedback'}
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Add missing import
import { RefreshCw } from 'lucide-react';