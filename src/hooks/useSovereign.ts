import { useContext } from 'react';
import { SovereignContext } from '../context/SovereignContext';

export function useSovereign() {
  const context = useContext(SovereignContext);
  if (context === undefined) {
    throw new Error('useSovereign must be used within a SovereignProvider');
  }
  return context;
}
