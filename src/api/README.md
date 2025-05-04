
# Scryptex AI Platform API Structure

This folder contains the structure for the Scryptex AI Platform API. This is a blueprint for the API architecture and is not meant to be executed.

## API Structure Overview

```
/api
  /routes
    /auth.ts
    /user.ts
    /credit.ts
    /analyze.ts
  /controllers
    /authController.ts
    /userController.ts
    /creditController.ts
    /analyzeController.ts
  /models
    /User.ts
    /Credit.ts
    /Analysis.ts
    /Project.ts
  /utils
    /validation.ts
    /tokenHelper.ts
    /errorHandler.ts
```

## API Endpoints

### Authentication APIs

- `POST /api/auth/signup`: Register a new user
- `POST /api/auth/login`: Authenticate a user
- `GET /api/user/profile`: Get user profile information
- `POST /api/user/referral`: Submit or use a referral code
- `GET /api/user/points`: Get user points/rewards
- `GET /api/user/balance`: Get user TEX token balance

### Credit System APIs

- `GET /api/credit/balance`: Get user's TEX credit balance
- `POST /api/credit/purchase`: Purchase TEX credits (simulated)
- `POST /api/credit/use`: Use TEX credits for analysis
- `GET /api/credit/history`: Get credit transaction history

### Analysis APIs

- `POST /api/analyze/about`: Analyze project about section
- `POST /api/analyze/roadmap`: Analyze project roadmap
- `POST /api/analyze/tokenomics`: Analyze project tokenomics
- `POST /api/analyze/team`: Analyze project team
- `POST /api/analyze/sentiment`: Analyze overall sentiment
- `GET /api/analyze/history`: Get user's analysis history
- `GET /api/analyze/top`: Get top analyzed projects
- `GET /api/analyze/latest`: Get latest analyzed projects

## Request/Response Examples

See the individual route files for detailed request/response examples.
