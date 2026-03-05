const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Telegram credentials
const BOT_TOKEN = '8429972104:AAH1Us4l-K1JnaE-6glGmdAuU2-g160E8h4';
const CHAT_ID = '7281099411';

// Send order to Telegram
app.post('/api/send-order', async (req, res) => {
    try {
        const { ism, tel, xizmat, xabar } = req.body;

        // Validate input
        if (!ism || !tel || !xizmat) {
            return res.status(400).json({ 
                ok: false, 
                error: 'Barcha maydonlarni to\'ldiring!' 
            });
        }

        const message = `📦 YANGI BUYURTMA\n\nIsm: ${ism}\nTel: ${tel}\nXizmat: ${xizmat}\nXabar: ${xabar || '-'}`;

        const response = await axios.post(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
            {
                chat_id: CHAT_ID,
                text: message
            },
            { timeout: 10000 }
        );

        if (response.data.ok) {
            res.json({ ok: true, message: 'Buyurtma muvaffaqiyatli yuborildi!' });
        } else {
            res.status(400).json({ 
                ok: false, 
                error: response.data.description || 'Xatolik yuz berdi' 
            });
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ 
            ok: false, 
            error: 'Server xatosi. Internet aloqasini tekshiring!' 
        });
    }
});

// Serve index.html for root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server ishga tushdi: http://localhost:${PORT}`);
});
