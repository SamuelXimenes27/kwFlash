import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr'

@Injectable({ providedIn: 'root' })

export class ToastService {
  constructor(private toastr:ToastrService) {}

  ngOnInit(): void {

  }

  ShowSucess(title: any, message: any){
    this.toastr.success(message, title)
  }

  ShowError(title: any, message: any){
    this.toastr.error(message, title)
  }
}
