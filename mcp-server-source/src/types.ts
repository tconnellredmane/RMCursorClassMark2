export interface FieldDefinition {
  fieldId: number;
  label: string;
  systemName: string;
  addType: string;
  hidden: boolean;
  isMirror: boolean;
  required: boolean;
  sortOrder: number;
  values: string[];
  description: string;
  source?: number;
}

export interface RelatedTableDefinition {
  Id: number;
  SystemName: string;
  Field: string;
  RelationshipType?: 'ParentOf' | 'ChildOf' | 'LinkFrom' | 'LinkTo';
}

export interface DatalistDefinition {
  Id: number;
  Label: string;
  SystemName: string;
  Description?: string;
  Fields: FieldDefinition[];
  Children: number[];
  Parents?: RelatedTableDefinition[];
}

export interface DatalistSummary {
  Id: number;
  Label: string;
  SystemName: string;
  FieldCount: number;
}

export interface Relationship {
  TargetDatalist: string;
  TargetField: string;
  SourceDatalist: string;
  SourceField: string;
  RelationshipType: string;
}

export interface FieldOption {
  Key: string;
  Value: string;
}

export interface FieldTemplate {
  fieldId: number;
  systemName: string;
  label: string;
  addType: string;
  sortOrder: number;
  description?: string;
  required: boolean;
  defaultValue?: string;
  fieldOptions: FieldOption[];
  items?: any[];
}

export interface Header {
  fieldTemplates: FieldTemplate[];
  fieldOptions: FieldOption[];
}

export interface Section {
  headers: Header[];
  fieldOptions: FieldOption[];
}

export interface RawTemplateData {
  listId: number;
  listLabel: string;
  systemName: string;
  description?: string;
  sections: Section[];
  children?: Array<{ ChildListID: number }>;
}

export interface RelationshipData {
  ChildListID: number;
  ParentListID: number;
}
