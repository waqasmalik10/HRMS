import { ROLE_TYPE } from "src/commons/enums"; 

export const ROLE_LIST = [
  {
    name: ROLE_TYPE.HR,
    description: "manage the human resources of company."
  },
  {
    name: ROLE_TYPE.OPERATIONS_MANAGER,
    description: "manage the operatoin of company"
  },
  {
    name: ROLE_TYPE.SALARY_MANAGEMENT,
    description: "manage the salary of employee of the company"
  },
  {
    name: ROLE_TYPE.TEAMLEAD,
    description: "leads the team of company"
  },
];

export const FINANCE_CATEGORIES_LIST = [
  {
    category_name: "salaries",
    color_code: "blue",
    company_id: 1
  },
  {
    category_name: "with holding income tax",
    color_code: "black",
    company_id: 1
  },
  {
    category_name: "office expenses",
    color_code: "golden/orange",
    company_id: 1
  },
  {
    category_name: "office rent",
    color_code: "red",
    company_id: 1
  },
  {
    category_name: "loan",
    color_code: "parrot green",
    company_id: 1
  },
  {
    category_name: "benefits",
    color_code: "parrot green",
    company_id: 1
  },
  {
    category_name: "utility bills ",
    color_code: "pink",
    company_id: 1
  },
  {
    category_name: "bank charges",
    color_code: "Purple",
    company_id: 1
  },
  {
    category_name: "remittance",
    color_code: "green",
    company_id: 1
  },
  {
    category_name: "cancelled",
    color_code: "light gray",
    company_id: 1
  },
]