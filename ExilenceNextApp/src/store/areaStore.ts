import { action, observable } from 'mobx';
import { electronService } from '../services/electron.service';
import { RootStore } from './rootStore.js';
import { fromStream } from 'mobx-utils';
import { from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PoELogMonitorArea } from '../interfaces/poe-log-monitor/poe-log-monitor-area.interface';
import { PoELogMonitorInstanceServer } from '../interfaces/poe-log-monitor/poe-log-monitor-instance-server.interface';

export class AreaStore {
  @observable areas: PoELogMonitorArea[] = [];
  @observable instanceServer: PoELogMonitorInstanceServer | null = null;

  constructor(private rootStore: RootStore) {
    fromStream(
      this.rootStore.logStore.areaEvent.pipe(
        map((area: PoELogMonitorArea) => {
          this.areas.push(area);
        })
      )
    );
    fromStream(
      this.rootStore.logStore.instanceServerEvent.pipe(
        map((instanceServer: PoELogMonitorInstanceServer) => {
          this.instanceServer = instanceServer;
        })
      )
    );
  }
}
