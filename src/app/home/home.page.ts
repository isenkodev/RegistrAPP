import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoginServiceService } from '../service/login.service.service';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner';
import { FullCalendarComponent } from '@fullcalendar/angular'; 
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {

  username: string = 'guest';
  result: string = '';
  
  asistenciasList: string[] = this.cargarAsistencias(); 

  @ViewChild(FullCalendarComponent) fullCalendar!: FullCalendarComponent;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private loginService: LoginServiceService
  ) {}

  cargarAsistencias(): string[] {
    const asistenciasGuardadas = localStorage.getItem('asistencias');
    return asistenciasGuardadas ? JSON.parse(asistenciasGuardadas) : [];
  }

  guardarAsistencias() {
    localStorage.setItem('asistencias', JSON.stringify(this.asistenciasList));
  }

  async scan(): Promise<void> {
    const result = await CapacitorBarcodeScanner.scanBarcode({
      hint: CapacitorBarcodeScannerTypeHint.ALL
    });
    this.result = result.ScanResult;

    if (this.result) {
      const asistenciaMensaje = this.createAsistenciaMensaje(this.result);

      this.agregarAsistencia(asistenciaMensaje);

      this.showSuccessMessage();
    }
  }

  async showSuccessMessage() {
    const alert = await this.alertController.create({
      header: '¡Éxito!',
      message: '¡Asistencia registrada con éxito!',
      buttons: ['OK'],
    });
    await alert.present();
  }

  agregarAsistencia(asistencia: string) {
    this.asistenciasList.push(asistencia);
    this.guardarAsistencias(); 
  }

  createAsistenciaMensaje(codigo: string): string {
    const fecha = new Date().toLocaleDateString();
    let materia = '';
    let sala = '';

    if (codigo.includes('Arquitectura')) {
      materia = 'Arquitectura';
      sala = 'L1';
    } else if (codigo.includes('Aplicaciones moviles')) {
      materia = 'Aplicaciones moviles';
      sala = 'L7';
    } else if (codigo.includes('Ingles')) {
      materia = 'Inglés';
      sala = '603';
    } else if (codigo.includes('Calidad de software')) {
      materia = 'Calidad de software';
      sala = 'L8';
    } else if (codigo.includes('Estadistica descriptiva')) {
      materia = 'Estadística descriptiva';
      sala = 'L3';
    } else {
      return 'Código QR no reconocido';
    }

    return `Asistencia registrada en ${materia} | 008V | ${sala} | ${fecha}`;
  }


  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    weekends: false,  
    events: [
      { title: 'Event 1', date: '2024-11-01', id: '1' },
      { title: 'Event 2', date: '2024-11-02', id: '2' },
    ],
    dateClick: (arg) => this.handleDateClick(arg),
    eventClick: (info) => this.handleEventClick(info),
  };

  handleDateClick(arg: any) {
    const eventTitle = prompt('Introduce el título del evento:', '');
    if (eventTitle) {
      const calendarApi = this.fullCalendar.getApi();
      calendarApi.addEvent({
        title: eventTitle,
        date: arg.dateStr,  
        id: new Date().getTime().toString(),  
      });
      alert('Evento agregado para: ' + arg.dateStr);
    }
  }

  handleEventClick(info: any) {
    const eventId = info.event.id; 
    const eventTitle = info.event.title; 

    if (confirm(`¿Estás seguro de que quieres eliminar el evento: "${eventTitle}"?`)) {
      const calendarApi = this.fullCalendar.getApi();
      calendarApi.getEventById(eventId)?.remove(); 
      alert(`Evento "${eventTitle}" eliminado`);
    }
  }

  toggleWeekends() {
    const calendarApi = this.fullCalendar.getApi();
    this.calendarOptions.weekends = !this.calendarOptions.weekends;
    calendarApi.render();
  }

  ngAfterViewInit() {
  
    console.log(this.fullCalendar.getApi()); 
  }
  onLogout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
