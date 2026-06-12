import dotenv from 'dotenv';
import { MCaseApiClient } from './mcaseApiClient.js';

// Load environment variables
dotenv.config();

export function getMCaseApiClient(): MCaseApiClient {
  const url = process.env.MCASE_API_URL;
  const user = process.env.MCASE_API_USER;
  const password = process.env.MCASE_API_PASSWORD;

  if (!url || !user || !password) {
    console.error('⚠️  Warning: MCASE_API_URL, MCASE_API_USER, and MCASE_API_PASSWORD environment variables not set');
    console.error('   Using mock credentials for testing. API calls will fail but MCP tools will be available.');
    
    return new MCaseApiClient(
      url || 'https://mock-mcase-api.com/api',
      user || 'mock_user',
      password || 'mock_password'
    );
  }

  return new MCaseApiClient(url, user, password);
}
