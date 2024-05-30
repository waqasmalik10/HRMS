import { DataSource, In } from 'typeorm';
import { ROLE_LIST } from './data';
import { AdditionalRoles } from 'src/employees/entities/additional-roles.entity';

export async function seedData(dataSource: DataSource): Promise<void> {

  const additionalRolesRepository = dataSource.getRepository(AdditionalRoles);

  const rolesList = ROLE_LIST;
  for (const role of rolesList) {
    let _roleItem = {
      name: role.name,
      description: role.description,
    };
    let _role = additionalRolesRepository.create({
      ..._roleItem
    });
    await additionalRolesRepository.save(_role);
  }
}