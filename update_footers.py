import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html') and f != 'index.html']

new_footer = """    <footer class="footer footer-premium">
        <div class="footer-glow footer-glow-1"></div>
        <div class="footer-glow footer-glow-2"></div>
        <div class="container">
            <div class="footer-hero-block">
                <p class="footer-eyebrow">Рядом с вами · 2025</p>
                <h2 class="footer-main-title">Каждый ребёнок — целая&nbsp;вселенная</h2>
            </div>

            <div class="footer-cards-column">
                <div class="footer-compact-card">
                    <img src="img/icon_autism.png" class="footer-compact-img" alt="Разделы">
                    <div class="footer-compact-text">
                        <h4>Разделы</h4>
                        <div class="footer-compact-links">
                            <a href="index.html">Главная</a> <span class="dot-sep">·</span>
                            <a href="index.html#diagnoses">Наши дети</a> <span class="dot-sep">·</span>
                            <a href="test.html">Тест</a>
                        </div>
                    </div>
                </div>

                <div class="footer-compact-card">
                    <img src="img/icon_speech.png" class="footer-compact-img" alt="Телефон">
                    <div class="footer-compact-text">
                        <h4>Телефон доверия</h4>
                        <div class="footer-compact-links">
                            <a href="tel:88002000122" class="phone-gold">8-800-2000-122</a>
                            <span class="dot-sep">·</span> Бесплатно <span class="dot-sep">·</span> 24/7
                        </div>
                    </div>
                </div>

                <a href="https://t.me/+PFfgr3RmK_dmMGRi" class="footer-compact-card footer-compact-link">
                    <img src="img/icon_okr.png" class="footer-compact-img" alt="Telegram">
                    <div class="footer-compact-text">
                        <h4>Сообщество</h4>
                        <div class="footer-compact-links">Telegram · поддержка и общение →</div>
                    </div>
                </a>
            </div>

            <p class="footer-copy">© Рядом с вами · Информация не заменяет консультацию специалиста</p>
        </div>
    </footer>"""

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace anything from <footer to </footer> with new_footer
    pattern = re.compile(r'<footer[^>]*>.*?</footer>', re.DOTALL)
    
    # Also update CSS caching
    content = content.replace('style.css?v=2', 'style.css?v=3')
    content = content.replace('style.css', 'style.css?v=3')
    content = content.replace('style.css?v=3?v=3', 'style.css?v=3')

    new_content = pattern.sub(new_footer, content)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Updated {file}")
