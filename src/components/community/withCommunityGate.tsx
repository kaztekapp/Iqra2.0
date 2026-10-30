import type { ComponentType } from 'react';
import { COMMUNITY_ENABLED } from '../../config/features';
import { CommunityComingSoon } from './CommunityComingSoon';

/**
 * Community screens stay registered while the feature is unreleased, so a link
 * (an old invite, a group-message push, a shared card) can still reach them.
 * Behind this gate they show the coming-soon page until COMMUNITY_ENABLED is on.
 */
export function withCommunityGate<P extends object>(Screen: ComponentType<P>): ComponentType<P> {
  if (COMMUNITY_ENABLED) return Screen;
  return function CommunityGated() {
    return <CommunityComingSoon />;
  };
}
