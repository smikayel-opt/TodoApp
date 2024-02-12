import io
from PIL import Image


def change_image_resolution(image_byte_array):
    """
    will calculate and if the image size is more thane 2mb it should change resolution and return byte array which is
    less or equal to the 2MB
    @param image_byte_array: bytearray data of the image
    @return: img_byte_array: byte array of the <= 2MB image
    """
    image = Image.open(image_byte_array)
    file_size = len(image.fp.read())

    initial_quality = 85
    target_file_size_mb = 2
    # Calculate the quality level to achieve the target size
    target_size_bytes = target_file_size_mb * 1024
    if target_size_bytes >= file_size / 1024:
        return image_byte_array

    compression_ratio = target_size_bytes / file_size
    target_quality = int(initial_quality * compression_ratio)
    optimized_img_byte_array = io.BytesIO()
    image.save(optimized_img_byte_array, format='JPEG', optimize=True, quality=target_quality)
    image.close()  # close the opened image to optimize memory usage
    return change_image_resolution(optimized_img_byte_array)


def resize_image(image_data, target_width=None, target_height=None, output_format='JPEG'):
    """
    Resize the provided image data to the specified dimensions while preserving aspect ratio.

    Args:
        image_data (dict): Dictionary containing the image data.
        target_width (int, optional): The desired width for the resized image.
        target_height (int, optional): The desired height for the resized image.
        output_format (str, optional): The format for the resized image (e.g., 'JPEG', 'PNG').

    Returns:
        io.BytesIO: Byte array containing the resized image data.
    """

    target_width = int(target_width) if target_width else None
    target_height = int(target_height) if target_height else None
    # Open the image from the image data
    image = Image.open(io.BytesIO(image_data['image']))

    # Calculate aspect ratio
    width_ratio = target_width / float(image.size[0]) if target_width else 1
    height_ratio = target_height / float(image.size[1]) if target_height else 1
    aspect_ratio = min(width_ratio, height_ratio)

    # Calculate new size based on aspect ratio
    new_width = int(image.size[0] * aspect_ratio)
    new_height = int(image.size[1] * aspect_ratio)

    # Resize the image
    image = image.resize((new_width, new_height))

    # Convert image to bytes
    resized_image_bytes = io.BytesIO()
    image.save(resized_image_bytes, format=output_format.upper())

    return resized_image_bytes
