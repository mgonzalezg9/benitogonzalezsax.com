import type { LocationEntry } from './locations';

export interface RecommendedSupplier {
  name: string;
  category: string;
  description: string;
  serviceArea: string;
  url: string;
  profileUrl?: string;
}

const recommendedSuppliersByLocation: Record<string, RecommendedSupplier[]> = {
  'saxofonista-para-bodas-en-murcia': [
    {
      name: 'Maria y Co',
      category: 'Wedding planner',
      description:
        'Recomendada para parejas que buscan una planificación cuidada, coordinación profesional y una experiencia de boda elegante en Murcia y Cartagena.',
      serviceArea: 'Murcia, Cartagena y Región de Murcia',
      url: 'https://www.mariayco.es/',
      profileUrl: 'https://www.bodas.net/organizacion-bodas/maria-%26-co--e187381',
    },
  ],
};

export const getRecommendedSuppliersForLocation = (location: LocationEntry) =>
  recommendedSuppliersByLocation[location.slug];
