import { UserAttributes } from '../user.interface';
import { Optional } from 'sequelize/types';
export interface CreateUserDto
  extends Optional<
    UserAttributes,
    'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
  > {}
