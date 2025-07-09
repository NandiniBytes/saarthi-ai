import { generateText, streamText } from "ai"
import { groq } from "@ai-sdk/groq"

export class AdvancedAIService {
  // Different Groq models for different use cases
  private chatModel = groq("llama-3.3-70b-versatile")
  private reasoningModel = groq("qwen-qwq-32b", {
    providerOptions: {
      groq: { reasoningFormat: "parsed" },
    },
  })
  private fastModel = groq("llama-3.1-8b-instant")

  async generateChatResponse(prompt: string, context?: string): Promise<string> {
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
      model: this.chatModel,
      system: systemPrompt,
      prompt: prompt,
      maxTokens: 1500,
    })

    return text
  }

  async generateReasoningResponse(prompt: string, context?: string): Promise<string> {
    const systemPrompt = `You are Saarthi AI, an advanced reasoning agent for complex geospatial analysis. 
    Think step by step and show your reasoning process clearly.
    ${context ? `Context: ${context}` : ""}`

    const { text } = await generateText({
      model: this.reasoningModel,
      system: systemPrompt,
      prompt: prompt,
      maxTokens: 2000,
    })

    return text
  }

  async generateFastResponse(prompt: string): Promise<string> {
    const { text } = await generateText({
      model: this.fastModel,
      prompt: prompt,
      maxTokens: 500,
    })

    return text
  }

  async *streamChatResponse(prompt: string, context?: string) {
    const systemPrompt = `You are Saarthi AI, an advanced geospatial intelligence agent. 
    Provide step-by-step analysis with clear reasoning for each step.
    ${context ? `Context: ${context}` : ""}`

    const result = streamText({
      model: this.chatModel,
      system: systemPrompt,
      prompt: prompt,
      maxTokens: 1500,
    })

    for await (const chunk of result.textStream) {
      yield chunk
    }
  }

  async analyzeComplexGeospatialData(data: any, analysisType: string): Promise<string> {
    const prompt = `Perform complex analysis on this geospatial data for ${analysisType}:
    Data: ${JSON.stringify(data, null, 2)}
    
    Think through this step by step:
    1. Data validation and quality assessment
    2. Pattern recognition and anomaly detection
    3. Statistical analysis and correlations
    4. Predictive modeling insights
    5. Actionable recommendations
    6. Risk assessment and mitigation strategies`

    return this.generateReasoningResponse(prompt)
  }

  async generateAdvancedMissionPlan(objective: string, constraints: any, requirements: any): Promise<string> {
    const prompt = `Create a comprehensive mission plan for: ${objective}
    
    Constraints: ${JSON.stringify(constraints, null, 2)}
    Requirements: ${JSON.stringify(requirements, null, 2)}
    
    Develop a detailed plan including:
    1. Mission architecture and system design
    2. Resource allocation and optimization
    3. Timeline with critical path analysis
    4. Risk matrix and contingency planning
    5. Success metrics and KPIs
    6. Data collection and analysis strategy
    7. Stakeholder communication plan
    8. Budget estimation and cost optimization`

    return this.generateReasoningResponse(prompt)
  }

  async processRealTimeData(
    sensorData: any,
    alertThreshold: number,
  ): Promise<{
    status: string
    alerts: string[]
    recommendations: string[]
  }> {
    const prompt = `Analyze this real-time sensor data and provide immediate assessment:
    Sensor Data: ${JSON.stringify(sensorData, null, 2)}
    Alert Threshold: ${alertThreshold}
    
    Provide:
    1. Current status assessment
    2. Any alerts or warnings
    3. Immediate recommendations`

    const response = await this.generateFastResponse(prompt)

    // Parse the response to extract structured data
    // This is a simplified example - in production, you'd use structured output
    return {
      status: "normal", // Would be parsed from response
      alerts: [], // Would be extracted from response
      recommendations: [response], // Would be structured from response
    }
  }
}

export const advancedAI = new AdvancedAIService()
