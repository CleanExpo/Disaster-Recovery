import React, { memo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Briefcase,
  Info,
  Upload,
  CheckCircle,
  Camera,
  Trash2,
  Plus,
} from 'lucide-react';
import { type Step4Control, PROJECT_TYPES } from './types';

function PortfolioSection({ control }: { control: Step4Control }) {
  const {
    projectSummaryFile,
    projectPhotos,
    recentProjects,
    handleProjectSummaryUpload,
    handleProjectPhotosUpload,
    removeProjectPhoto,
    addRecentProject,
    updateRecentProject,
    removeRecentProject,
  } = control;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          Recent Restoration Projects
        </CardTitle>
        <CardDescription>
          Portfolio of completed works within the last 12 months
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className="bg-blue-50 border-blue-200">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-700">
            Include a summary document with project details, before/after photos, and any relevant
            certifications or testimonials. This helps demonstrate your experience and capabilities.
          </AlertDescription>
        </Alert>

        {/* Project Summary Document */}
        <div className="space-y-2">
          <Label>
            Upload Project Portfolio Summary <span className="text-red-500">*</span>
          </Label>
          <div className="border-2 border-dashed rounded-lg p-4">
            <input
              type="file"
              id="project-summary"
              accept=".pdf,image/*"
              onChange={handleProjectSummaryUpload}
              className="hidden"
            />
            <label htmlFor="project-summary" className="flex flex-col items-center cursor-pointer">
              {projectSummaryFile ? (
                <>
                  <CheckCircle className="h-8 w-8 text-green-600 mb-2" />
                  <span className="text-sm font-medium">{projectSummaryFile.name}</span>
                  <span className="text-xs text-gray-500 mt-1">Click to replace</span>
                </>
              ) : (
                <>
                  <Upload className="h-8 w-8 text-gray-600 mb-2" />
                  <span className="text-sm text-gray-600">Click to upload project summary</span>
                  <span className="text-xs text-gray-600 mt-1">
                    PDF or document with project details
                  </span>
                </>
              )}
            </label>
          </div>
        </div>

        {/* Project Photos */}
        <div className="space-y-2">
          <Label>Project Photos (Optional)</Label>
          <div className="border-2 border-dashed rounded-lg p-4">
            <input
              type="file"
              id="project-photos"
              accept="image/*"
              multiple
              onChange={handleProjectPhotosUpload}
              className="hidden"
            />
            <label htmlFor="project-photos" className="flex flex-col items-center cursor-pointer">
              <Camera className="h-8 w-8 text-gray-600 mb-2" />
              <span className="text-sm text-gray-600">Click to upload project photos</span>
              <span className="text-xs text-gray-600 mt-1">Before/after images (max 10)</span>
            </label>
          </div>

          {projectPhotos.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
              {projectPhotos.map((photo, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                    <Camera className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-white"
                      onClick={() => removeProjectPhoto(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-center mt-1 truncate">{photo.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Projects List */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Recent Project Details</Label>
            <Button type="button" variant="outline" size="sm" onClick={addRecentProject}>
              <Plus className="h-4 w-4 mr-1" />
              Add Project
            </Button>
          </div>

          {recentProjects.map((project, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-3 bg-gray-50">
              <div className="flex justify-between items-center">
                <h5 className="font-medium text-sm">Project {index + 1}</h5>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeRecentProject(index)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  type="text"
                  placeholder="Project name"
                  value={project.projectName}
                  onChange={(e) => updateRecentProject(index, 'projectName', e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Client name"
                  value={project.clientName}
                  onChange={(e) => updateRecentProject(index, 'clientName', e.target.value)}
                />
                <select
                  value={project.projectType}
                  onChange={(e) => updateRecentProject(index, 'projectType', e.target.value)}
                  className="px-3 py-2 border rounded-lg text-sm"
                >
                  <option value="">Project type</option>
                  {PROJECT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <Input
                  type="date"
                  value={project.completionDate}
                  onChange={(e) => updateRecentProject(index, 'completionDate', e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
          ))}
        </div>

        {projectSummaryFile && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">
              Portfolio summary uploaded successfully
              {projectPhotos.length > 0 && ` with ${projectPhotos.length} supporting photo(s)`}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

export default memo(PortfolioSection);
