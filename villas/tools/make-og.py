#!/usr/bin/env python3
"""Превью для ссылок (WhatsApp, Telegram, Facebook): img/og/<id>.jpg, 1200×630.
Запуск из папки villas:  python3 tools/make-og.py   (нужен Pillow: pip install pillow)
Берёт первое фото каждой виллы из data.js; фото по прямым ссылкам пропускает."""
import json, os, re, subprocess, sys
from PIL import Image

ROOT = os.path.join(os.path.dirname(__file__), '..')
js = "global.window={};require(process.argv[1]);process.stdout.write(JSON.stringify(window.VILLAS.map(v=>[v.id,v.gallery[0]])))"
pairs = json.loads(subprocess.check_output(['node', '-e', js, os.path.join(ROOT, 'data.js')]))
out = os.path.join(ROOT, 'img', 'og'); os.makedirs(out, exist_ok=True)
made = 0
for vid, name in pairs:
    if re.match(r'https?://', name): continue
    src = os.path.join(ROOT, 'img', f'{name}-1600.webp')
    if not os.path.exists(src): print('нет фото', src, file=sys.stderr); continue
    im = Image.open(src).convert('RGB'); W, H = 1200, 630
    k = max(W / im.width, H / im.height); im = im.resize((round(im.width * k), round(im.height * k)), Image.LANCZOS)
    x, y = (im.width - W) // 2, int((im.height - H) * .55)
    im.crop((x, y, x + W, y + H)).save(os.path.join(out, f'{vid}.jpg'), quality=82, optimize=True, progressive=True)
    made += 1
print(f'Готово: {made} превью в img/og/')
