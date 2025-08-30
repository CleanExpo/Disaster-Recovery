'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';
import { 
  Brain, 
  Code, 
  FileSearch, 
  Globe, 
  Palette, 
  TestTube,
  CheckCircle,
  XCircle,
  Loader2,
  Sparkles
} from 'lucide-react';

interface AgentCapability {
  name: string;
  description: string;
  skills: string[];
  confidence: number;
}

interface AgentStatus {
  agent: string;
  ready: boolean;
}

export function ResearchPlannerUI() {
  const [task, setTask] = useState('');
  const [taskType, setTaskType] = useState<string>('analysis');
  const [priority, setPriority] = useState<string>('medium');
  const [isLoading, setIsLoading] = useState(false);
  const [capabilities, setCapabilities] = useState<AgentCapability[]>([]);
  const [agentStatus, setAgentStatus] = useState<AgentStatus[]>([]);
  const [result, setResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('input');

  useEffect(() => {
    fetchAgentStatus();
  }, []);

  const fetchAgentStatus = async () => {
    try {
      const response = await fetch('/api/agents/research');
      const data = await response.json();
      
      if (data.success) {
        setCapabilities(data.capabilities || []);
        setAgentStatus(data.status || []);
      }
    } catch (error) {
      console.error('Failed to fetch agent status:', error);
    }
  };

  const handleSubmit = async () => {
    if (!task.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a task description',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);
    setActiveTab('progress');

    try {
      const response = await fetch('/api/agents/research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          task,
          type: taskType,
          priority
        })
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.result);
        setActiveTab('results');
        toast({
          title: 'Success',
          description: 'Research task completed successfully'
        });
      } else {
        throw new Error(data.error || 'Research task failed');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to execute research task',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getAgentIcon = (agentName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      'shadcn-expert': <Sparkles className="h-4 w-4" />,
      'ui-designer': <Palette className="h-4 w-4" />,
      'browser-automation': <Globe className="h-4 w-4" />,
      'documentation': <FileSearch className="h-4 w-4" />,
      'code-analysis': <Code className="h-4 w-4" />
    };
    return iconMap[agentName] || <Brain className="h-4 w-4" />;
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6" />
            Research Planner Agent System
          </CardTitle>
          <CardDescription>
            AI-powered research and analysis with specialized sub-agents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="input">Input</TabsTrigger>
              <TabsTrigger value="agents">Agents</TabsTrigger>
              <TabsTrigger value="progress" disabled={!isLoading}>Progress</TabsTrigger>
              <TabsTrigger value="results" disabled={!result}>Results</TabsTrigger>
            </TabsList>

            <TabsContent value="input" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Task Description</label>
                <Textarea
                  placeholder="Describe the research or analysis task..."
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Task Type</label>
                  <Select value={taskType} onValueChange={setTaskType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="documentation">Documentation</SelectItem>
                      <SelectItem value="analysis">Code Analysis</SelectItem>
                      <SelectItem value="design">UI Design</SelectItem>
                      <SelectItem value="implementation">Implementation</SelectItem>
                      <SelectItem value="testing">Testing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority</label>
                  <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                onClick={handleSubmit} 
                disabled={isLoading || !task.trim()}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Execute Research Task
                  </>
                )}
              </Button>
            </TabsContent>

            <TabsContent value="agents" className="space-y-4">
              <div className="grid gap-4">
                {capabilities.map((capability, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center gap-2">
                          {getAgentIcon(capability.name.toLowerCase().replace(/\s+/g, '-'))}
                          {capability.name}
                        </CardTitle>
                        <Badge variant={capability.confidence > 0.9 ? 'default' : 'secondary'}>
                          {Math.round(capability.confidence * 100)}% Confidence
                        </Badge>
                      </div>
                      <CardDescription>{capability.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {capability.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Agent Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {agentStatus.map((status, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getAgentIcon(status.agent)}
                          <span className="capitalize">{status.agent.replace('-', ' ')}</span>
                        </div>
                        {status.ready ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="progress" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Research Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Progress value={isLoading ? 50 : 100} />
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Analyzing task and coordinating agents...</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="results" className="space-y-4">
              {result && (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle>Research Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{result.summary}</p>
                      <div className="mt-4 flex items-center gap-4">
                        <Badge variant="outline">
                          Confidence: {Math.round((result.confidence || 0) * 100)}%
                        </Badge>
                        {result.metadata && (
                          <>
                            <Badge variant="outline">
                              {result.metadata.successfulAgents}/{result.metadata.totalAgents} Agents
                            </Badge>
                            <Badge variant="outline">
                              {new Date(result.metadata.timestamp).toLocaleTimeString()}
                            </Badge>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {result.recommendations && result.recommendations.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Recommendations</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {result.recommendations.map((rec: string, index: number) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                              <span className="text-sm">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {result.details && Object.keys(result.details).length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Detailed Results</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Tabs defaultValue={Object.keys(result.details)[0]}>
                          <TabsList>
                            {Object.keys(result.details).map((agent) => (
                              <TabsTrigger key={agent} value={agent}>
                                {agent.replace('-', ' ')}
                              </TabsTrigger>
                            ))}
                          </TabsList>
                          {Object.entries(result.details).map(([agent, data]: [string, any]) => (
                            <TabsContent key={agent} value={agent}>
                              <pre className="text-xs bg-muted p-4 rounded-lg overflow-auto">
                                {JSON.stringify(data, null, 2)}
                              </pre>
                            </TabsContent>
                          ))}
                        </Tabs>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}