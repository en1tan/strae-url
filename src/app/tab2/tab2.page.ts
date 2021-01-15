import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ModalComponent } from '../components/modal/modal.component';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  isLoading: boolean;
  showModal: boolean;
  urls: [] = [];
  siteUrl: string = environment.apiUrl;

  constructor(private mainService: MainService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.getAllSlugs();
  }

  getAllSlugs() {
    this.mainService.getAllSlugs().subscribe((res: any) => {
      this.urls = res.data;
    })
  }

  fetchUrl(slug: string) {
    this.mainService.fetchUrl(slug).subscribe((res: any) => {
      console.log(res);
    })
  }

  async activateModal() {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      cssClass: 'gen-slug-class'
    });

    return await modal.present();
  }

}
