import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  providers: [DataService]
})


//https://stackoverflow.com/questions/47936183/angular-file-upload
export class MyPageComponent implements OnInit {
  fileToUpload: File = null;
  @ViewChild("fileInput") fileInput;
  @ViewChild("OtherfileInput") otherFileInput;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService
  ) {
    this.form = this.fb.group({
      alias: ['', Validators.compose([
        Validators.required
      ])],
      image: ['', Validators.compose([
        Validators.required
      ])]
    });

  }

  ngOnInit() {
  }

  //Se fosse apenas o upload
  //Upload
  addFile(): void {
    let fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];
      this.dataService
        .upload(fileToUpload)
        .subscribe(res => {
          console.log(res);
        });
    }
  }

  //Download
  download() {
    this.dataService
      .downloadFile();
  }

  submit() {
    let fi = this.otherFileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];

      console.log(this.form.value);
      this.dataService
        .CreateMyPage(this.form.value, fileToUpload)
        .subscribe(res => {
          console.log(res);
        })
    }
  }

}
