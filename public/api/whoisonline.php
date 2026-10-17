<?php
// PHP backend proxy for Miracle 7.4 Who is Online
// Works on any standard cPanel / Apache / Nginx PHP hosting

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$cacheFile = sys_get_temp_dir() . '/miracle_whoisonline_cache.json';
$cacheTtl = 20; // 20 seconds

if (file_exists($cacheFile) && (time() - filemtime($cacheFile) < $cacheTtl)) {
    echo file_get_contents($cacheFile);
    exit;
}

$ch = curl_init('https://miracle74.com/?subtopic=whoisonline');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$html = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if (!$html || $httpCode !== 200) {
    if (file_exists($cacheFile)) {
        echo file_get_contents($cacheFile);
        exit;
    }
    http_response_code(502);
    echo json_encode(['error' => 'Falha ao conectar com o site do Miracle']);
    exit;
}

// Parse characters
$characters = [];
$seen = [];

if (preg_match_all('/subtopic=characters&name=([^&"\'<>]+)/i', $html, $matches)) {
    foreach ($matches[1] as $rawName) {
        $name = trim(urldecode(str_replace('+', ' ', $rawName)));
        $lower = strtolower($name);
        if ($name && !isset($seen[$lower])) {
            $seen[$lower] = true;
            $characters[] = [
                'name' => $name,
                'level' => 0,
                'vocation' => 'Unknown'
            ];
        }
    }
}

$data = [
    'characters' => $characters,
    'total' => count($characters),
    'timestamp' => round(microtime(true) * 1000),
    'serverTimeBRT' => date('H:i:s')
];

$jsonData = json_encode($data);
@file_put_contents($cacheFile, $jsonData);

echo $jsonData;
