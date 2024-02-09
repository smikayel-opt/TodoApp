import { Component } from '@angular/core';
import { ImagesService } from '@app/services/images.service';

@Component({
  selector: 'app-upload-image',
  standalone: true,
  imports: [],
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.css'
})
export class UploadImageComponent {
  selectedFile: string | Blob = '';
  error: string = ''
  constructor(private imageService: ImagesService) { }

  /**
   * will handle selection of the file
   * @param event the event from select input (for selecting the file)
   */
  onSelectFile(event: Event) {
    const target = (event.target as HTMLInputElement)

    if (target.files && target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(target.files[0]);
      this.selectedFile = target.files[0];
    }
  }

  /**
   * upload image with api endpoint
   * @returns 
   */
  uploadImage() {
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    if (!this.selectedFile) {
      this.error = 'File is not provided!'
      return
    }
    this.imageService.uploadImage(formData).subscribe((res) => {
      if (res.error) {
        this.error = res.error
      } 
    })
  }
}
