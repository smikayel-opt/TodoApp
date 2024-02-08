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

    # Resize the image if both target width and height are provided
    if target_width and target_height:
        image.thumbnail((target_width, target_height))
    elif target_width:
        width_percent = target_width / float(image.size[0])
        target_height = int(float(image.size[1]) * width_percent)
        image = image.resize((target_width, target_height))
    elif target_height:
        height_percent = target_height / float(image.size[1])
        target_width = int(float(image.size[0]) * height_percent)
        image = image.resize((target_width, target_height))

    # Convert image to bytes
    resized_image_bytes = io.BytesIO()
    image.save(resized_image_bytes, format=output_format.upper())
    resized_image_bytes.seek(0)

    return resized_image_bytes
