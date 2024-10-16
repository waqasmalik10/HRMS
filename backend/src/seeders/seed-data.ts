import { DataSource, In } from 'typeorm';
import { FINANCE_CATEGORIES_LIST, ROLE_LIST } from './data';
import { AdditionalRoles } from 'src/employees/entities/additional-roles.entity';
import { FinanceCategories } from 'src/finance-categories/entities/finance-category.entity';

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

  //seed finance_categories
  const financeCategoriesRepository =
    dataSource.getRepository(FinanceCategories);

  const financeCategoriesList = FINANCE_CATEGORIES_LIST;
  for(const financeCategory of financeCategoriesList){
    let _financeCategoryItem = {
      category_name: financeCategory.category_name,
      color_code: financeCategory.color_code,
      company_id: financeCategory.company_id
    };
    let _financeCategory = financeCategoriesRepository.create({
      ..._financeCategoryItem
    });
    await financeCategoriesRepository.save(_financeCategory);
  }
}