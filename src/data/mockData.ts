export interface Site {
  id: string;
  code: string;
  name: string;
  updatedAt: string;
  rowVersion: string;
}

export interface RouteStage {
  sequence: number;
  workcentreName: string;
  setupDuration: number;
}

export interface Route {
  id: string;
  name: string;
  updatedAt: string;
  rowVersion: string;
  stages: RouteStage[];
}

export interface Workcentre {
  id: string;
  code: string;
  name: string;
  siteName: string;
  type: 'paper_machine' | 'winder' | 'reel_wrapper';
  rateKg: number;
  campaigned: boolean;
  frozenHorizon: number;
  updatedAt: string;
  rowVersion: string;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  type: 'finished_good' | 'raw_material' | 'intermediate';
  grade: string;
  basisWeightGsm: number | null;
  caliperMicrons: number | null;
  routeId: string | null;
  updatedAt: string;
  rowVersion: string;
}

export interface Customer {
  id: string;
  code: string;
  name: string;
  updatedAt: string;
  rowVersion: string;
}

export interface SalesOrder {
  id: string;
  orderNumber: string;
  customerId: string;
  orderDate: string;
  status: 'Committed' | 'Draft';
  lineCount: number;
}

export interface Task {
  id: string;
  orderNumber: string | null;
  lineNumber: number | null;
  workcentreId: string;
  plannedStart: number;
  plannedEnd: number;
  runStart: number;
  runEnd: number;
  dueDate: number;
  qtyKg: number;
  rowVersion: number;
  blockCode: string;
  runCode: string;
  runStatus: string;
  spec: string;
  hasTask?: boolean;
}

export interface Downtime {
  id: string;
  scope: 'site' | 'workcentre';
  siteId?: string;
  workcentreId?: string;
  isPlanned: boolean;
  description: string;
  reason: string;
  start: number;
  end: number;
}

export const SITES: Site[] = [
  { id: 'site1', code: 'STE-A', name: 'Northfield Mill', updatedAt: '2026-08-20 10:00', rowVersion: '0x0000000000005101' },
  { id: 'site2', code: 'STE-B', name: 'Riverside Mill', updatedAt: '2026-08-19 09:15', rowVersion: '0x0000000000005102' },
  { id: 'site3', code: 'STE-C', name: 'Lakeside Mill', updatedAt: '2026-08-18 14:40', rowVersion: '0x0000000000005103' },
];

export const ROUTES: Route[] = [
  { id: 'rt1', name: 'RT-1S (Winding)', updatedAt: '2026-08-15 08:00', rowVersion: '0x0000000000005201', stages: [
    { sequence: 1, workcentreName: 'Winder 1', setupDuration: 600 },
  ] },
  { id: 'rt2', name: 'RT-2S (Winding → Reel Wrap)', updatedAt: '2026-08-16 08:00', rowVersion: '0x0000000000005202', stages: [
    { sequence: 1, workcentreName: 'Winder 1', setupDuration: 600 },
    { sequence: 2, workcentreName: 'Reel Wrapper 1', setupDuration: 900 },
  ] },
  { id: 'rt3', name: 'RT-3S (Paper Machine → Winding → Reel Wrap)', updatedAt: '2026-08-17 08:00', rowVersion: '0x0000000000005203', stages: [
    { sequence: 1, workcentreName: 'Paper Machine 1', setupDuration: 1200 },
    { sequence: 2, workcentreName: 'Winder 1', setupDuration: 600 },
    { sequence: 3, workcentreName: 'Reel Wrapper 1', setupDuration: 900 },
  ] },
];

export const WORKCENTRES: Workcentre[] = [
  { id: 'wc1', code: 'WC-PM1', name: 'Paper Machine 1', siteName: 'Site A — Northfield Mill', type: 'paper_machine', rateKg: 3200, campaigned: true, frozenHorizon: 3600, updatedAt: '2026-08-25 09:12', rowVersion: '0x0000000000004F2A' },
  { id: 'wc2', code: 'WC-WIND1', name: 'Winder 1', siteName: 'Site A — Northfield Mill', type: 'winder', rateKg: 2400, campaigned: false, frozenHorizon: 0, updatedAt: '2026-08-22 11:05', rowVersion: '0x0000000000004F33' },
  { id: 'wc3', code: 'WC-WRAP1', name: 'Reel Wrapper 1', siteName: 'Site A — Northfield Mill', type: 'reel_wrapper', rateKg: 2600, campaigned: false, frozenHorizon: 1800, updatedAt: '2026-08-20 08:50', rowVersion: '0x0000000000004F35' },
  { id: 'wc4', code: 'WC-PM2', name: 'Paper Machine 2', siteName: 'Site B — Riverside Mill', type: 'paper_machine', rateKg: 3400, campaigned: true, frozenHorizon: 3600, updatedAt: '2026-08-26 07:30', rowVersion: '0x0000000000004F38' },
  { id: 'wc5', code: 'WC-WIND2', name: 'Winder 2', siteName: 'Site B — Riverside Mill', type: 'winder', rateKg: 2200, campaigned: false, frozenHorizon: 0, updatedAt: '2026-08-18 16:15', rowVersion: '0x0000000000004F3C' },
  { id: 'wc6', code: 'WC-WRAP2', name: 'Reel Wrapper 2', siteName: 'Site B — Riverside Mill', type: 'reel_wrapper', rateKg: 2000, campaigned: false, frozenHorizon: 1800, updatedAt: '2026-08-19 13:22', rowVersion: '0x0000000000004F3A' },
  { id: 'wc7', code: 'WC-PM3', name: 'Paper Machine 3', siteName: 'Site C — Lakeside Mill', type: 'paper_machine', rateKg: 3000, campaigned: true, frozenHorizon: 3600, updatedAt: '2026-08-27 08:15', rowVersion: '0x0000000000004F40' },
  { id: 'wc8', code: 'WC-WIND3', name: 'Winder 3', siteName: 'Site C — Lakeside Mill', type: 'winder', rateKg: 2300, campaigned: false, frozenHorizon: 0, updatedAt: '2026-08-27 09:30', rowVersion: '0x0000000000004F42' },
  { id: 'wc9', code: 'WC-WRAP3', name: 'Reel Wrapper 3', siteName: 'Site C — Lakeside Mill', type: 'reel_wrapper', rateKg: 1900, campaigned: false, frozenHorizon: 1800, updatedAt: '2026-08-27 09:00', rowVersion: '0x0000000000004F41' },
];

export const PRODUCTS: Product[] = [
  { id: 'p1', code: 'PRD-100', name: 'Kraft Liner 120gsm', type: 'finished_good', grade: 'Kraft', basisWeightGsm: 120, caliperMicrons: 180, routeId: 'rt2', updatedAt: '2026-08-21 09:00', rowVersion: '0x0000000000005301' },
  { id: 'p2', code: 'PRD-140', name: 'Test Liner 140gsm', type: 'finished_good', grade: 'Test', basisWeightGsm: 140, caliperMicrons: 210, routeId: 'rt1', updatedAt: '2026-08-20 09:00', rowVersion: '0x0000000000005302' },
  { id: 'p3', code: 'PRD-200', name: 'Fluting 200gsm', type: 'finished_good', grade: 'Fluting', basisWeightGsm: 200, caliperMicrons: 260, routeId: 'rt3', updatedAt: '2026-08-19 09:00', rowVersion: '0x0000000000005303' },
  { id: 'p4', code: 'PRD-080', name: 'Recycled Kraft 80gsm', type: 'finished_good', grade: 'Kraft', basisWeightGsm: 80, caliperMicrons: 120, routeId: 'rt2', updatedAt: '2026-08-18 09:00', rowVersion: '0x0000000000005304' },
  { id: 'p5', code: 'RAW-010', name: 'Recovered Fibre Pulp', type: 'raw_material', grade: 'Pulp', basisWeightGsm: null, caliperMicrons: null, routeId: null, updatedAt: '2026-08-17 09:00', rowVersion: '0x0000000000005305' },
  { id: 'p6', code: 'INT-020', name: 'Base Sheet — Uncoated', type: 'intermediate', grade: 'Base', basisWeightGsm: 110, caliperMicrons: 160, routeId: 'rt1', updatedAt: '2026-08-16 09:00', rowVersion: '0x0000000000005306' },
];

export const CUSTOMERS: Customer[] = [
  { id: 'c1', code: 'CUST-014', name: 'Arlington Box Co.', updatedAt: '2026-08-20 09:00', rowVersion: '0x0000000000005401' },
  { id: 'c2', code: 'CUST-022', name: 'Beacon Packaging Ltd.', updatedAt: '2026-08-19 09:00', rowVersion: '0x0000000000005402' },
  { id: 'c3', code: 'CUST-031', name: 'Cedar Point Corrugators', updatedAt: '2026-08-18 09:00', rowVersion: '0x0000000000005403' },
  { id: 'c4', code: 'CUST-045', name: 'Dunmore Container Corp.', updatedAt: '2026-08-17 09:00', rowVersion: '0x0000000000005404' },
  { id: 'c5', code: 'CUST-052', name: 'Elmhurst Packaging Group', updatedAt: '2026-08-16 09:00', rowVersion: '0x0000000000005405' },
  { id: 'c6', code: 'CUST-061', name: 'Fairview Carton Supply', updatedAt: '2026-08-15 09:00', rowVersion: '0x0000000000005406' },
  { id: 'c7', code: 'CUST-078', name: 'Granite Ridge Boxboard', updatedAt: '2026-08-14 09:00', rowVersion: '0x0000000000005407' },
  { id: 'c8', code: 'CUST-089', name: 'Harborview Packaging Inc.', updatedAt: '2026-08-13 09:00', rowVersion: '0x0000000000005408' },
];

export const SALES_ORDERS: SalesOrder[] = [
  { id: 'so1', orderNumber: 'SO-2026-0141', customerId: 'c1', orderDate: '2026-08-03', status: 'Committed', lineCount: 1 },
  { id: 'so2', orderNumber: 'SO-2026-0142', customerId: 'c2', orderDate: '2026-08-04', status: 'Committed', lineCount: 2 },
  { id: 'so3', orderNumber: 'SO-2026-0143', customerId: 'c3', orderDate: '2026-08-05', status: 'Draft', lineCount: 3 },
  { id: 'so4', orderNumber: 'SO-2026-0144', customerId: 'c1', orderDate: '2026-08-06', status: 'Committed', lineCount: 4 },
  { id: 'so5', orderNumber: 'SO-2026-0145', customerId: 'c2', orderDate: '2026-08-07', status: 'Committed', lineCount: 1 },
  { id: 'so6', orderNumber: 'SO-2026-0146', customerId: 'c3', orderDate: '2026-08-08', status: 'Draft', lineCount: 2 },
  { id: 'so7', orderNumber: 'SO-2026-0147', customerId: 'c1', orderDate: '2026-08-09', status: 'Committed', lineCount: 3 },
  { id: 'so8', orderNumber: 'SO-2026-0148', customerId: 'c2', orderDate: '2026-08-10', status: 'Committed', lineCount: 4 },
  { id: 'so9', orderNumber: 'SO-2026-0149', customerId: 'c3', orderDate: '2026-08-11', status: 'Draft', lineCount: 1 },
  { id: 'so10', orderNumber: 'SO-2026-0150', customerId: 'c1', orderDate: '2026-08-12', status: 'Committed', lineCount: 2 },
  { id: 'so11', orderNumber: 'SO-2026-0151', customerId: 'c2', orderDate: '2026-08-13', status: 'Committed', lineCount: 3 },
  { id: 'so12', orderNumber: 'SO-2026-0152', customerId: 'c3', orderDate: '2026-08-14', status: 'Draft', lineCount: 4 },
  { id: 'so13', orderNumber: 'SO-2026-0153', customerId: 'c1', orderDate: '2026-08-15', status: 'Committed', lineCount: 1 },
  { id: 'so14', orderNumber: 'SO-2026-0154', customerId: 'c2', orderDate: '2026-08-16', status: 'Committed', lineCount: 2 },
  { id: 'so15', orderNumber: 'SO-2026-0155', customerId: 'c3', orderDate: '2026-08-17', status: 'Draft', lineCount: 3 },
  { id: 'so16', orderNumber: 'SO-2026-0156', customerId: 'c1', orderDate: '2026-08-18', status: 'Committed', lineCount: 4 },
  { id: 'so17', orderNumber: 'SO-2026-0157', customerId: 'c2', orderDate: '2026-08-19', status: 'Committed', lineCount: 1 },
  { id: 'so18', orderNumber: 'SO-2026-0158', customerId: 'c3', orderDate: '2026-08-20', status: 'Draft', lineCount: 2 },
  { id: 'so19', orderNumber: 'SO-2026-0159', customerId: 'c1', orderDate: '2026-08-21', status: 'Committed', lineCount: 3 },
  { id: 'so20', orderNumber: 'SO-2026-0160', customerId: 'c2', orderDate: '2026-08-22', status: 'Committed', lineCount: 4 },
  { id: 'so21', orderNumber: 'SO-2026-0161', customerId: 'c3', orderDate: '2026-08-23', status: 'Draft', lineCount: 1 },
  { id: 'so22', orderNumber: 'SO-2026-0162', customerId: 'c1', orderDate: '2026-08-24', status: 'Committed', lineCount: 2 },
  { id: 'so23', orderNumber: 'SO-2026-0163', customerId: 'c2', orderDate: '2026-08-25', status: 'Committed', lineCount: 3 },
  { id: 'so24', orderNumber: 'SO-2026-0164', customerId: 'c3', orderDate: '2026-08-26', status: 'Draft', lineCount: 4 },
];

export const TASKS: Task[] = [
  { id: 't1', orderNumber: 'SO-2026-0141', lineNumber: 1, workcentreId: 'wc1', plannedStart: 1788469200000, plannedEnd: 1788728400000, runStart: 1788469200000, runEnd: 1788771600000, dueDate: 1788483600000, qtyKg: 3400, rowVersion: 1, blockCode: 'B01488', runCode: 'R05195', runStatus: 'Deckled', spec: 'KRA.3400 TL1 180' },
  { id: 't2', orderNumber: null, lineNumber: null, workcentreId: 'wc1', plannedStart: 1788771600000, plannedEnd: 1788771600000, runStart: 1788771600000, runEnd: 1789074000000, dueDate: 1788771600000, qtyKg: 0, rowVersion: 1, blockCode: 'B01488', runCode: 'R05196', runStatus: 'Open', spec: 'KRA.3400 TL1 180', hasTask: false },
  { id: 't14', orderNumber: 'SO-2026-0170', lineNumber: 1, workcentreId: 'wc1', plannedStart: 1789160400000, plannedEnd: 1789419600000, runStart: 1789160400000, runEnd: 1789462800000, dueDate: 1789376400000, qtyKg: 3600, rowVersion: 1, blockCode: 'B01489', runCode: 'R05240', runStatus: 'Open', spec: 'KRA.3400 TL1 180' },
  { id: 't15', orderNumber: null, lineNumber: null, workcentreId: 'wc1', plannedStart: 1789462800000, plannedEnd: 1789462800000, runStart: 1789462800000, runEnd: 1789765200000, dueDate: 1789462800000, qtyKg: 0, rowVersion: 1, blockCode: 'B01489', runCode: 'R05241', runStatus: 'Open', spec: 'KRA.3400 TL1 180', hasTask: false },
  { id: 't5', orderNumber: 'SO-2026-0143', lineNumber: 1, workcentreId: 'wc2', plannedStart: 1788469200000, plannedEnd: 1788483600000, runStart: 1788469200000, runEnd: 1789074000000, dueDate: 1788512400000, qtyKg: 2000, rowVersion: 1, blockCode: 'B01522', runCode: 'R05201', runStatus: 'Open', spec: 'FLT.2000 SHT 260' },
  { id: 't3', orderNumber: 'SO-2026-0142', lineNumber: 1, workcentreId: 'wc3', plannedStart: 1788469200000, plannedEnd: 1788490800000, runStart: 1788469200000, runEnd: 1789074000000, dueDate: 1788642000000, qtyKg: 1500, rowVersion: 1, blockCode: 'B01511', runCode: 'R05197', runStatus: 'Started', spec: 'TST.1400 FL1 105' },
  { id: 't12', orderNumber: 'SO-2026-0155', lineNumber: 1, workcentreId: 'wc4', plannedStart: 1788469200000, plannedEnd: 1788490800000, runStart: 1788469200000, runEnd: 1789074000000, dueDate: 1788541200000, qtyKg: 3500, rowVersion: 1, blockCode: 'B01540', runCode: 'R05230', runStatus: 'Open', spec: 'KRA.3200 TL1 180' },
  { id: 't13', orderNumber: 'SO-2026-0156', lineNumber: 1, workcentreId: 'wc7', plannedStart: 1788469200000, plannedEnd: 1788487200000, runStart: 1788469200000, runEnd: 1789074000000, dueDate: 1788480000000, qtyKg: 2900, rowVersion: 1, blockCode: 'B01541', runCode: 'R05231', runStatus: 'Open', spec: 'TST.1400 FL1 105' },
];

export const DOWNTIME: Downtime[] = [
  { id: 'd1', scope: 'site', siteId: 'site1', isPlanned: true, description: 'Weekly wash-up', reason: 'planned_maintenance', start: 1788642000000, end: 1788663600000 },
  { id: 'd2', scope: 'site', siteId: 'site2', isPlanned: false, description: 'Power outage', reason: 'breakdown', start: 1788901200000, end: 1788944400000 },
  { id: 'd3', scope: 'workcentre', workcentreId: 'wc3', isPlanned: true, description: 'Blanket change', reason: 'planned_maintenance', start: 1788613200000, end: 1788627600000 },
  { id: 'd4', scope: 'workcentre', workcentreId: 'wc7', isPlanned: false, description: 'Motor fault', reason: 'breakdown', start: 1788764400000, end: 1788778800000 },
];

