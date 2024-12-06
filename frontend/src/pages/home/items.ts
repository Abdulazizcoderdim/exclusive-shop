import { ChevronRight, LucideIcon } from 'lucide-react';

type Category = {
  name: string;
  icon?: LucideIcon;
  subcategories?: string[];
};

export const category: Category[] = [
  {
    name: 'HomeWoman’s Fashion',
    icon: ChevronRight,
    subcategories: ['Women’s Fashion', 'Men’s Fashion', 'Kids’ Fashion'],
  },
  {
    name: 'Men’s Fashion',
    icon: ChevronRight,
    subcategories: ['Men’s Fashion', 'Men’s Fashion', 'Kids’ Fashion'],
  },
  {
    name: 'Electronics',
  },
  {
    name: 'Home & Lifestyle',
  },
  {
    name: 'Medicine',
  },
  {
    name: 'Sports & Outdoor',
  },
  {
    name: 'Baby’s & Toys',
  },
  {
    name: 'Groceries & Pets',
  },
  {
    name: 'Health & Beauty',
  },
];
