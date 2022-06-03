import { EntityMetadataMap } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Users: {},
};

const pluralNames = { Users: 'Users' };

export const entityConfig = {
  entityMetadata,
  pluralNames,
};
