import { Component, Input, ViewChild, OnChanges } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-device-table',
  standalone: false,
  templateUrl: './device-table.component.html',
  styleUrls: ['./device-table.component.scss'],
})
export class DeviceTableComponent implements OnChanges {

  @Input() aiFilters: any[] = [];

  @ViewChild('dt') table!: Table;

  devices: any[] = [];   // table data

  ngOnInit() {
    this.loadDevices();   // 👈 load data on init
  }

  ngOnChanges() {
    if (this.aiFilters?.length && this.table) {
      this.applyAiFilters();
    }
  }

  loadDevices() {
    // 🔹 Mock data (replace with API later)
    this.devices = [
      {
        deviceName: 'Router-01',
        deviceType: 'Router',
        status: 'Active',
        location: 'Chennai',
        vendor: 'Cisco',
        lastSeen: '2024-09-10'
      },
      {
        deviceName: 'Switch-12',
        deviceType: 'Switch',
        status: 'Inactive',
        location: 'Bangalore',
        vendor: 'Juniper',
        lastSeen: '2024-09-05'
      },
      {
        deviceName: 'Router-22',
        deviceType: 'Router',
        status: 'Active',
        location: 'Hyderabad',
        vendor: 'Cisco',
        lastSeen: '2024-09-12'
      },
      {
        deviceName: 'Firewall-03',
        deviceType: 'Firewall',
        status: 'Active',
        location: 'Chennai',
        vendor: 'Palo Alto',
        lastSeen: '2024-09-11'
      },
      {
        deviceName: 'Switch-44',
        deviceType: 'Switch',
        status: 'Active',
        location: 'Chennai',
        vendor: 'Arista',
        lastSeen: '2024-09-09'
      }
    ];
  }

  applyAiFilters() {
    this.table.clear();

    this.aiFilters.forEach(filter => {
      this.table.filter(
        filter.value,
        filter.field,
        this.mapOperator(filter.operator)
      );
    });
  }

  mapOperator(op: string): string {
    switch (op) {
      case 'eq': return 'equals';
      case 'contains': return 'contains';
      case 'startsWith': return 'startsWith';
      case 'endsWith': return 'endsWith';
      case 'gt': return 'gt';
      case 'lt': return 'lt';
      default: return 'contains';
    }
  }
}
