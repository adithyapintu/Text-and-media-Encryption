from Crypto.Cipher import DES3
from hashlib import md5

def encrypt_audio(key):
    with open(r"C:\Users\Pintu\Downloads\mark 0.5\flask backend\Uploads\enc_audio.wav", "rb") as file:
        file_bytes = file.read()
        key_hash = md5(key.encode('ascii')).digest()

        tdes_key = DES3.adjust_key_parity(key_hash)
        cipher = DES3.new(tdes_key, DES3.MODE_EAX, nonce=b'0')
        new_file_bytes = cipher.encrypt(file_bytes)


    with open(r"C:\Users\Pintu\Downloads\mark 0.5\flask backend\Uploads\encrypted.wav", "wb") as encrypted:
        encrypted.write(new_file_bytes)


def decrypt_audio(key):
    with open(r"C:\Users\Pintu\Downloads\mark 0.5\flask backend\Uploads\dec_audio.wav", "rb") as file:
        file_bytes = file.read()
        key_hash = md5(key.encode('ascii')).digest()
        tdes_key = DES3.adjust_key_parity(key_hash)
        cipher = DES3.new(tdes_key, DES3.MODE_EAX, nonce=b'0')
        new_file_bytes = cipher.decrypt(file_bytes)

    with open(r"C:\Users\Pintu\Downloads\mark 0.5\flask backend\Uploads\decrypted.wav", "wb") as decrypted:
        decrypted.write(new_file_bytes)

