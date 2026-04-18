const ADMIN_PASSWORD = '2607';

const ADMIN_HTML = `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Админ-панель — Рядом с вами</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; background: #f0f4f8; min-height: 100vh; }
        .login-page { display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; }
        .login-card { background: white; border-radius: 20px; padding: 40px; max-width: 400px; width: 100%; box-shadow: 0 20px 60px rgba(0,0,0,0.1); }
        .logo { text-align: center; margin-bottom: 30px; }
        .logo h1 { font-size: 22px; color: #618296; font-weight: 700; }
        .logo p { color: #888; font-size: 14px; margin-top: 5px; }
        .form-group { margin-bottom: 20px; }
        label { display: block; font-size: 14px; font-weight: 600; color: #333; margin-bottom: 8px; }
        input, textarea { width: 100%; padding: 12px 16px; border: 2px solid #e5e7eb; border-radius: 10px; font-size: 15px; font-family: inherit; transition: border 0.2s; }
        input:focus, textarea:focus { outline: none; border-color: #618296; }
        textarea { min-height: 100px; resize: vertical; }
        .btn { width: 100%; padding: 14px; background: linear-gradient(135deg, #d0ae8b, #c49b74); color: white; border: none; border-radius: 10px; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.3s; font-family: inherit; }
        .btn:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(208,174,139,0.4); }
        .admin-page { max-width: 1100px; margin: 0 auto; padding: 40px 20px; }
        .admin-content { display: grid; grid-template-columns: 350px 1fr; gap: 30px; align-items: start; }
        @media (max-width: 768px) { .admin-content { grid-template-columns: 1fr; } }
        .admin-header { background: white; border-radius: 16px; padding: 24px 30px; margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
        .admin-header h1 { font-size: 20px; color: #618296; }
        .logout-btn { background: none; border: 2px solid #e5e7eb; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-size: 14px; color: #666; font-family: inherit; }
        .card { background: white; border-radius: 16px; padding: 30px; margin-bottom: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
        .card h2 { font-size: 16px; color: #333; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 2px solid #f0f4f8; }
        .success { background: #d1fae5; color: #065f46; padding: 14px 20px; border-radius: 10px; margin-bottom: 20px; font-size: 14px; font-weight: 500; text-align: center; }
        .error-msg { background: #fee2e2; color: #991b1b; padding: 14px 20px; border-radius: 10px; margin-bottom: 20px; font-size: 14px; font-weight: 500; text-align: center; }
        .hidden { display: none; }
        .photo-upload-block { margin-bottom: 20px; border: 2px dashed #e5e7eb; border-radius: 12px; padding: 16px; background: #fafafa; transition: border-color 0.2s; }
        .photo-upload-block:hover { border-color: #618296; }
        .photo-upload-block label { font-size: 13px; font-weight: 600; color: #555; margin-bottom: 10px; display: block; }
        .photo-preview { width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 10px; display: block; background: #eee; }
        .photo-preview.empty { display: none; }
        .photo-placeholder { width: 100%; height: 120px; border-radius: 8px; margin-bottom: 10px; background: #f0f4f8; display: flex; align-items: center; justify-content: center; color: #999; font-size: 13px; }
        .upload-row { display: flex; gap: 8px; align-items: center; }
        .upload-btn { flex: 1; padding: 8px 12px; background: #618296; color: white; border: none; border-radius: 8px; font-size: 13px; cursor: pointer; font-family: inherit; font-weight: 500; }
        .upload-btn:hover { background: #4e6d80; }
        .file-input { display: none; }
        .clear-btn { padding: 8px 10px; background: none; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 13px; cursor: pointer; color: #999; }
        .clear-btn:hover { border-color: #f87171; color: #f87171; }
        .upload-status { font-size: 12px; color: #888; margin-top: 6px; }
    </style>
</head>
<body>
    <div class="login-page" id="loginPage">
        <div class="login-card">
            <div class="logo">
                <h1>🔐 Рядом с вами</h1>
                <p>Панель управления сайтом</p>
            </div>
            <div id="loginError" class="error-msg hidden"></div>
            <div class="form-group">
                <label>Пароль</label>
                <input type="password" id="passwordInput" placeholder="Введите пароль..." onkeypress="if(event.key==='Enter') login()">
            </div>
            <button class="btn" onclick="login()">Войти в панель управления</button>
        </div>
    </div>

    <div class="admin-page hidden" id="adminPage">
        <div class="admin-header">
            <h1>⚙️ Управление сайтом</h1>
            <button class="logout-btn" onclick="logout()">Выйти</button>
        </div>
        <div id="saveSuccess" class="success hidden">✅ Изменения сохранены! Сайт обновлён.</div>
        <div id="saveError" class="error-msg hidden"></div>
        
        <div class="admin-content">
            <div class="sidebar-col">
                <div class="card">
                    <h2>📱 Telegram сообщество</h2>
                    <div class="form-group">
                        <label>Ссылка на Telegram</label>
                        <input type="text" id="telegram_url" placeholder="https://t.me/...">
                    </div>
                </div>
                <div class="card">
                    <h2>📞 Контакты</h2>
                    <div class="form-group">
                        <label>Телефон доверия</label>
                        <input type="text" id="phone" placeholder="88002000122">
                    </div>
                </div>
                <div class="card">
                    <h2>🖼️ Фотографии</h2>
                    <div class="photo-upload-block">
                        <label>Фотография 1</label>
                        <img id="preview1" class="photo-preview empty" src="" alt="Превью 1">
                        <div id="placeholder1" class="photo-placeholder">📷 Нет фото</div>
                        <div class="upload-row">
                            <button class="upload-btn" onclick="document.getElementById('file1').click()">📂 Выбрать файл</button>
                            <button class="clear-btn" onclick="clearPhoto(1)" title="Сбросить">✕</button>
                        </div>
                        <input type="file" id="file1" class="file-input" accept="image/*" onchange="handleFile(1, this)">
                        <div id="status1" class="upload-status"></div>
                        <input type="hidden" id="img1">
                    </div>
                    <div class="photo-upload-block">
                        <label>Фотография 2</label>
                        <img id="preview2" class="photo-preview empty" src="" alt="Превью 2">
                        <div id="placeholder2" class="photo-placeholder">📷 Нет фото</div>
                        <div class="upload-row">
                            <button class="upload-btn" onclick="document.getElementById('file2').click()">📂 Выбрать файл</button>
                            <button class="clear-btn" onclick="clearPhoto(2)" title="Сбросить">✕</button>
                        </div>
                        <input type="file" id="file2" class="file-input" accept="image/*" onchange="handleFile(2, this)">
                        <div id="status2" class="upload-status"></div>
                        <input type="hidden" id="img2">
                    </div>
                    <div class="photo-upload-block">
                        <label>Фотография 3</label>
                        <img id="preview3" class="photo-preview empty" src="" alt="Превью 3">
                        <div id="placeholder3" class="photo-placeholder">📷 Нет фото</div>
                        <div class="upload-row">
                            <button class="upload-btn" onclick="document.getElementById('file3').click()">📂 Выбрать файл</button>
                            <button class="clear-btn" onclick="clearPhoto(3)" title="Сбросить">✕</button>
                        </div>
                        <input type="file" id="file3" class="file-input" accept="image/*" onchange="handleFile(3, this)">
                        <div id="status3" class="upload-status"></div>
                        <input type="hidden" id="img3">
                    </div>
                </div>
            </div>
            <div class="main-col">
                <div class="card" style="height: 100%;">
                    <h2>✏️ Тексты на главной странице</h2>
                    <div class="form-group">
                        <label>Главный заголовок</label>
                        <textarea id="hero_title" placeholder="Я родитель самого..." rows="2"></textarea>
                    </div>
                    <div class="form-group">
                        <label>Подзаголовок сайта</label>
                        <input type="text" id="subtitle" placeholder="Сообщество семей...">
                    </div>
                    <div class="form-group">
                        <label>Текст знакомства (весь блок)</label>
                        <textarea id="welcome_text" placeholder="Здравствуйте! На фото — наша семья..." style="min-height: 250px;"></textarea>
                    </div>
                    <button class="btn" onclick="saveContent()" id="saveBtn" style="margin-top: 20px; font-size: 18px; padding: 18px;">💾 Сохранить все изменения</button>
                </div>
            </div>
        </div>
    </div>

    <script>
        let token = sessionStorage.getItem('admin_token');
        async function login() {
            const password = document.getElementById('passwordInput').value;
            if (!password) return;
            try {
                const res = await fetch('/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
                const data = await res.json();
                if (data.success) { token = data.token; sessionStorage.setItem('admin_token', token); showAdmin(); }
                else { document.getElementById('loginError').textContent = '❌ Неверный пароль'; document.getElementById('loginError').classList.remove('hidden'); }
            } catch(e) { document.getElementById('loginError').textContent = '❌ Ошибка соединения'; document.getElementById('loginError').classList.remove('hidden'); }
        }
        async function showAdmin() {
            document.getElementById('loginPage').classList.add('hidden');
            document.getElementById('adminPage').classList.remove('hidden');
            const res = await fetch('/api/content');
            const data = await res.json();
            document.getElementById('telegram_url').value = data.telegram_url || '';
            document.getElementById('phone').value = data.phone || '';
            document.getElementById('hero_title').value = data.hero_title || '';
            document.getElementById('subtitle').value = data.subtitle || '';
            document.getElementById('welcome_text').value = data.welcome_text || '';
            [1, 2, 3].forEach(i => {
                const imgVal = data['img' + i];
                document.getElementById('img' + i).value = imgVal || '';
                if (imgVal) { const preview = document.getElementById('preview' + i); preview.src = imgVal; preview.classList.remove('empty'); document.getElementById('placeholder' + i).style.display = 'none'; }
            });
        }
        async function saveContent() {
            const btn = document.getElementById('saveBtn'); btn.textContent = '⏳ Сохраняем...'; btn.disabled = true;
            const content = { telegram_url: document.getElementById('telegram_url').value, phone: document.getElementById('phone').value, hero_title: document.getElementById('hero_title').value, subtitle: document.getElementById('subtitle').value, welcome_text: document.getElementById('welcome_text').value, img1: document.getElementById('img1').value, img2: document.getElementById('img2').value, img3: document.getElementById('img3').value };
            try {
                const res = await fetch('/admin/save', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }, body: JSON.stringify(content) });
                const data = await res.json();
                if (data.success) { document.getElementById('saveSuccess').classList.remove('hidden'); document.getElementById('saveError').classList.add('hidden'); setTimeout(() => document.getElementById('saveSuccess').classList.add('hidden'), 4000); }
                else { throw new Error(data.error || 'Ошибка'); }
            } catch(e) { document.getElementById('saveError').textContent = '❌ Ошибка: ' + e.message; document.getElementById('saveError').classList.remove('hidden'); }
            finally { btn.textContent = '💾 Сохранить все изменения'; btn.disabled = false; }
        }
        function handleFile(num, input) {
            const file = input.files[0]; if (!file) return;
            if (file.size > 8 * 1024 * 1024) { document.getElementById('status' + num).textContent = '❌ Файл слишком большой (максимум 8 МБ)'; return; }
            document.getElementById('status' + num).textContent = '⏳ Загружаю...';
            const reader = new FileReader();
            reader.onload = function(e) { const base64 = e.target.result; document.getElementById('img' + num).value = base64; const preview = document.getElementById('preview' + num); preview.src = base64; preview.classList.remove('empty'); document.getElementById('placeholder' + num).style.display = 'none'; document.getElementById('status' + num).textContent = '✅ ' + file.name + ' (' + (file.size / 1024).toFixed(0) + ' КБ)'; };
            reader.readAsDataURL(file);
        }
        function clearPhoto(num) { document.getElementById('img' + num).value = ''; document.getElementById('file' + num).value = ''; const preview = document.getElementById('preview' + num); preview.src = ''; preview.classList.add('empty'); document.getElementById('placeholder' + num).style.display = 'flex'; document.getElementById('status' + num).textContent = ''; }
        function logout() { sessionStorage.removeItem('admin_token'); token = null; document.getElementById('adminPage').classList.add('hidden'); document.getElementById('loginPage').classList.remove('hidden'); document.getElementById('passwordInput').value = ''; }
        if (token) showAdmin();
    </script>
</body>
</html>`;

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const path = url.pathname;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // GET /admin → показываем HTML админки
  if (path === '/admin' || path === '/admin/') {
    return new Response(ADMIN_HTML, {
      headers: { 'Content-Type': 'text/html;charset=UTF-8' }
    });
  }

  // POST /admin/login
  if (path === '/admin/login' && context.request.method === 'POST') {
    const { password } = await context.request.json();
    if (password === ADMIN_PASSWORD) {
      const token = btoa(Date.now() + ':' + ADMIN_PASSWORD);
      return new Response(JSON.stringify({ success: true, token }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
    return new Response(JSON.stringify({ success: false }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }

  // POST /admin/save
  if (path === '/admin/save' && context.request.method === 'POST') {
    const auth = context.request.headers.get('Authorization') || '';
    const token = auth.replace('Bearer ', '');
    try {
      const decoded = atob(token);
      if (!decoded.includes(':' + ADMIN_PASSWORD)) {
        return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), {
          status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }
    } catch {
      return new Response(JSON.stringify({ success: false, error: 'Invalid token' }), {
        status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    const DEFAULTS_KEYS = ['telegram_url', 'phone', 'hero_title', 'subtitle', 'welcome_text', 'img1', 'img2', 'img3'];
    const body = await context.request.json();
    for (const key of DEFAULTS_KEYS) {
      if (body[key] !== undefined) {
        await context.env.SITE_CONTENT.put(key, body[key]);
      }
    }
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }

  return new Response('Not found', { status: 404 });
}
