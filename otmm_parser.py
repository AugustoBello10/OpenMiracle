import sys
import struct
import zlib
from PIL import Image

def parse_otmm(filepath, output_dir="map_images"):
    with open(filepath, 'rb') as f:
        data = f.read()

    print(f"File size: {len(data)} bytes")
    if len(data) < 4:
        print("File too small")
        return

    # Attempt to read magic and version (OTClient format usually starts with a magic or just version)
    # Let's inspect the first few bytes.
    print("First 32 bytes:", data[:32].hex())
    
    # We will build out the parser once we have the file and can see its structure.
    # Typically:
    # int32: signature/version
    # while not EOF:
    #   int8: floor
    #   int16: x, int16: y (coordinate of the 256x256 block)
    #   int32: compressed_size
    #   bytes: zlib_data
    # This is an example, we will adjust based on the actual bytes!

def read_spawns_and_filter(xml_path, otmm_path):
    pass

if __name__ == "__main__":
    if len(sys.argv) > 1:
        parse_otmm(sys.argv[1])
    else:
        print("Usage: python otmm_parser.py <file.otmm>")
