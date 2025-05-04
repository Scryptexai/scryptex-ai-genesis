
/**
 * Analyze Routes
 * 
 * API routes for project analysis features
 * NOT FOR EXECUTION - Structure representation only
 */

// Import controllers only - no express dependencies
import { 
  analyzeProject, 
  getAnalysisHistory, 
  getTopAnalyzedProjects, 
  getAnalysisById
} from '../controllers/analyzeController';

// Mock route structure (commented out)
/*
Routes setup would be:
POST / - analyzeProject (auth required)
GET /history - getAnalysisHistory (auth required)
GET /top - getTopAnalyzedProjects (auth required)
GET /:id - getAnalysisById (auth required)
*/

// Export the controllers to document the API structure
export {
  analyzeProject, 
  getAnalysisHistory, 
  getTopAnalyzedProjects, 
  getAnalysisById
};
