import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoginServiceService } from '../service/login.service.service';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular'; // Importamos el componente FullCalendar
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

  // Referencia al componente FullCalendar
  @ViewChild(FullCalendarComponent) fullCalendar!: FullCalendarComponent;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private loginService: LoginServiceService
  ) {
    const state = this.router.getCurrentNavigation()?.extras?.state;
    if (state && state['email']) {
      console.log(`User: ${state['email']}`);
      this.username = state['email'];
    }
  }

  // Método para cerrar sesión
  onLogout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  // Método para mostrar alerta de éxito
  async showSuccessMessage() {
    const alert = await this.alertController.create({
      header: '¡Éxito!',
      message: '¡Asistencia registrada con éxito!',
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Método para escanear el código QR
  async scan(): Promise<void> {
    const result = await CapacitorBarcodeScanner.scanBarcode({
      hint: CapacitorBarcodeScannerTypeHint.ALL
    });
    this.result = result.ScanResult;
    
    if (this.result) {
      this.showSuccessMessage();
    }
  }

  // Inicialización del calendario
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    weekends: false,  // Fines de semana inicialmente desactivados
    events: [
      { title: 'Event 1', date: '2024-11-01', id: '1' }, // Asignamos un ID único para el evento
      { title: 'Event 2', date: '2024-11-02', id: '2' },
    ],
    dateClick: (arg) => this.handleDateClick(arg),  // Llamar a la función cuando se hace clic en una fecha
    eventClick: (info) => this.handleEventClick(info), // Capturamos el clic en un evento para eliminarlo
  };

  // Método que se ejecuta cuando el usuario hace clic en una fecha
  handleDateClick(arg: any) {
    const eventTitle = prompt('Introduce el título del evento:', '');
    if (eventTitle) {
      // Accedemos a la API de FullCalendar y usamos addEvent
      const calendarApi = this.fullCalendar.getApi();
      calendarApi.addEvent({
        title: eventTitle,
        date: arg.dateStr,  // Fecha seleccionada por el usuario
        id: new Date().getTime().toString(),  // Asignamos un ID único al evento (usando el timestamp)
      });
      alert('Evento agregado para: ' + arg.dateStr);
    }
  }

  // Método para manejar el clic en un evento (para eliminarlo)
  handleEventClick(info: any) {
    const eventId = info.event.id; // Obtenemos el ID del evento
    const eventTitle = info.event.title; // Obtenemos el título del evento

    // Pedir confirmación al usuario para eliminar el evento
    if (confirm(`¿Estás seguro de que quieres eliminar el evento: "${eventTitle}"?`)) {
      const calendarApi = this.fullCalendar.getApi();
      calendarApi.getEventById(eventId)?.remove();  // Eliminar el evento usando su ID
      alert(`Evento "${eventTitle}" eliminado`);
    }
  }

  // Método para alternar la visibilidad de los fines de semana
  toggleWeekends() {
    const calendarApi = this.fullCalendar.getApi();
    this.calendarOptions.weekends = !this.calendarOptions.weekends;
    // Forzamos el re-renderizado del calendario
    calendarApi.render();
  }

  // ngAfterViewInit se llama después de que el componente ha sido inicializado
  ngAfterViewInit() {
    // Ahora podemos acceder a la API de FullCalendar
    console.log(this.fullCalendar.getApi());  // Verificamos que la API esté accesible
  }
}
