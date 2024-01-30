'use client';

import React from 'react';
import { ServiceRegistry } from './serviceRegistry';

export const ServiceRegistryContext = React.createContext(new ServiceRegistry());
