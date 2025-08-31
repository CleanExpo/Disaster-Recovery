#!/usr/bin/env python3
"""
Critical LLM Discretion Analysis & Prompt Enhancement Engine
Version: 2.0.0
Purpose: Enforce strict instruction following with real data focus for investor-grade projects
"""

import json
import sys
import os
import subprocess
from typing import Dict, List, Any
from datetime import datetime

class InstructionComplianceEngine:
    """
    Addresses LLM discretion failures by implementing strict instruction following
    and real prompt enhancement for investor-grade real data projects
    """
    
    def __init__(self):
        self.project_context = self.analyze_project_context()
        self.discretion_failures = []
        self.compliance_score = 100
        
    def analyze_project_context(self) -> Dict[str, Any]:
        """Analyze real project structure and .env variables"""
        context = {
            'project_type': 'Real Data Investor Pitch Deck Website - Disaster Recovery Australia',
            'security_level': 'Production Grade - Vercel Deployment',
            'env_location': 'Vercel .env and .env.local',
            'real_data_requirement': True,
            'critical_apis': self.get_available_apis(),
            'project_structure': self.scan_project_files(),
            'deployment_target': 'https://disaster-recovery.vercel.app',
            'docker_orchestrator': self.check_docker_orchestrator()
        }
        return context
    
    def get_available_apis(self) -> List[str]:
        """Identify available API services without exposing keys"""
        apis = []
        
        # Check .env files for API patterns
        env_files = ['.env', '.env.local', '.env.docker']
        for env_file in env_files:
            if os.path.exists(env_file):
                with open(env_file, 'r') as f:
                    content = f.read()
                    # Check for API key patterns without reading values
                    if 'ELEVENLABS' in content:
                        apis.append('ElevenLabs Voice API (Pitch Narration)')
                    if 'ANTHROPIC' in content:
                        apis.append('Anthropic Claude API (Content Generation)')
                    if 'OPENROUTER' in content:
                        apis.append('OpenRouter API (Model Access)')
                    if 'SUPABASE' in content:
                        apis.append('Supabase (Database)')
                    if 'NEXTAUTH' in content:
                        apis.append('NextAuth (Authentication)')
        
        return apis if apis else ['ElevenLabs', 'Anthropic', 'Data APIs']
    
    def check_docker_orchestrator(self) -> Dict[str, bool]:
        """Check Docker Claude Orchestrator status"""
        try:
            # Check if Docker containers are running
            result = subprocess.run(['docker', 'ps', '--filter', 'name=claude'], 
                                  capture_output=True, text=True)
            orchestrator_running = 'claude-main' in result.stdout
            redis_running = 'claude-redis' in result.stdout
            
            # Check API health
            import requests
            try:
                health = requests.get('http://localhost:3000/health', timeout=2)
                api_healthy = health.status_code == 200
            except:
                api_healthy = False
            
            return {
                'orchestrator_running': orchestrator_running,
                'redis_running': redis_running,
                'api_healthy': api_healthy,
                'endpoint': 'http://localhost:3000' if api_healthy else None
            }
        except:
            return {
                'orchestrator_running': False,
                'redis_running': False,
                'api_healthy': False,
                'endpoint': None
            }
    
    def scan_project_files(self) -> Dict[str, List[str]]:
        """Scan critical project files for context"""
        structure = {
            'critical_files': [],
            'api_endpoints': [],
            'components': [],
            'data_files': []
        }
        
        # Check for critical files
        critical_paths = [
            'src/app/pitch/page.tsx',  # Pitch deck
            'src/app/api/elevenlabs/narrate/route.ts',  # Voice API
            'src/data/realistic-financial-projections.ts',  # Real data
            'docker-compose.claude-simple.yml',  # Docker config
            '.env.local',  # Local environment
            'vercel.json'  # Vercel config
        ]
        
        for path in critical_paths:
            if os.path.exists(path):
                structure['critical_files'].append(path)
        
        # Scan API routes
        api_dir = 'src/app/api'
        if os.path.exists(api_dir):
            for root, dirs, files in os.walk(api_dir):
                for file in files:
                    if file.endswith('.ts') or file.endswith('.tsx'):
                        structure['api_endpoints'].append(os.path.join(root, file))
        
        return structure
    
    def perform_discretion_analysis(self, original_prompt: str) -> Dict[str, Any]:
        """
        Critical discretion analysis to prevent LLM from adding unwanted tasks
        """
        analysis = {
            'exact_request': self.extract_exact_request(original_prompt),
            'identified_assumptions': [],
            'compliance_checks': [],
            'discretion_score': 100
        }
        
        # Check for common discretion failures
        discretion_checks = [
            {
                'check': 'task_scope',
                'question': 'Is the LLM trying to do more than requested?',
                'indicator': ['also', 'additionally', 'furthermore', 'let me also']
            },
            {
                'check': 'method_compliance',
                'question': 'Is the specific method/approach being followed?',
                'indicator': ['instead', 'better way', 'alternatively', 'different approach']
            },
            {
                'check': 'format_adherence',
                'question': 'Is the output in the exact format requested?',
                'indicator': ['modified', 'enhanced version', 'improved format']
            },
            {
                'check': 'unauthorized_additions',
                'question': 'Are there unauthorized additions to the task?',
                'indicator': ['added', 'included extra', 'bonus', 'also created']
            }
        ]
        
        for check in discretion_checks:
            passed = True
            for indicator in check['indicator']:
                if indicator.lower() in original_prompt.lower():
                    passed = False
                    analysis['identified_assumptions'].append({
                        'type': check['check'],
                        'concern': check['question'],
                        'detected': indicator
                    })
                    analysis['discretion_score'] -= 25
            
            analysis['compliance_checks'].append({
                'check': check['check'],
                'passed': passed,
                'question': check['question']
            })
        
        return analysis
    
    def extract_exact_request(self, prompt: str) -> Dict[str, str]:
        """Extract the exact request without interpretation"""
        return {
            'raw_request': prompt,
            'action_verbs': self.extract_action_verbs(prompt),
            'specific_targets': self.extract_targets(prompt),
            'format_requirements': self.extract_format(prompt),
            'method_specified': self.extract_method(prompt)
        }
    
    def extract_action_verbs(self, prompt: str) -> List[str]:
        """Extract action verbs to understand exact task"""
        action_verbs = ['create', 'fix', 'update', 'implement', 'setup', 'configure', 
                       'analyze', 'generate', 'build', 'deploy', 'test', 'run']
        found = []
        for verb in action_verbs:
            if verb in prompt.lower():
                found.append(verb)
        return found
    
    def extract_targets(self, prompt: str) -> List[str]:
        """Extract specific targets mentioned"""
        targets = []
        keywords = ['pitch deck', 'audio', 'narration', 'orchestrator', 'docker', 
                   'api', 'real data', 'investor', 'presentation', 'agents']
        for keyword in keywords:
            if keyword in prompt.lower():
                targets.append(keyword)
        return targets
    
    def extract_format(self, prompt: str) -> str:
        """Extract any format requirements"""
        if 'json' in prompt.lower():
            return 'JSON'
        elif 'yaml' in prompt.lower():
            return 'YAML'
        elif 'python' in prompt.lower():
            return 'Python'
        elif 'typescript' in prompt.lower():
            return 'TypeScript'
        return 'Not specified'
    
    def extract_method(self, prompt: str) -> str:
        """Extract specified method or approach"""
        if 'docker' in prompt.lower():
            return 'Docker-based implementation'
        elif 'api' in prompt.lower():
            return 'API integration'
        elif 'orchestrator' in prompt.lower():
            return 'Orchestrator-driven'
        return 'Standard implementation'
    
    def enhance_prompt(self, original_prompt: str) -> Dict[str, Any]:
        """
        Enhance prompt while maintaining EXACT user intent
        NO DISCRETION - Follow instructions exactly
        """
        
        # Perform critical discretion analysis
        discretion_analysis = self.perform_discretion_analysis(original_prompt)
        
        # Build enhanced prompt with strict compliance
        enhanced_prompt = f"""
CRITICAL INSTRUCTION COMPLIANCE DIRECTIVE:
========================================
YOU MUST FOLLOW THE HUMAN'S EXACT INSTRUCTIONS WITHOUT ADDING YOUR OWN DISCRETION.

ORIGINAL HUMAN REQUEST (EXECUTE EXACTLY):
"{original_prompt}"

DISCRETION ANALYSIS RESULTS:
- Compliance Score: {discretion_analysis['discretion_score']}%
- Exact Actions Required: {', '.join(discretion_analysis['exact_request']['action_verbs'])}
- Specific Targets: {', '.join(discretion_analysis['exact_request']['specific_targets'])}
- Method to Use: {discretion_analysis['exact_request']['method_specified']}
- Format Required: {discretion_analysis['exact_request']['format_requirements']}

PROJECT CONTEXT (USE BUT DON'T CHANGE REQUEST):
================================================
Project: {self.project_context['project_type']}
Security: {self.project_context['security_level']}
Deployment: {self.project_context['deployment_target']}

Available APIs (in Vercel .env):
{chr(10).join('- ' + api for api in self.project_context['critical_apis'])}

Docker Orchestrator Status:
- Orchestrator: {'RUNNING' if self.project_context['docker_orchestrator']['orchestrator_running'] else 'NOT RUNNING'}
- Redis: {'RUNNING' if self.project_context['docker_orchestrator']['redis_running'] else 'NOT RUNNING'}
- API: {'HEALTHY' if self.project_context['docker_orchestrator']['api_healthy'] else 'NOT HEALTHY'}
{f"- Endpoint: {self.project_context['docker_orchestrator']['endpoint']}" if self.project_context['docker_orchestrator']['endpoint'] else ''}

Critical Files Present:
{chr(10).join('- ' + f for f in self.project_context['project_structure']['critical_files'])}

STRICT COMPLIANCE REQUIREMENTS:
================================
1. DO EXACTLY what the human asked - nothing more, nothing less
2. USE the exact method/approach they specified
3. MAINTAIN the exact format they requested
4. DO NOT add features or improvements unless explicitly asked
5. DO NOT change their approach to a "better" one
6. DO NOT interpret or assume intent beyond explicit instructions

REAL DATA REQUIREMENTS:
=======================
- ALL data must be real and verifiable (no mock/placeholder)
- Use APIs from Vercel .env for data collection
- ElevenLabs for voice narration (API key available)
- Financial data from realistic-financial-projections.ts
- Australian disaster statistics from real sources

SECURITY REQUIREMENTS:
======================
- NEVER expose API keys from .env files
- Use environment variables properly
- Maintain production-grade security
- Follow Vercel deployment best practices

EXECUTION DIRECTIVE:
====================
Execute the human's EXACT request with the project context and requirements above.
If they asked for X in method Y with format Z, deliver EXACTLY that.
No additions, no improvements, no discretion - just exact compliance.
"""
        
        return {
            'original_intent_preserved': discretion_analysis['discretion_score'] >= 75,
            'discretion_analysis': discretion_analysis,
            'enhanced_prompt': enhanced_prompt,
            'security_considerations': 'Vercel .env protected, API keys secure',
            'real_data_approach': 'Using real APIs and verified data sources',
            'api_integrations': self.project_context['critical_apis'],
            'compliance_score': discretion_analysis['discretion_score'],
            'timestamp': datetime.now().isoformat()
        }
    
    def execute_enhancement(self, original_prompt: str) -> Dict[str, Any]:
        """Main execution function with Docker orchestrator integration"""
        try:
            # Enhance the prompt
            enhanced = self.enhance_prompt(original_prompt)
            
            # If Docker orchestrator is running, use it
            if self.project_context['docker_orchestrator']['api_healthy']:
                enhanced['orchestrator_available'] = True
                enhanced['orchestrator_endpoint'] = self.project_context['docker_orchestrator']['endpoint']
                
                # Send to orchestrator for processing
                import requests
                try:
                    response = requests.post(
                        f"{self.project_context['docker_orchestrator']['endpoint']}/process",
                        json={
                            'prompt': enhanced['enhanced_prompt'],
                            'type': 'analyze',
                            'priority': 10,
                            'context': {
                                'compliance_score': enhanced['compliance_score'],
                                'original_request': original_prompt
                            }
                        }
                    )
                    if response.status_code == 200:
                        enhanced['orchestrator_request_id'] = response.json().get('requestId')
                except Exception as e:
                    enhanced['orchestrator_error'] = str(e)
            
            # Validation check
            if not enhanced.get('original_intent_preserved', False):
                print("⚠️  WARNING: Original intent may have been modified!")
                print(f"Compliance Score: {enhanced['compliance_score']}%")
            
            # Save to cache
            cache_file = f".claude/cache/enhancement_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
            os.makedirs(os.path.dirname(cache_file), exist_ok=True)
            with open(cache_file, 'w') as f:
                json.dump(enhanced, f, indent=2)
            
            return enhanced
            
        except Exception as e:
            return {
                "error": f"Enhancement failed: {str(e)}",
                "fallback_prompt": f"Execute with strict compliance: {original_prompt}",
                "timestamp": datetime.now().isoformat()
            }

def main():
    """Main entry point"""
    if len(sys.argv) > 1:
        original_prompt = ' '.join(sys.argv[1:])
    else:
        original_prompt = sys.stdin.read().strip()
    
    if not original_prompt:
        print(json.dumps({
            "error": "No prompt provided",
            "usage": "python enhance_prompt.py 'your prompt here'"
        }, indent=2))
        sys.exit(1)
    
    engine = InstructionComplianceEngine()
    result = engine.execute_enhancement(original_prompt)
    print(json.dumps(result, indent=2))

if __name__ == "__main__":
    main()