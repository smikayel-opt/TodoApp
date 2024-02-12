import { ImagesService } from "./images.service";


/**
 * returns mock Image Service
 */
export function getMockImageService(): jasmine.SpyObj<ImagesService> {
  return jasmine.createSpyObj('ImagesService', ['getHeadersWithAuthorization', 'uploadImage']);
}
