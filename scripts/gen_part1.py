#!/usr/bin/env python3
import json
import os

# Helper to write TypeScript files
def write_ts_chapter(filename, var_name, chapter_data):
    ts_content = f"""import {{ Chapter }} from '../../types/quiz';

export const {var_name}: Chapter = {json.dumps(chapter_data, indent=2)};
"""
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(ts_content)
    print(f"Wrote {filename}")

if __name__ == '__main__':
    print("Script helper ready.")
