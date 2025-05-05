const Project = require('../models/Project');
const About = require('../models/About');
const aiService = require('./aiService');
const responseFormatter = require('../utils/responseFormatter');

class AboutService {
  /**
   * Create or update project overview
   * @param {string} projectName - Name of the project
   * @param {string} projectUrl - URL of the project
   * @returns {Promise<object>} - Project overview data
   */
  async createOrUpdateAbout(projectName, projectUrl) {
    try {
      // Find existing project or create new one
      let project = await Project.findOne({ 
        name: { $regex: new RegExp(`^${projectName}$`, 'i') }
      });
      
      if (!project) {
        project = await Project.create({
          name: projectName,
          url: projectUrl
        });
      }

      // Generate the about data from AI
      const aboutData = await aiService.generateAboutAnalysis(projectName, projectUrl);
      
      // Find existing about document or create new one
      let about = await About.findOne({ project: project._id });
      
      if (about) {
        // Update existing about document
        about.description = aboutData.description;
        about.category = aboutData.category;
        about.keyFeatures = aboutData.keyFeatures;
        about.launchDate = aboutData.launchDate;
        about.score = aboutData.score;
        about.updatedAt = Date.now();
        
        await about.save();
      } else {
        // Create new about document
        about = await About.create({
          project: project._id,
          description: aboutData.description,
          category: aboutData.category,
          keyFeatures: aboutData.keyFeatures,
          launchDate: aboutData.launchDate,
          score: aboutData.score
        });
        
        // Update project with about reference
        project.about = about._id;
        project.category = aboutData.category;
        await project.save();
      }
      
      return about;
    } catch (error) {
      console.error('About Service Error:', error);
      throw responseFormatter.error('Failed to analyze project overview', 500);
    }
  }

  /**
   * Get project overview by project ID
   * @param {string} projectId - ID of the project
   * @returns {Promise<object>} - Project overview data
   */
  async getAboutByProjectId(projectId) {
    try {
      const about = await About.findOne({ project: projectId });
      
      if (!about) {
        throw responseFormatter.error('Project overview not found', 404);
      }
      
      return about;
    } catch (error) {
      console.error('About Service Error:', error);
      throw error;
    }
  }

  /**
   * Get project overview by project name
   * @param {string} projectName - Name of the project
   * @returns {Promise<object>} - Project overview data
   */
  async getAboutByProjectName(projectName) {
    try {
      const project = await Project.findOne({ 
        name: { $regex: new RegExp(`^${projectName}$`, 'i') }
      });
      
      if (!project) {
        throw responseFormatter.error('Project not found', 404);
      }
      
      const about = await About.findOne({ project: project._id });
      
      if (!about) {
        throw responseFormatter.error('Project overview not found', 404);
      }
      
      return about;
    } catch (error) {
      console.error('About Service Error:', error);
      throw error;
    }
  }
}

module.exports = new AboutService();
