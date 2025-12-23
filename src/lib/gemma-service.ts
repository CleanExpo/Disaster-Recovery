import axios from 'axios';

const GEMMA_API_URL = process.env.GEMMA_API_URL || 'http://localhost:8000';

export async function generateEmbeddings(text: string): Promise<string> {
  try {
    const response = await axios.post(`${GEMMA_API_URL}/api/generate`, {
      prompt: text,
      temperature: 0.7,
      maxTokens: 1024,
      model: 't5-gemma',
    });

    return response.data.text;
  } catch (error) {
    console.error('Gemma API Error:', error);
    // Fallback to basic response
    return JSON.stringify({
      score: 70,
      gaps: ['Module competency'],
      modules: ['Basic Training'],
      timeEstimate: '4 weeks',
      strengths: ['Experience based'],
    });
  }
}

export async function assessContractorProfile(profile: any): Promise<any> {
  const prompt = `Analyze this contractor profile and provide assessment: ${JSON.stringify(profile)}`;
  const result = await generateEmbeddings(prompt);
  return JSON.parse(result);
}

export async function generatePersonalizedLearningPlan(
  contractorId: string,
  competencyLevel: number,
  specialization: string
): Promise<any> {
  const prompt = `
    Create personalized learning plan:
    - Contractor ID: ${contractorId}
    - Competency Level: ${competencyLevel}/100
    - Specialization: ${specialization}

    Provide weekly milestones and resource recommendations
  `;

  const plan = await generateEmbeddings(prompt);
  return JSON.parse(plan);
}
