from flask import Flask, jsonify, request, render_template, send_from_directory, send_file
from flask_cors import CORS, cross_origin
import os
import keyMap
import audio
import image


app = Flask(__name__)
CORS(app, resources = {r"/api/*" : {"origins" : "*"}})
app.config['CORS_HEADERS'] = "multipart/form-data"
app.config["IMAGE_UPLOAD"] = "C:/Users/Pintu/Downloads/mark 0.5/flask backend/Uploads"

@app.route('/api/image/encrypt', methods = ['POST'])
@cross_origin()
def encryption():
	img = request.files['file']
	key = request.files['key']
	key = key.read().decode('utf-8')
	img.save(os.path.join(app.config["IMAGE_UPLOAD"], "toencrpt.jpg"))
	newImage = r"C:\Users\Pintu\Downloads\mark 0.5\flask backend\Uploads\toencrpt.jpg"
	image.encrypt_image(newImage, key)
	return send_file(r"C:\Users\Pintu\Downloads\mark 0.5\flask backend\Uploads\encrypted.jpg",as_attachment=True)
	return "hello"

@app.route('/api/image/decrypt', methods = ['POST'])
@cross_origin(origin = "*")
def decryption():
	img = request.files['file']
	key = request.files['key']
	key = key.read().decode('utf-8')
	img.save(os.path.join(app.config["IMAGE_UPLOAD"], "todecrypt.jpg"))
	newImage = r"C:\Users\Pintu\Downloads\mark 0.5\flask backend\Uploads\todecrypt.jpg"
	image.decrypt_image(newImage, key)
	return send_file(r"C:\Users\Pintu\Downloads\mark 0.5\flask backend\Uploads\decrypted.jpg", as_attachment=True)


@app.route('/api/audio/encrypt', methods = ['POST'])
@cross_origin(origin = "*")
def enc_aud():
	aud = request.files['file']
	key = request.files['key']
	key = key.read().decode('utf-8')
	aud.save(os.path.join(app.config["IMAGE_UPLOAD"], "enc_audio.wav"))
	audio.encrypt_audio(key)
	return send_file(r"C:\Users\Pintu\Downloads\mark 0.5\flask backend\Uploads\encrypted.wav", as_attachment=True)


@app.route('/api/audio/decrypt', methods = ['POST'])
@cross_origin(origin = "*")
def dec_aud():
	aud = request.files['file']
	key = request.files['key']
	key = key.read().decode('utf-8')
	aud.save(os.path.join(app.config["IMAGE_UPLOAD"], "dec_audio.wav"))
	audio.decrypt_audio(key)
	return send_file(r"C:\Users\Pintu\Downloads\mark 0.5\flask backend\Uploads\decrypted.wav", as_attachment=True)


@app.route('/api/bot/encrypt', methods = ['POST'])
@cross_origin(origin = "*")
def botenc():
	message = request.get_json()['message']
	message = keyMap.keyMapEncrypt(message)
	return jsonify({"encrypted" : message})


@app.route('/api/bot/decrypt', methods = ['POST'])
@cross_origin(origin = "*")
def botdec():
	message = request.get_json()['message']
	message = keyMap.decode_message(message)
	return jsonify({"decrypted" : message})

if __name__ == '__main__':
	app.run(debug = True)