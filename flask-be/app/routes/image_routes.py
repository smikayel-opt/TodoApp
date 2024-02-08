from flask import request, jsonify, send_file
import io, os
from werkzeug.utils import secure_filename
from python_magic_file import MagicFile
from .utils.constants import SUPPORTED_IMAGE_EXTENSIONS
from services.image_service import handle_image_save, get_image_by_oid
from middleware.login_required_middleware import login_required


def init_image_processing_routes(app):
    @app.route('/api/images/', methods=['POST'])
    @login_required
    def add_image(user):
        """
        handler for /images route, will save the image in backend,
        for optimization it will save image with low resolution
        @return: response object and the status of the response
        """
        file_storage = request.files['file']
        if not request.files or not file_storage:
            return jsonify({'error': 'No file received'}), 400

        try:
            file = file_storage.read()
            image_bytearray = io.BytesIO(file)

            magic_file = MagicFile(image_bytearray)
            filename, _ = os.path.splitext(secure_filename(file_storage.filename))
            file_extension = magic_file.get_extension()

            if file_extension not in SUPPORTED_IMAGE_EXTENSIONS:
                return jsonify({'error': 'Not supported file extensions'}), 400

            handle_image_save(image_bytearray, filename, file_extension, user)
            return jsonify(
                {'status': 'success', 'message': 'Image saved successfully'})
        except Exception as e:
            return jsonify({'error': 'Failed to process the image', 'details': str(e)})

    @app.route('/api/images/<oid>', methods=['get'])
    def handle_get_image_by_oid(oid):
        """
        handler for the /images/<:oid>
        will return the image
        @param oid: the oid from the mogodb of the current image
        @return: response with image or the error message
        """
        try:
            image_data = get_image_by_oid(oid)
            if image_data:
                return send_file(io.BytesIO(image_data['image']), mimetype='image/jpeg')
            else:
                return jsonify({'error': 'Image not found'}), 404
        except Exception as e:
            return str(e), 500
