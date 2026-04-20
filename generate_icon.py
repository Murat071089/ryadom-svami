from PIL import Image, ImageDraw, ImageFont
import os

# Create 512x512 canvas with dark blue background
size = 512
bg_color = (19, 32, 45)  # #13202d
icon = Image.new('RGB', (size, size), bg_color)

try:
    # Try to load icon_test.png (puzzle piece)
    center_img = Image.open('img/icon_test.png').convert('RGBA')
    # Resize center img to 256x256
    center_img = center_img.resize((256, 256), Image.Resampling.LANCZOS)
    
    # Paste centered
    offset = ((size - 256) // 2, (size - 256) // 2)
    icon.paste(center_img, offset, center_img)
except Exception as e:
    print('Could not load center img:', e)
    draw = ImageDraw.Draw(icon)
    draw.ellipse([100, 100, 412, 412], fill=(208, 174, 139)) # Gold circle fallback

# Save maskable icons
icon.save('img/app_icon_512.png')
icon_192 = icon.resize((192, 192), Image.Resampling.LANCZOS)
icon_192.save('img/app_icon_192.png')
print('Icons generated successfully')