import { action, observable } from 'mobx';
import { electronService } from '../services/electron.service';
import { RootStore } from './rootStore.js';
import { Subject } from 'rxjs';
import { PoELogMonitorArea } from '../interfaces/poe-log-monitor/poe-log-monitor-area.interface';
import { PoELogMonitorInstanceServer } from '../interfaces/poe-log-monitor/poe-log-monitor-instance-server.interface';

export class LogStore {
  @observable areaEvent: Subject<PoELogMonitorArea> = new Subject<
    PoELogMonitorArea
  >();
  @observable instanceServerEvent: Subject<
    PoELogMonitorInstanceServer
  > = new Subject<PoELogMonitorInstanceServer>();

  @observable running: boolean = false;

  constructor(private rootStore: RootStore) {
    electronService.ipcRenderer.on('log-event', (event: any, args: any) => {
      switch (args.event) {
        case 'start':
          this.running = true;
          this.rootStore.notificationStore.createNotification(
            'log_monitor_started',
            'success'
          );
          break;
        case 'stop':
          this.running = false;
          this.rootStore.notificationStore.createNotification(
            'log_monitor_stopped',
            'success'
          );
          break;
        case 'area':
          this.areaEvent.next(args.data);
          break;
        case 'instanceServer':
          this.instanceServerEvent.next(args.data);
          break;
      }
    });
  }

  @action
  createLogMonitor() {
    electronService.ipcRenderer.send('log-create');
  }

  @action
  startLogMonitor() {
    electronService.ipcRenderer.send('log-start');
  }

  @action
  stopLogMonitor() {
    electronService.ipcRenderer.send('log-stop');
  }

  @action
  setLogMonitorPath(path: string) {
    electronService.ipcRenderer.send('log-path', { path });
  }
}
