import { useURLPoll } from '@console/internal/components/utils/url-poll-hook';
import { getVMISubresourcePath } from '../selectors/vmi/selectors';
import { VMIKind } from '../types';
import { V1VirtualMachineInstanceGuestAgentInfo } from '../types/vmi-guest-data-info/vmi-guest-agent-info';
import { isGuestAgentInstalled } from '../utils/guest-agent-utils';

export const GUEST_AGENT_POLL_DEFAULT_DELAY = 3000; // 3 seconds

const getGuestAgentURL = (vmi: VMIKind) =>
  vmi && isGuestAgentInstalled(vmi) && `/${getVMISubresourcePath(vmi)}/guestosinfo`;

const useGuestAgentInfo = ({ vmi, delay = GUEST_AGENT_POLL_DEFAULT_DELAY }: GuestAgentInfoProps) =>
  useURLPoll<V1VirtualMachineInstanceGuestAgentInfo>(getGuestAgentURL(vmi), delay);

type GuestAgentInfoProps = {
  vmi: VMIKind;
  delay?: number;
};

export { useGuestAgentInfo, GuestAgentInfoProps };
