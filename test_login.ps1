$body = '{"email":"test@test.com","password":"testpassword"}'
try {
    $response = Invoke-RestMethod -Uri 'https://aformix-ezeg.vercel.app/_/backend/api/auth/login' -Method POST -ContentType 'application/json' -Body $body
    $response | ConvertTo-Json
} catch {
    Write-Host "Status: $($_.Exception.Response.StatusCode.value__)"
    $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
    $reader.BaseStream.Position = 0
    Write-Host $reader.ReadToEnd()
}
