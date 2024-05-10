import Medusa from '@medusajs/medusa-js';
import CMSClient from './cms-client';
import PlutoClient from './pluto-client';

const MEDUSA_BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000';
const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:1337';
const PLUTO_BACKEND_URL =
  process.env.NEXT_PUBLIC_PLUTO_BACKEND_URL || 'http://localhost:8686';

export const medusaClient = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  maxRetries: 3,
});

export const cmsClient = new CMSClient({
  config: {
    baseURL: CMS_URL,
    accessToken: process.env.NEXT_PUBLIC_CMS_ACCESS_TOKEN,
  },
});

export const plutoClient = new PlutoClient({
  config: {
    baseURL: PLUTO_BACKEND_URL,
  },
});
