import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService, SidebarService, UsuarioService, LoginGuardGuard, SubirArchivoService } from './service.index';
import { SettingsService } from './settings/settings.service';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    LoginGuardGuard,
    SubirArchivoService,
    ModalUploadService
    ]
})
export class ServiceModule { }
