import { PoELogMonitorAreaInfo } from './poe-log-monitor-area-info.interface';

export interface PoELogMonitorArea {
  name: string;
  type: string;
  info: PoELogMonitorAreaInfo[];
  timestamp: string;
}
