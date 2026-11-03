$assetDir = Join-Path (Get-Location) 'assets'
New-Item -ItemType Directory -Force -Path $assetDir | Out-Null

$items = @(
  'https://upload.wikimedia.org/wikipedia/commons/2/23/Bhil-Bhilala_tribal_women_wearing_traditional_attire_and_jewelry_at_Bhagoria_Festival_2026%2C_Ranapur_%281%29.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/e/e0/Bhil-Bhilala_tribal_women_wearing_traditional_attire_and_jewelry_at_Bhagoria_Festival_2026%2C_Ranapur_%2810%29.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/3/38/Bhil-Bhilala_tribal_women_wearing_traditional_attire_and_jewelry_at_Bhagoria_Festival_2026%2C_Ranapur_%285%29.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/8/83/Bhil-Bhilala_tribal_women_wearing_traditional_attire_and_jewelry_at_Bhagoria_Festival_2026%2C_Ranapur_%286%29.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/c/cd/Bhil-Bhilala_tribal_women_wearing_traditional_attire_and_jewelry_at_Bhagoria_Festival_2026%2C_Ranapur_%287%29.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/0/0f/Bhil-Bhilala_tribal_women_wearing_traditional_attire_and_jewelry_at_Bhagoria_Festival_2026%2C_Ranapur_%288%29.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/a/ad/Bhil-Bhilala_tribal_women_wearing_traditional_attire_and_jewelry_at_Bhagoria_Festival_2026%2C_Ranapur_%289%29.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/0/07/Bhil_community_woman_wearing_traditional_silver_hand_jewelry%2C_Jhabua%2C_Madhya_Pradesh%2C_India_%284%29.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/9/95/Eman_%28self%29_wearing_Jennah_Earrings.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/7/73/Model_wearing_Ben-Amun_jewelry_with_black_jacket.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/c/c0/Model_wearing_hammered_gold-plated_jewelry_with_white_blouse.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/e/e5/Model_wearing_necklace_Lava.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/d/d3/%22Portrait_of_a_Bora_woman%2C_with_necklaces_and_earrings.%22.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/3/38/Portrait%2C_necklace%2C_woman_Fortepan_22178.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/5/54/Young_Woman_with_a_Red_Necklace_MET_DP120418.jpg'
)

$i = 1
$ok = 0
foreach ($url in $items) {
  $dest = Join-Path $assetDir ('jewelry-model-{0:d2}.jpg' -f $i)
  try {
    Invoke-WebRequest -Uri $url -OutFile $dest -Headers @{ 'User-Agent' = 'jewelry-assets-downloader/1.0' } -MaximumRedirection 5
    $len = (Get-Item -LiteralPath $dest).Length
    if ($len -gt 10000) {
      $ok++
      Write-Output ("{0} {1} bytes" -f (Split-Path $dest -Leaf), $len)
    } else {
      Remove-Item -LiteralPath $dest -Force
      Write-Output ("FAILED {0}" -f $i)
    }
  } catch {
    Write-Output ("FAILED {0}: {1}" -f $i, $_.Exception.Message)
  }
  $i++
}
Write-Output ("Downloaded: {0}/15" -f $ok)
