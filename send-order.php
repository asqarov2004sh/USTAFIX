<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $ism = $data['ism'] ?? '';
    $tel = $data['tel'] ?? '';
    $xizmat = $data['xizmat'] ?? '';
    $xabar = $data['xabar'] ?? '';
    
    if (!$ism || !$tel || !$xizmat) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'Barcha maydonlarni to\'ldiring!']);
        exit;
    }
    
    $BOT_TOKEN = '8429972104:AAH1Us4l-K1JnaE-6glGmdAuU2-g160E8h4';
    $CHAT_ID = '7281099411';
    
    $message = "📦 YANGI BUYURTMA\n\nIsm: $ism\nTel: $tel\nXizmat: $xizmat\nXabar: " . ($xabar ?: '-');
    
    $url = "https://api.telegram.org/bot$BOT_TOKEN/sendMessage";
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['chat_id' => $CHAT_ID, 'text' => $message]));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    $result = json_decode($response, true);
    
    if ($result['ok']) {
        echo json_encode(['ok' => true, 'message' => 'Buyurtma yuborildi!']);
    } else {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => $result['description'] ?? 'Xatolik!']);
    }
} else {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
}
?>
