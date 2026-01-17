import { useState, useCallback } from 'react';
import { getGitHubUsernameStatus } from '@/lib/validation';

type ValidationStatus = 'idle' | 'valid' | 'invalid';

/**
 * Hook for GitHub username validation with status tracking
 */
export function useUsernameValidation() {
  const [status, setStatus] = useState<ValidationStatus>('idle');

  const validate = useCallback((username: string) => {
    setStatus(getGitHubUsernameStatus(username));
  }, []);

  const reset = useCallback(() => {
    setStatus('idle');
  }, []);

  return { status, validate, reset };
}
