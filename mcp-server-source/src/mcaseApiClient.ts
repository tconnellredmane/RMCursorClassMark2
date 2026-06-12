import axios, { AxiosInstance } from 'axios';
import { 
  DatalistDefinition, 
  DatalistSummary, 
  RawTemplateData, 
  RelationshipData, 
  Relationship 
} from './types.js';
import { processTemplateData } from './templateProcessor.js';

export class MCaseApiClient {
  private client: AxiosInstance;
  private baseUrl: string;
  private templates: DatalistDefinition[] | null = null;

  constructor(baseUrl: string, user: string, password: string) {
    this.client = axios.create({
      auth: { username: user, password: password },
      timeout: 30000,
      maxRedirects: 5
    });

    this.baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    if (!this.baseUrl.endsWith('resource')) {
      this.baseUrl += '/resource';
    }
  }

  async getData(endpoint: string): Promise<any> {
    const response = await this.client.get(`${this.baseUrl}/${endpoint}`);
    return response.data;
  }

  async postData(endpoint: string, data: object): Promise<any> {
    const response = await this.client.post(`${this.baseUrl}/${endpoint}`, data);
    return response.data;
  }

  async loadTemplates(): Promise<void> {
    if (this.templates === null) {
      const response = await this.client.get(`${this.baseUrl}/Templates`);
      const rawTemplates: RawTemplateData[] = response.data;
      this.templates = rawTemplates.map(t => processTemplateData(t));
    }
  }

  async getAllDataLists(): Promise<DatalistSummary[]> {
    await this.loadTemplates();
    if (!this.templates) return [];
    return this.templates.map(data => ({
      Id: data.Id,
      Label: data.Label,
      SystemName: data.SystemName,
      FieldCount: data.Fields.length
    }));
  }

  async getDatalistById(id: number): Promise<DatalistDefinition | null> {
    await this.loadTemplates();
    if (!this.templates) return null;
    return this.templates.find(t => t.Id === id) || null;
  }

  async getDatalistByName(name: string): Promise<DatalistDefinition | null> {
    await this.loadTemplates();
    if (!this.templates) return null;
    return this.templates.find(t => t.SystemName.toUpperCase() === name.toUpperCase()) || null;
  }

  async getAllRelationships(): Promise<Relationship[]> {
    await this.loadTemplates();
    if (!this.templates) return [];

    const relationships: Relationship[] = [];

    // Parent-child relationships from /ListRelationships endpoint
    try {
      const response = await this.client.get(`${this.baseUrl}/ListRelationships`);
      const relationshipData: RelationshipData[] = response.data;
      
      for (const data of relationshipData) {
        const child = await this.getDatalistById(data.ChildListID);
        const parent = await this.getDatalistById(data.ParentListID);
        
        if (child && parent) {
          relationships.push({
            TargetDatalist: child.SystemName,
            TargetField: 'ParentRecordID',
            SourceDatalist: parent.SystemName,
            SourceField: 'RecordInstanceID',
            RelationshipType: 'ParentChild'
          });
        }
      }
    } catch (error) {
      console.error('Error fetching list relationships:', error);
    }

    // Dynamic link relationships from field source references
    for (const template of this.templates) {
      for (const field of template.Fields) {
        if (field.source && field.source > 0) {
          const sourceDatalist = await this.getDatalistById(field.source);
          if (sourceDatalist) {
            relationships.push({
              TargetDatalist: template.SystemName,
              TargetField: field.systemName,
              SourceDatalist: sourceDatalist.SystemName,
              SourceField: 'RecordInstanceID',
              RelationshipType: 'Link'
            });
          }
        }
      }
    }

    return relationships;
  }
}
