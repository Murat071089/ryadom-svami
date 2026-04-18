const DEFAULTS = {
  telegram_url: 'https://t.me/+PFfgr3RmK_dmMGRi',
  phone: '88002000122',
  hero_title: 'Я родитель самого\nпрекрасного ребёнка на свете',
  subtitle: 'Сообщество семей, которые растят уникальных детей',
  welcome_text: 'Здравствуйте! На фото — наша семья: папа Мурат, мама Дина и наши сыновья Адам и Алан (наш особенный ребенок).\nЭтот проект — часть нашей жизни и нашего пути. Пути от растерянности после слов «у вашего ребёнка аутизм» до принятия и искренней гордости за каждый его шаг.',
  img1: 'img/family1.jpg',
  img2: 'img/family2.jpg',
  img3: 'img/family3.jpg'
};

export async function onRequest(context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const content = {};
  for (const key of Object.keys(DEFAULTS)) {
    content[key] = await context.env.SITE_CONTENT.get(key) || DEFAULTS[key];
  }

  return new Response(JSON.stringify(content), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache', ...corsHeaders }
  });
}
