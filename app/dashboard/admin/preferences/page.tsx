'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Palette, Settings, Eye } from 'lucide-react';

interface AdminServiceCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  theme: string;
  isActive: boolean;
  sortOrder: number;
  services: AdminService[];
}

interface AdminService {
  id: string;
  categoryId: string;
  name: string;
  description?: string;
  icon?: string;
  theme: string;
  isActive: boolean;
  sortOrder: number;
}

interface AdminTheme {
  id: string;
  name: string;
  identifier: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  isActive: boolean;
}

export default function AdminPreferencesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [categories, setCategories] = useState<AdminServiceCategory[]>([]);
  const [themes, setThemes] = useState<AdminTheme[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<AdminServiceCategory | null>(null);
  const [editingService, setEditingService] = useState<AdminService | null>(null);
  const [editingTheme, setEditingTheme] = useState<AdminTheme | null>(null);

  // Form states
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: '',
    icon: '',
    theme: '',
    sortOrder: 0
  });

  const [serviceForm, setServiceForm] = useState({
    categoryId: '',
    name: '',
    description: '',
    icon: '',
    theme: '',
    sortOrder: 0
  });

  const [themeForm, setThemeForm] = useState({
    name: '',
    identifier: '',
    primaryColor: '#00BFA6',
    secondaryColor: '#7C4DFF',
    accentColor: '#2196F3',
    backgroundColor: '#0F1115',
    textColor: '#F9FAFB'
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    } else if (user && user.userType !== 'ADMIN') {
      router.push('/dashboard');
    } else if (user && user.userType === 'ADMIN') {
      fetchData();
    }
  }, [user, loading, router]);

  const fetchData = async () => {
    try {
      setLoadingData(true);
      const [categoriesRes, themesRes] = await Promise.all([
        fetch('/api/admin/service-categories', { cache: 'no-store' }),
        fetch('/api/admin/themes', { cache: 'no-store' })
      ]);

      if (categoriesRes.ok) {
        const categoriesData = await categoriesRes.json();
        setCategories(categoriesData.data || []);
      }

      if (themesRes.ok) {
        const themesData = await themesRes.json();
        setThemes(themesData.data || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const handleCreateCategory = async () => {
    try {
      const response = await fetch('/api/admin/service-categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(categoryForm)
      });

      if (response.ok) {
        setShowCategoryModal(false);
        setCategoryForm({ name: '', description: '', icon: '', theme: '', sortOrder: 0 });
        fetchData();
      }
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const handleCreateService = async () => {
    try {
      const response = await fetch('/api/admin/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(serviceForm)
      });

      if (response.ok) {
        setShowServiceModal(false);
        setServiceForm({ categoryId: '', name: '', description: '', icon: '', theme: '', sortOrder: 0 });
        fetchData();
      }
    } catch (error) {
      console.error('Error creating service:', error);
    }
  };

  const handleCreateTheme = async () => {
    try {
      const response = await fetch('/api/admin/themes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(themeForm)
      });

      if (response.ok) {
        setShowThemeModal(false);
        setThemeForm({
          name: '',
          identifier: '',
          primaryColor: '#00BFA6',
          secondaryColor: '#7C4DFF',
          accentColor: '#2196F3',
          backgroundColor: '#0F1115',
          textColor: '#F9FAFB'
        });
        fetchData();
      }
    } catch (error) {
      console.error('Error creating theme:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#00BFA6]"></div>
      </div>
    );
  }

  if (!user || user.userType !== 'ADMIN') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Service Preferences Management</h1>
          <p className="text-gray-400">Manage service categories, services, and themes for client onboarding</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Service Categories
              </CardTitle>
              <CardDescription className="text-gray-400">
                Manage service categories and their themes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog open={showCategoryModal} onOpenChange={setShowCategoryModal}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-[#00BFA6] hover:bg-[#00A693]">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Category
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-800 border-gray-700">
                  <DialogHeader>
                    <DialogTitle className="text-white">Create Service Category</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Add a new service category with theme assignment
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-gray-300">Category Name</Label>
                      <Input
                        value={categoryForm.name}
                        onChange={(e) => setCategoryForm({...categoryForm, name: e.target.value})}
                        className="bg-gray-700 border-gray-600 text-white"
                        placeholder="e.g., Emergency Services"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Description</Label>
                      <Textarea
                        value={categoryForm.description}
                        onChange={(e) => setCategoryForm({...categoryForm, description: e.target.value})}
                        className="bg-gray-700 border-gray-600 text-white"
                        placeholder="Brief description of this category"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Icon</Label>
                      <Input
                        value={categoryForm.icon}
                        onChange={(e) => setCategoryForm({...categoryForm, icon: e.target.value})}
                        className="bg-gray-700 border-gray-600 text-white"
                        placeholder="e.g., 🚨 or icon name"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Theme</Label>
                      <Select value={categoryForm.theme} onValueChange={(value) => setCategoryForm({...categoryForm, theme: value})}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                          {themes.map((theme) => (
                            <SelectItem key={theme.id} value={theme.identifier}>
                              {theme.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-gray-300">Sort Order</Label>
                      <Input
                        type="number"
                        value={categoryForm.sortOrder}
                        onChange={(e) => setCategoryForm({...categoryForm, sortOrder: parseInt(e.target.value) || 0})}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <Button onClick={handleCreateCategory} className="w-full bg-[#00BFA6] hover:bg-[#00A693]">
                      Create Category
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Services
              </CardTitle>
              <CardDescription className="text-gray-400">
                Manage individual services within categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog open={showServiceModal} onOpenChange={setShowServiceModal}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-[#7C4DFF] hover:bg-[#6B46C1]">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Service
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-800 border-gray-700">
                  <DialogHeader>
                    <DialogTitle className="text-white">Create Service</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Add a new service to a category
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-gray-300">Category</Label>
                      <Select value={serviceForm.categoryId} onValueChange={(value) => setServiceForm({...serviceForm, categoryId: value})}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-gray-300">Service Name</Label>
                      <Input
                        value={serviceForm.name}
                        onChange={(e) => setServiceForm({...serviceForm, name: e.target.value})}
                        className="bg-gray-700 border-gray-600 text-white"
                        placeholder="e.g., Water Damage Restoration"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Description</Label>
                      <Textarea
                        value={serviceForm.description}
                        onChange={(e) => setServiceForm({...serviceForm, description: e.target.value})}
                        className="bg-gray-700 border-gray-600 text-white"
                        placeholder="Brief description of this service"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Icon</Label>
                      <Input
                        value={serviceForm.icon}
                        onChange={(e) => setServiceForm({...serviceForm, icon: e.target.value})}
                        className="bg-gray-700 border-gray-600 text-white"
                        placeholder="e.g., 💧 or icon name"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Theme</Label>
                      <Select value={serviceForm.theme} onValueChange={(value) => setServiceForm({...serviceForm, theme: value})}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                          {themes.map((theme) => (
                            <SelectItem key={theme.id} value={theme.identifier}>
                              {theme.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-gray-300">Sort Order</Label>
                      <Input
                        type="number"
                        value={serviceForm.sortOrder}
                        onChange={(e) => setServiceForm({...serviceForm, sortOrder: parseInt(e.target.value) || 0})}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <Button onClick={handleCreateService} className="w-full bg-[#7C4DFF] hover:bg-[#6B46C1]">
                      Create Service
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Palette className="h-5 w-5 mr-2" />
                Themes
              </CardTitle>
              <CardDescription className="text-gray-400">
                Create and manage themes for service categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog open={showThemeModal} onOpenChange={setShowThemeModal}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-[#2196F3] hover:bg-[#1976D2]">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Theme
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-800 border-gray-700">
                  <DialogHeader>
                    <DialogTitle className="text-white">Create Theme</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Create a new theme with custom colors
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-gray-300">Theme Name</Label>
                      <Input
                        value={themeForm.name}
                        onChange={(e) => setThemeForm({...themeForm, name: e.target.value})}
                        className="bg-gray-700 border-gray-600 text-white"
                        placeholder="e.g., Emergency Theme"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Identifier</Label>
                      <Input
                        value={themeForm.identifier}
                        onChange={(e) => setThemeForm({...themeForm, identifier: e.target.value})}
                        className="bg-gray-700 border-gray-600 text-white"
                        placeholder="e.g., emergency-theme"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-300">Primary Color</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="color"
                            value={themeForm.primaryColor}
                            onChange={(e) => setThemeForm({...themeForm, primaryColor: e.target.value})}
                            className="w-12 h-10"
                          />
                          <Input
                            value={themeForm.primaryColor}
                            onChange={(e) => setThemeForm({...themeForm, primaryColor: e.target.value})}
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-gray-300">Secondary Color</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="color"
                            value={themeForm.secondaryColor}
                            onChange={(e) => setThemeForm({...themeForm, secondaryColor: e.target.value})}
                            className="w-12 h-10"
                          />
                          <Input
                            value={themeForm.secondaryColor}
                            onChange={(e) => setThemeForm({...themeForm, secondaryColor: e.target.value})}
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-300">Accent Color</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="color"
                            value={themeForm.accentColor}
                            onChange={(e) => setThemeForm({...themeForm, accentColor: e.target.value})}
                            className="w-12 h-10"
                          />
                          <Input
                            value={themeForm.accentColor}
                            onChange={(e) => setThemeForm({...themeForm, accentColor: e.target.value})}
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-gray-300">Background Color</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="color"
                            value={themeForm.backgroundColor}
                            onChange={(e) => setThemeForm({...themeForm, backgroundColor: e.target.value})}
                            className="w-12 h-10"
                          />
                          <Input
                            value={themeForm.backgroundColor}
                            onChange={(e) => setThemeForm({...themeForm, backgroundColor: e.target.value})}
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label className="text-gray-300">Text Color</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="color"
                          value={themeForm.textColor}
                          onChange={(e) => setThemeForm({...themeForm, textColor: e.target.value})}
                          className="w-12 h-10"
                        />
                        <Input
                          value={themeForm.textColor}
                          onChange={(e) => setThemeForm({...themeForm, textColor: e.target.value})}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                    </div>
                    <Button onClick={handleCreateTheme} className="w-full bg-[#2196F3] hover:bg-[#1976D2]">
                      Create Theme
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>

        {/* Data Display */}
        {loadingData ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00BFA6]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Service Categories */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Service Categories ({categories.length})</CardTitle>
                <CardDescription className="text-gray-400">
                  Manage service categories and their themes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{category.icon}</div>
                        <div>
                          <h3 className="font-semibold text-white">{category.name}</h3>
                          <p className="text-sm text-gray-400">{category.description}</p>
                          <Badge variant="outline" className="text-xs mt-1">
                            Theme: {category.theme}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Themes */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Themes ({themes.length})</CardTitle>
                <CardDescription className="text-gray-400">
                  Available themes for service categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {themes.map((theme) => (
                    <div key={theme.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-8 h-8 rounded-full border-2 border-gray-600"
                          style={{ backgroundColor: theme.primaryColor }}
                        ></div>
                        <div>
                          <h3 className="font-semibold text-white">{theme.name}</h3>
                          <p className="text-sm text-gray-400">{theme.identifier}</p>
                          <div className="flex space-x-1 mt-1">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: theme.primaryColor }}
                            ></div>
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: theme.secondaryColor }}
                            ></div>
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: theme.accentColor }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
