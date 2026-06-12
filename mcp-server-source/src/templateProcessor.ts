import { 
  FieldDefinition, 
  DatalistDefinition, 
  RawTemplateData, 
  FieldTemplate, 
  Section, 
  Header, 
  FieldOption 
} from './types.js';

function cleanDescription(text: string): string {
  if (!text) return '';
  
  let cleaned = text
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
  
  cleaned = cleaned.replace(/<[^>]+>/g, '');
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  cleaned = cleaned.replace(/&[a-zA-Z0-9#]+;/g, '');
  
  return cleaned.trim();
}

function processField(
  field: FieldTemplate, 
  sectionHidden: boolean, 
  headerHidden: boolean, 
  filterHiddenAndMirrorFields: boolean = true
): FieldDefinition | null {
  const fieldSystemName = field.systemName || 'N/A';
  
  // Skip security fields
  if (fieldSystemName === 'USERROLESECURITY') return null;
  
  // Check if field is hidden
  let fieldHidden = false;
  for (const option of (field.fieldOptions || [])) {
    if (option.Key === 'Hidden' && option.Value === 'Yes') {
      fieldHidden = true;
      break;
    }
  }
  
  // Check if field is a mirror field (defaultValue starts with '{')
  const isMirror = typeof field.defaultValue === 'string' && field.defaultValue.startsWith('{');
  
  const isHidden = fieldHidden || headerHidden || sectionHidden;
  
  if (filterHiddenAndMirrorFields && (isHidden || isMirror)) return null;
  
  // Extract picklist values and dynamic link source
  const values: string[] = [];
  let source: number | undefined;
  const addType = field.addType || 'N/A';
  
  for (const item of (field.items || [])) {
    if (typeof item === 'object' && item !== null) {
      if ('value' in item) values.push(String(item.value));
      if (addType.includes('Dynamic') && 'source' in item) source = Number(item.source);
    }
  }
  
  const fieldObj: FieldDefinition = {
    fieldId: field.fieldId || 0,
    systemName: fieldSystemName,
    label: field.label || 'N/A',
    addType,
    hidden: isHidden,
    isMirror,
    required: field.required || false,
    sortOrder: field.sortOrder || 0,
    values,
    description: cleanDescription(field.description || '')
  };
  
  if (source !== undefined) fieldObj.source = source;
  
  return fieldObj;
}

export function processTemplateData(
  data: RawTemplateData, 
  filterHiddenAndMirrorFields: boolean = true
): DatalistDefinition {
  const templateObj: DatalistDefinition = {
    Id: data.listId || 0,
    Label: data.listLabel || 'N/A',
    SystemName: data.systemName || 'N/A',
    Description: cleanDescription(data.description || ''),
    Fields: [],
    Children: (data.children || []).map(c => Number(c.ChildListID))
  };
  
  const allFields: FieldDefinition[] = [];
  
  for (const section of (data.sections || [])) {
    let sectionHidden = false;
    for (const option of (section.fieldOptions || [])) {
      if (option.Key === 'Hidden' && option.Value === 'Yes') { sectionHidden = true; break; }
    }
    
    for (const header of (section.headers || [])) {
      let headerHidden = false;
      for (const option of (header.fieldOptions || [])) {
        if (option.Key === 'Hidden' && option.Value === 'Yes') { headerHidden = true; break; }
      }
      
      for (const field of (header.fieldTemplates || [])) {
        const fieldObj = processField(field, sectionHidden, headerHidden, filterHiddenAndMirrorFields);
        if (fieldObj) allFields.push(fieldObj);
      }
    }
  }
  
  allFields.sort((a, b) => a.sortOrder - b.sortOrder);
  templateObj.Fields = allFields;
  
  return templateObj;
}
