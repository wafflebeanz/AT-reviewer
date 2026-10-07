#!/usr/bin/env python3
import json
import os

os.makedirs('/src/data/chapters', exist_ok=True)

def write_chapter(filename, var_name, data):
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(f"import {{ Chapter }} from '../../types/quiz';\n\nexport const {var_name}: Chapter = {json.dumps(data, indent=2)};\n")
    print(f"Generated {filename} ({len(data['questions'])} questions)")

print("Ready for generation")
