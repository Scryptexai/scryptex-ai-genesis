const openai = require('../config/openai');
const responseFormatter = require('../utils/responseFormatter');

class AIService {
  /**
   * Generate analysis using OpenAI API
   * @param {string} prompt - The prompt for analysis
   * @param {number} maxTokens - Maximum tokens for the response
   * @returns {Promise<object>} - Analysis result
   */
  async generateAnalysis(prompt, maxTokens = 1000) {
    try {
      const response = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL,
        messages: [
          { role: 'system', content: 'You are a cryptocurrency and blockchain analysis expert. Provide accurate and detailed information about crypto projects.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: maxTokens,
        temperature: 0.5, // More deterministic responses
        response_format: { type: 'json_object' } // Ensure response is in JSON format
      });

      const result = JSON.parse(response.choices[0].message.content);
      return result;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw responseFormatter.error('Failed to generate analysis. Please try again later.', 500);
    }
  }

  /**
   * Generate project overview analysis
   * @param {string} projectName - Name of the project
   * @param {string} projectUrl - URL of the project
   * @returns {Promise<object>} - Project overview data
   */
  async generateAboutAnalysis(projectName, projectUrl) {
    const prompt = `
      Analyze the crypto project ${projectName} with website ${projectUrl}. 
      Provide a comprehensive overview with the following information:
      - A clear and concise description of what the project does
      - The category it belongs to (Layer 1, Layer 2, DeFi, GameFi, etc.)
      - Key features or value propositions (at least 3-4 points)
      - Launch date (approximate if exact date is unknown)
      - An overall score from 1-10

      Format the response as a JSON with these fields:
      {
        "description": "Brief description of the project",
        "category": "Project category",
        "keyFeatures": ["Feature 1", "Feature 2", "Feature 3"],
        "launchDate": "Date of launch (Month Year)",
        "score": number
      }
    `;

    try {
      return await this.generateAnalysis(prompt, 1000);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Generate tokenomics analysis
   * @param {string} projectName - Name of the project
   * @returns {Promise<object>} - Tokenomics data
   */
  async generateTokenomicsAnalysis(projectName) {
    const prompt = `
      Analyze the tokenomics of ${projectName}. 
      Provide detailed information about the project's token with the following:
      - Token symbol
      - Total supply
      - Token utility or use case
      - Token distribution breakdown

      Format the response as a JSON with these fields:
      {
        "symbol": "Token symbol",
        "totalSupply": "Total supply of tokens",
        "useCase": "Description of token utility",
        "distribution": [
          {"label": "Team", "value": percentage},
          {"label": "Investors", "value": percentage},
          {"label": "Community", "value": percentage},
          {"label": "Treasury", "value": percentage}
        ]
      }

      Ensure the distribution percentages add up to 100.
    `;

    try {
      return await this.generateAnalysis(prompt, 1000);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Generate community and sentiment analysis
   * @param {string} projectName - Name of the project
   * @returns {Promise<object>} - Community data
   */
  async generateCommunityAnalysis(projectName) {
    const prompt = `
      Analyze the community and sentiment for ${projectName}.
      Provide comprehensive information about:
      - Overall community strength and sentiment score
      - Risk assessment (Low, Medium, High)
      - Specific metrics for community health

      Format the response as a JSON with these fields:
      {
        "score": number from 0-100,
        "sentiment": "Positive/Neutral/Negative",
        "riskAssessment": "Low/Medium/High",
        "metrics": [
          {"name": "Twitter/X Followers", "score": number from 0-100},
          {"name": "Discord/Telegram Activity", "score": number from 0-100},
          {"name": "Developer Activity", "score": number from 0-100},
          {"name": "Community Growth", "score": number from 0-100}
        ]
      }
    `;

    try {
      return await this.generateAnalysis(prompt, 1200);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AIService();