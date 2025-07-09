import { generateText, streamText } from "ai"
import { groq } from "@ai-sdk/groq"

export class AIAgentService {
  private model = groq("llama-3.3-70b-versatile")

  async generateResponse(prompt: string, context?: string): Promise<string> {
    const systemPrompt = `You are Saarthi AI, an advanced geospatial intelligence agent for space exploration and Earth observation. 
    You specialize in:
    - Satellite imagery analysis
    - Terrain mapping and analysis
    - Weather pattern recognition
    - Mission planning and optimization
    - Flood mapping and disaster response
    
    Provide detailed, technical responses with step-by-step reasoning.
    ${context ? `Context: ${context}` : ""}`

    const { text } = await generateText({
      model: this.model,
      system: systemPrompt,
      prompt: prompt,
      maxTokens: 1000,
    })

    return text
  }

  async *streamResponse(prompt: string, context?: string) {
    const systemPrompt = `You are Saarthi AI, an advanced geospatial intelligence agent. 
    Provide step-by-step analysis with clear reasoning for each step.
    ${context ? `Context: ${context}` : ""}`

    const result = streamText({
      model: this.model,
      system: systemPrompt,
      prompt: prompt,
      maxTokens: 1500,
    })

    for await (const chunk of result.textStream) {
      yield chunk
    }
  }

  async analyzeGeospatialData(data: any, analysisType: string): Promise<string> {
    const prompt = `Analyze this geospatial data for ${analysisType}:
    Data: ${JSON.stringify(data, null, 2)}
    
    Provide:
    1. Data summary and quality assessment
    2. Key findings and patterns
    3. Recommendations for further analysis
    4. Potential applications`

    return this.generateResponse(prompt)
  }

  async generateMissionPlan(objective: string, constraints: any): Promise<string> {
    const prompt = `Create a detailed mission plan for: ${objective}
    
    Constraints: ${JSON.stringify(constraints, null, 2)}
    
    Include:
    1. Mission objectives and success criteria
    2. Resource requirements
    3. Timeline and milestones
    4. Risk assessment and mitigation
    5. Data collection strategy`

    return this.generateResponse(prompt)
  }
}

export const aiAgent = new AIAgentService()
