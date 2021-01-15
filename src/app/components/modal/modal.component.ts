import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  createSlugForm: FormGroup;
  isLoading: boolean;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder, private mainService: MainService) { }

  ngOnInit() {
    this.createSlugForm = this.fb.group({
      url: ['', [Validators.required, Validators.pattern(/^(https:|http:|ftp:|www\.)\S*/)]]
    });
  }

  generateSlug(): void {
    this.isLoading = true;
    this.mainService.generateSlug(this.createSlugForm.value).subscribe((res: any) => {
      this.createSlugForm.reset();
      this.isLoading = false;
      console.log(res.data);
      this.dismiss();
    }, ((err: any) => {
      this.isLoading = false;
      console.log(err);
    }));
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    })
  }

}
