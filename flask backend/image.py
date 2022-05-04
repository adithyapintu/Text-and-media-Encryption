from Crypto.Cipher import DES3
from hashlib import md5
    
def encrypt_image(file_path, key):
    with open(file_path, 'rb') as input_file:
        file_bytes = input_file.read()
        key_hash = md5(key.encode('ascii')).digest()

        tdes_key = DES3.adjust_key_parity(key_hash)
        cipher = DES3.new(tdes_key, DES3.MODE_EAX, nonce=b'0')
        new_file_bytes = cipher.encrypt(file_bytes)

    with open(r"C:\Users\Pintu\Downloads\mark 0.5\flask backend\Uploads\encrypted.jpg", 'wb') as output_file:
        output_file.write(new_file_bytes)
    
def decrypt_image(file_path, key):
    with open(file_path, 'rb') as input_file:
        file_bytes = input_file.read()
        key_hash = md5(key.encode('ascii')).digest()
        tdes_key = DES3.adjust_key_parity(key_hash)
        cipher = DES3.new(tdes_key, DES3.MODE_EAX, nonce=b'0')
        new_file_bytes = cipher.decrypt(file_bytes)
    
    with open(r"C:\Users\Pintu\Downloads\mark 0.5\flask backend\Uploads\decrypted.jpg", 'wb') as output_file:
        output_file.write(new_file_bytes)
        