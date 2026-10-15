from flask import Flask, render_template, request, jsonify
import requests
import json
from datetime import datetime

app = Flask(__name__)

# === НАСТРОЙКИ TELEGRAM (ЗАПОЛНИ СВОИМИ ДАННЫМИ) ===
TELEGRAM_BOT_TOKEN = '8995895682:AAHlxdmCj1P3N6xq64CoS1GxsLoHHIYsCWo' 
TELEGRAM_CHAT_ID = '8202626187'
# ====================================================

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/catalog')
def catalog():
    return render_template('catalog.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contacts')
def contacts():
    return render_template('contacts.html')

@app.route('/api/order', methods=['POST'])
def order():
    data = request.json
    
    # 1. Сохраняем заявку в файл (на всякий случай)
    data['date'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    try:
        with open('orders.json', 'r', encoding='utf-8') as f:
            orders = json.load(f)
    except:
        orders = []
    orders.append(data)
    with open('orders.json', 'w', encoding='utf-8') as f:
        json.dump(orders, f, ensure_ascii=False, indent=2)
    
    # 2. Отправляем уведомление тебе в Telegram
    message = f"""
 <b>Новая заявка MDR!</b>

👤 <b>Имя:</b> {data['name']}
 <b>Email:</b> {data['email']}
📞 <b>Телефон:</b> {data.get('phone', 'не указан')}
🕐 <b>Время:</b> {data['date']}
    """
    
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    try:
        requests.post(url, json={
            'chat_id': TELEGRAM_CHAT_ID,
            'text': message,
            'parse_mode': 'HTML'
        })
    except Exception as e:
        print(f"Ошибка отправки в Telegram: {e}")
    
    # 3. Возвращаем ссылку на твой канал для перенаправления
    return jsonify({
        "status": "success", 
        "message": "Заявка принята!",
        "redirect": "https://t.me/design_wb_ozon7"
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)