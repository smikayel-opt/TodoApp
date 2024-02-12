import { getMockImageService } from '@app/services/images.mock.service';
import { UploadImageComponent } from './upload-image.component';
import { ImagesService } from '@app/services/images.service';
import { of } from 'rxjs';
import { IIUploadResp } from '@app/services/types/images';

describe('UploadImageComponent', () => {
  let component: UploadImageComponent;
  let mockImageService: jasmine.SpyObj<ImagesService>;

  beforeEach(() => {
    mockImageService = getMockImageService();
    component = new UploadImageComponent(mockImageService);
  });

  describe('upload image', () => {
      it('should set error if file is not provided', () => {
      component.selectedFile = '';
      component.uploadImage();
  
      expect(component.error).toBe('File is not provided!');
      expect(mockImageService.uploadImage).not.toHaveBeenCalled();
    });

    it('should set error message if upload response contains an error', () => {
      component.selectedFile = 'mocked base 64 image'
      const errorMessage = 'Upload failed!';
      const errorResponse = { error: errorMessage } as IIUploadResp
      mockImageService.uploadImage.and.returnValue(of(errorResponse));

      component.uploadImage();

      expect(component.error).toBe(errorMessage);
    });
    
  })

  describe('onSelectFile', () => {
    it('should update selectedFile when a file is selected', () => {
      const event = {
        target: {
          files: [
            new File(['test'], 'test.png', { type: 'image/png' })
          ]
        }
      } as unknown as Event;

      component.onSelectFile(event);

      expect(component.selectedFile instanceof File).toBe(true);
    });

    it('should not update selectedFile if no file is selected', () => {
      const event = {
        target: {
          files: null
        }
      } as unknown as Event;

      component.onSelectFile(event);

      expect(component.selectedFile).toBe('');
    });
  });
});
