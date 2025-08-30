'use client';

import React, { useState } from 'react';
import {
  Star,
  Camera,
  Upload,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  Clock,
  User,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Flag,
  Send,
  Image,
  X,
  Plus,
  Smile,
  Meh,
  Frown,
  Heart,
  Award
} from 'lucide-react';
import type { CustomerFeedback, FeedbackPhoto } from '@/types/customer-feedback';

interface FeedbackCollectionProps {
  jobId: string;
  contractorId: string;
  jobDetails: {
    jobNumber: string;
    jobType: string;
    completedDate: Date;
    contractorName: string;
    customerName: string;
    customerEmail: string;
    serviceAddress: string;
  };
  onSubmit: (feedback: Partial<CustomerFeedback>) => void;
  onCancel?: () => void;
}

export default function FeedbackCollection({ jobId, contractorId, jobDetails, onSubmit, onCancel }: FeedbackCollectionProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [ratings, setRatings] = useState({
    overall: 0,
    quality: 0,
    timeliness: 0,
    communication: 0,
    professionalism: 0,
    value: 0
  });
  const [comments, setComments] = useState({
    positive: '',
    negative: '',
    suggestions: '',
    general: ''
  });
  const [photos, setPhotos] = useState<FeedbackPhoto[]>([]);
  const [npsScore, setNpsScore] = useState<number | null>(null);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedToTestimonial, setAgreedToTestimonial] = useState(false);

  const ratingLabels = {
    1: { label: 'Very Poor', icon: <Frown className="w-5 h-5" />, colour: 'text-red-500' },
    2: { label: 'Poor', icon: <Frown className="w-5 h-5" />, colour: 'text-orange-500' },
    3: { label: 'Average', icon: <Meh className="w-5 h-5" />, colour: 'text-yellow-500' },
    4: { label: 'Good', icon: <Smile className="w-5 h-5" />, colour: 'text-green-500' },
    5: { label: 'Excellent', icon: <Smile className="w-5 h-5" />, colour: 'text-green-600' }
  };

  const categoryLabels = {
    overall: 'Overall Experience',
    quality: 'Quality of Work',
    timeliness: 'Timeliness',
    communication: 'Communication',
    professionalism: 'Professionalism',
    value: 'Value for Money'
  };

  const steps = [
    { id: 1, title: 'Rate Your Experience', description: 'How did we do?' },
    { id: 2, title: 'Share Details', description: 'Tell us more' },
    { id: 3, title: 'Photos (Optional)', description: 'Show your results' },
    { id: 4, title: 'Final Thoughts', description: 'Almost done!' }
  ];

  const handleRatingChange = (category: keyof typeof ratings, rating: number) => {
    setRatings(prev => ({ ...prev, [category]: rating }));
  };

  const handlePhotoUpload = (files: FileList) => {
    const newPhotos: FeedbackPhoto[] = [];
    Array.from(files).forEach((file, index) => {
      const photo: FeedbackPhoto = {
        id: `temp-${Date.now()}-${index}`,
        url: URL.createObjectURL(file),
        type: 'testimonial',
        uploadedDate: new Date(),
        approved: false
      };
      newPhotos.push(photo);
    });
    setPhotos(prev => [...prev, ...newPhotos]);
  };

  const removePhoto = (photoId: string) => {
    setPhotos(prev => prev.filter(p => p.id !== photoId));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    const feedbackData: Partial<CustomerFeedback> = {
      jobId,
      contractorId,
      customerId: 'temp-customer-id',
      customerName: jobDetails.customerName,
      customerEmail: jobDetails.customerEmail,
      jobType: jobDetails.jobType,
      completedDate: jobDetails.completedDate,
      submittedDate: new Date(),
      rating: ratings,
      comments,
      photos,
      status: 'submitted',
      flagged: ratings.overall <= 2 || comments.negative.length > 0,
      publishedAsTestimonial: agreedToTestimonial && ratings.overall >= 4,
      googleReviewSubmitted: false,
      npsScore,
      tags: [],
      metadata: {
        source: 'portal',
        device: navigator.userAgent
      }
    };

    try {
      await onSubmit(feedbackData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-500';
    if (rating === 3) return 'text-yellow-500';
    if (rating >= 1) return 'text-red-500';
    return 'text-gray-300';
  };

  const getOverallSentiment = () => {
    const avg = ratings.overall;
    if (avg >= 4) return { text: 'Great!', emoji: '😊', colour: 'text-green-600' };
    if (avg === 3) return { text: 'Good', emoji: '😐', colour: 'text-yellow-600' };
    if (avg >= 1) return { text: 'We can do better', emoji: '😔', colour: 'text-red-600' };
    return { text: 'Rate your experience', emoji: '⭐', colour: 'text-gray-600' };
  };

  const RatingStars = ({ category, value, onChange }: {
    category: keyof typeof ratings;
    value: number;
    onChange: (rating: number) => void;
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {categoryLabels[category]}
      </label>
      <div className="flex items-centre space-x-1">
        {[1, 2, 3, 4, 5].map(rating => (
          <button
            key={rating}
            type="button"
            onClick={() => onChange(rating)}
            onMouseEnter={() => {}}
            className={`p-1 transition-colours ${
              rating <= value ? getRatingColor(value) : 'text-gray-300 hover:text-yellow-400'
            }`}
          >
            <Star className={`w-6 h-6 ${rating <= value ? 'fill-current' : ''}`} />
          </button>
        ))}
        <span className="ml-3 text-sm text-gray-600">
          {value > 0 ? ratingLabels[value as keyof typeof ratingLabels]?.label : 'Not rated'}
        </span>
      </div>
    </div>
  );

  const StepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-centre mb-8">
              <div className="text-6xl mb-4">{getOverallSentiment().emoji}</div>
              <h2 className={`text-2xl font-bold ${getOverallSentiment().colour}`}>
                {getOverallSentiment().text}
              </h2>
              <p className="text-gray-600 mt-2">
                How was your experience with {jobDetails.contractorName}?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <RatingStars
                  category="overall"
                  value={ratings.overall}
                  onChange={(rating) => handleRatingChange('overall', rating)}
                />
              </div>

              <RatingStars
                category="quality"
                value={ratings.quality}
                onChange={(rating) => handleRatingChange('quality', rating)}
              />

              <RatingStars
                category="timeliness"
                value={ratings.timeliness}
                onChange={(rating) => handleRatingChange('timeliness', rating)}
              />

              <RatingStars
                category="communication"
                value={ratings.communication}
                onChange={(rating) => handleRatingChange('communication', rating)}
              />

              <RatingStars
                category="professionalism"
                value={ratings.professionalism}
                onChange={(rating) => handleRatingChange('professionalism', rating)}
              />

              <div className="md:col-span-2">
                <RatingStars
                  category="value"
                  value={ratings.value}
                  onChange={(rating) => handleRatingChange('value', rating)}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-centre mb-6">
              <h2 className="text-xl font-bold text-gray-900">Tell us more about your experience</h2>
              <p className="text-gray-600 mt-2">Your feedback helps us improve our service</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <ThumbsUp className="w-4 h-4 inline mr-2 text-green-500" />
                  What did we do well?
                </label>
                <textarea
                  value={comments.positive}
                  onChange={(e) => setComments(prev => ({ ...prev, positive: e.target.value }))}
                  placeholder="Tell us what you liked about our service..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <ThumbsDown className="w-4 h-4 inline mr-2 text-red-500" />
                  What could we improve?
                </label>
                <textarea
                  value={comments.negative}
                  onChange={(e) => setComments(prev => ({ ...prev, negative: e.target.value }))}
                  placeholder="Let us know how we can do better..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-2 text-blue-500" />
                  Any suggestions for future services?
                </label>
                <textarea
                  value={comments.suggestions}
                  onChange={(e) => setComments(prev => ({ ...prev, suggestions: e.target.value }))}
                  placeholder="Share any suggestions or ideas..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-3">
                How likely are you to recommend us to others?
              </h3>
              <div className="flex justify-between items-centre">
                <span className="text-sm text-blue-700">Not at all likely</span>
                <div className="flex space-x-2">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(score => (
                    <button
                      key={score}
                      onClick={() => setNpsScore(score)}
                      className={`w-8 h-8 rounded-full text-sm font-medium transition-colours ${
                        npsScore === score
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-blue-600 hover:bg-blue-100 border border-blue-300'
                      }`}
                    >
                      {score}
                    </button>
                  ))}
                </div>
                <span className="text-sm text-blue-700">Extremely likely</span>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-centre mb-6">
              <h2 className="text-xl font-bold text-gray-900">Show off the results!</h2>
              <p className="text-gray-600 mt-2">
                Add photos to showcase the quality work (optional but appreciated)
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {photos.map(photo => (
                <div key={photo.id} className="relative">
                  <img
                    src={photo.url}
                    alt="Feedback"
                    className="w-full h-32 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    onClick={() => removePhoto(photo.id)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-centre justify-centre hover:bg-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}

              <label className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-centre justify-centre cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colours">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">Upload Photos</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => e.target.files && handlePhotoUpload(e.target.files)}
                  className="hidden"
                />
              </label>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Photo Guidelines</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Before and after shots work great</li>
                <li>• Good lighting helps showcase the quality</li>
                <li>• Maximum 5 photos per review</li>
                <li>• Photos may be used in testimonials (with your permission)</li>
              </ul>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-centre mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-centre justify-centre mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Almost done!</h2>
              <p className="text-gray-600 mt-2">Review your feedback before submitting</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Your Ratings</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {Object.entries(ratings).map(([category, rating]) => (
                    <div key={category} className="flex justify-between">
                      <span className="text-gray-600 capitalize">
                        {categoryLabels[category as keyof typeof categoryLabels]}:
                      </span>
                      <div className="flex items-centre">
                        <Star className={`w-4 h-4 ${getRatingColor(rating)} fill-current mr-1`} />
                        <span className="font-medium">{rating}/5</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {(comments.positive || comments.negative || comments.suggestions) && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Your Comments</h3>
                  <div className="space-y-2 text-sm">
                    {comments.positive && (
                      <p className="text-green-700 bg-green-50 p-2 rounded">
                        <ThumbsUp className="w-4 h-4 inline mr-1" />
                        {comments.positive}
                      </p>
                    )}
                    {comments.negative && (
                      <p className="text-red-700 bg-red-50 p-2 rounded">
                        <ThumbsDown className="w-4 h-4 inline mr-1" />
                        {comments.negative}
                      </p>
                    )}
                    {comments.suggestions && (
                      <p className="text-blue-700 bg-blue-50 p-2 rounded">
                        <MessageSquare className="w-4 h-4 inline mr-1" />
                        {comments.suggestions}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {photos.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Photos ({photos.length})</h3>
                  <div className="flex space-x-2">
                    {photos.map(photo => (
                      <img
                        key={photo.id}
                        src={photo.url}
                        alt="Feedback"
                        className="w-16 h-16 object-cover rounded border border-gray-200"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {ratings.overall >= 4 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    checked={agreedToTestimonial}
                    onChange={(e) => setAgreedToTestimonial(e.target.checked)}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <span className="text-sm font-medium text-blue-900">
                      Share as testimonial
                    </span>
                    <p className="text-sm text-blue-700 mt-1">
                      Allow us to showcase your positive feedback as a testimonial on our website 
                      and marketing materials. Your name and location may be displayed.
                    </p>
                  </div>
                </label>
              </div>
            )}

            <div className="text-centre text-sm text-gray-500">
              <p>
                By submitting this feedback, you agree to our{' '}
                <a href="/privacy" className="text-blue-600 hover:text-blue-700">
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a href="/terms" className="text-blue-600 hover:text-blue-700">
                  Terms of Service
                </a>
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-centre justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Service Feedback</h1>
            <p className="text-gray-600 mt-2">Help us improve by sharing your experience</p>
          </div>
          {onCancel && (
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Job Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-centre">
              <Briefcase className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-gray-600">Job:</span>
              <span className="font-medium ml-1">{jobDetails.jobNumber}</span>
            </div>
            <div className="flex items-centre">
              <Calendar className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-gray-600">Completed:</span>
              <span className="font-medium ml-1">
                {jobDetails.completedDate.toLocaleDateString('en-AU')}
              </span>
            </div>
            <div className="flex items-centre">
              <User className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-gray-600">Contractor:</span>
              <span className="font-medium ml-1">{jobDetails.contractorName}</span>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-centre justify-between mb-8">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-centre">
                <div
                  className={`w-10 h-10 rounded-full flex items-centre justify-centre text-sm font-medium transition-colours ${
                    currentStep === step.id
                      ? 'bg-blue-600 text-white'
                      : currentStep > step.id
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {currentStep > step.id ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    step.id
                  )}
                </div>
                <p className="text-xs mt-2 text-centre text-gray-600 hidden sm:block">
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 transition-colours ${
                    currentStep > step.id ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <StepContent />
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep(prev => Math.max(prev - 1, 1))}
          disabled={currentStep === 1}
          className={`px-6 py-3 rounded-lg font-medium transition-colours ${
            currentStep === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Previous
        </button>

        {currentStep < steps.length ? (
          <button
            onClick={() => setCurrentStep(prev => prev + 1)}
            disabled={currentStep === 1 && ratings.overall === 0}
            className={`px-6 py-3 rounded-lg font-medium transition-colours ${
              (currentStep === 1 && ratings.overall === 0)
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colours flex items-centre"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Submit Feedback
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}