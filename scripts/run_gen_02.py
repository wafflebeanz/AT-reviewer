#!/usr/bin/env python3
import json
import os

def write_ts_chapter(filename, var_name, chapter_data):
    ts_content = f"""import {{ Chapter }} from '../../types/quiz';

export const {var_name}: Chapter = {json.dumps(chapter_data, indent=2)};
"""
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(ts_content)
    print(f"Wrote {filename}")

# --- AT-02 ---
from at02_data import chapter02
write_ts_chapter('/src/data/chapters/at02.ts', 'chapter02', chapter02)
