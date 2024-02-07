import io


def change_image_resolution(image):
    """
    will calculate and if the image size is more thane 2mb it should change resolution and return byte array which is
    less or equal to the 2MB
    @param image: bytearray data of the image
    @return: img_byte_array: byte array of the <= 2MB image
    """
    file_size = len(image.fp.read())
    initial_quality = 85
    target_file_size_mb = 2
    # Calculate the quality level to achieve the target size
    target_size_bytes = target_file_size_mb * 1024
    compression_ratio = target_size_bytes / file_size
    target_quality = int(initial_quality * compression_ratio)

    img_byte_array = io.BytesIO()
    image.save(img_byte_array, format='JPEG', optimize=True, quality=target_quality)
    return img_byte_array
