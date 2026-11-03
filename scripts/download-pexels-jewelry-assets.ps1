$assetDir = Join-Path (Get-Location) 'assets'
New-Item -ItemType Directory -Force -Path $assetDir | Out-Null
$ids = @(
  '12725977','7193000','10204546','3793018','5500218','13970296','8396319','12679814',
  '29579389','30249388','23859401','12839344','12158231','1043474','1458867'
)
$ok = 0
for ($i = 0; $i -lt $ids.Count; $i++) {
  $id = $ids[$i]
  $dest = Join-Path $assetDir ('jewelry-model-{0:d2}.jpg' -f ($i + 1))
  $url = "https://images.pexels.com/photos/$id/pexels-photo-$id.jpeg?auto=compress&cs=tinysrgb&w=1600"
  try {
    Invoke-WebRequest -Uri $url -OutFile $dest -Headers @{ 'User-Agent' = 'jewelry-assets-downloader/1.0' }
    $len = (Get-Item -LiteralPath $dest).Length
    if ($len -gt 10000) { $ok++; Write-Output ("{0} {1} bytes" -f (Split-Path $dest -Leaf), $len) }
    else { Remove-Item -LiteralPath $dest -Force; Write-Output ("FAILED {0}" -f ($i + 1)) }
  } catch { Write-Output ("FAILED {0}: {1}" -f ($i + 1), $_.Exception.Message) }
}
Write-Output ("Downloaded: {0}/{1}" -f $ok, $ids.Count)
