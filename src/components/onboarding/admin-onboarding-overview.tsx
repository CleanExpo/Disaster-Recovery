'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Users, TrendingUp, Award, Filter, Search } from 'lucide-react';

interface ContractorOnboarding {
  contractorId: string;
  specialization: string;
  completionPercentage: number;
  certificationType: string;
  startDate: string;
  targetCompletionDate: string;
}

export function AdminOnboardingOverview() {
  const [contractors, setContractors] = useState<ContractorOnboarding[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialization, setFilterSpecialization] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    // Mock data for now - replace with actual API call
    // fetchAllContractors();
    setContractors([
      {
        contractorId: '123e4567-e89b-12d3-a456-426614174000',
        specialization: 'water',
        completionPercentage: 75,
        certificationType: 'IN_PROGRESS',
        startDate: '2025-12-01',
        targetCompletionDate: '2025-12-31',
      },
      {
        contractorId: '223e4567-e89b-12d3-a456-426614174001',
        specialization: 'fire',
        completionPercentage: 100,
        certificationType: 'CERTIFIED',
        startDate: '2025-11-15',
        targetCompletionDate: '2025-12-15',
      },
      {
        contractorId: '323e4567-e89b-12d3-a456-426614174002',
        specialization: 'combined',
        completionPercentage: 45,
        certificationType: 'IN_PROGRESS',
        startDate: '2025-12-10',
        targetCompletionDate: '2026-01-10',
      },
    ]);
    setLoading(false);
  }, []);

  const filteredContractors = contractors.filter(contractor => {
    const matchesSearch = contractor.contractorId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization = filterSpecialization === 'all' || contractor.specialization === filterSpecialization;
    const matchesStatus = filterStatus === 'all' || contractor.certificationType === filterStatus;

    return matchesSearch && matchesSpecialization && matchesStatus;
  });

  const stats = {
    total: contractors.length,
    certified: contractors.filter(c => c.certificationType === 'CERTIFIED').length,
    inProgress: contractors.filter(c => c.certificationType === 'IN_PROGRESS').length,
    avgCompletion: contractors.length > 0
      ? Math.round(contractors.reduce((acc, c) => acc + c.completionPercentage, 0) / contractors.length)
      : 0,
  };

  const getStatusBadge = (type: string, percentage: number) => {
    if (type === 'CERTIFIED') {
      return <Badge variant="default" className="bg-green-600">Certified</Badge>;
    } else if (percentage >= 50) {
      return <Badge variant="default">In Progress</Badge>;
    } else {
      return <Badge variant="secondary">Getting Started</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Contractors</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{stats.certified}</p>
                <p className="text-sm text-muted-foreground">Certified</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">{stats.inProgress}</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">{stats.avgCompletion}%</p>
                <p className="text-sm text-muted-foreground">Avg Completion</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Contractor Onboarding Status</CardTitle>
          <CardDescription>Monitor and manage contractor training progress</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by contractor ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <Select value={filterSpecialization} onValueChange={setFilterSpecialization}>
              <SelectTrigger className="w-full md:w-[200px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Specialization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specializations</SelectItem>
                <SelectItem value="water">Water Damage</SelectItem>
                <SelectItem value="fire">Fire Restoration</SelectItem>
                <SelectItem value="mould">Mould Remediation</SelectItem>
                <SelectItem value="combined">Combined</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-[200px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="CERTIFIED">Certified</SelectItem>
                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Contractors Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contractor ID</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Target Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContractors.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No contractors found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredContractors.map((contractor) => (
                    <TableRow key={contractor.contractorId}>
                      <TableCell className="font-mono text-sm">
                        {contractor.contractorId.slice(0, 8)}...
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {contractor.specialization.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1 min-w-[150px]">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{contractor.completionPercentage}%</span>
                          </div>
                          <Progress value={contractor.completionPercentage} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(contractor.certificationType, contractor.completionPercentage)}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(contractor.targetCompletionDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
