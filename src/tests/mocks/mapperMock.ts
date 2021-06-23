import { User } from '../../types';

export class MapperMock {
  toDomain(dalEntity: any) {
    return dalEntity;
  };

  toDalEntity(domainEntity: any) {
    return domainEntity;
  }
};
