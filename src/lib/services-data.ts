export interface ServiceData {
  id: number;
  title: string;
  shortDesc: string;
  img: string;
  details: string[];
}

export const services: ServiceData[] = [
  {
    id: 0,
    title: 'Custom Sheet Metal Components',
    shortDesc: 'With advanced manufacturing capabilities, we produce steel components as per customer drawings, specifications and requirements while maintaining high standards of quality and precision.',
    img: '/photos/home/custom_sheet_metal_components.png',
    details: [
      'Custom fabrication per customer drawings, specifications, and requirements',
      'Advanced CNC punching, laser cutting, and bending capabilities',
      'Wide range of material grades — HR, CR, Galvanized, and Stainless Steel',
      'Precision components with tight tolerances for automotive and industrial applications',
      'Batch production with consistent ISO 9001:2015 certified quality control',
      'Rapid prototyping supported for design validation before full production runs',
    ],
  },
  {
    id: 1,
    title: 'Slitted Coils',
    shortDesc: 'We provide high-quality slitted steel coils tailored to customer specifications in various widths, thicknesses, and grades to meet diverse industrial requirements.',
    img: '/photos/home/slitted_coils.jpeg',
    details: [
      'Precision slitting for custom widths as per customer requirements',
      'Available in HR, CR, and Galvanized steel grades',
      'Thickness range from 0.5 mm to 6.0 mm',
      'Burr-free edges for downstream processing',
      'Tight width tolerances ± 0.2 mm',
      'Custom packaging for handling and transportation protection',
    ],
  },
  {
    id: 2,
    title: 'Cut-to-length Sheets & Strips',
    shortDesc: 'We provide precision cut-to-length sheets & strips tailored to customer specifications, ensuring dimensional accuracy and reliable supply for diverse industrial applications.',
    img: '/photos/home/cut_to_length_sheets_strips.jpeg',
    details: [
      'Custom cut-to-length sheets and strips as per specifications',
      'Available in various widths, thicknesses, and steel grades',
      'Dimensional accuracy with precise length and squareness control',
      'Surface finish preservation — no scratching or deformation during cutting',
      'Just-in-time delivery scheduling to support production planning',
    ],
  },
  {
    id: 3,
    title: 'Custom Bar Components',
    shortDesc: 'We manufacture high-quality precise bar components tailored to customer requirements as per their drawings and specifications.',
    img: '/photos/home/custom_bar_components.png',
    details: [
      'Precision-machined bar components per customer drawings',
      'Multi-axis CNC machining for complex geometries',
      'Wide range of cross-sections — round, square, hexagonal, and profile',
      'Heat treatment and surface finishing available',
      'Stringent dimensional inspection at every stage',
      'Suitable for automotive, agricultural, and general engineering applications',
    ],
  },
];

export function getServiceById(id: number): ServiceData | undefined {
  return services.find((s) => s.id === id);
}
