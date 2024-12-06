export function parseJwt(token: string) {
  const base64Url = token.split('.')[1]; // Payload qismni olamiz
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Base64 formatga keltiramiz
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload); // JSON formatga o'tkazamiz
}

const token =
  'eyJhbGciOiJSUzI1NiIsImtpZCI6IjI4YTQyMWNhZmJlM2RkODg5MjcxZGY5MDBmNGJiZjE2ZGI1YzI0ZDQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxMDc2MTc4NDgwMTA4LWpmNnVodGQ0bjFxdW1qb2F0dnVwYXF1MXU1ZzFyY3RxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMTA3NjE3ODQ4MDEwOC1qZjZ1aHRkNG4xcXVtam9hdHZ1cGFxdTF1NWcxcmN0cS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwOTYwODIwNzExNzM4OTE5NjA5NCIsImVtYWlsIjoiY29kZXJkaW1AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5iZiI6MTcyNzk1ODc5NywibmFtZSI6IkFiZHVsYXppeiBEaW0iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSUtVdmtDaGtpR2RDcG1vQnFhTXVsLU16a0V0Q2t1VFAyV2pNY0VibEdub19MWj1zOTYtYyIsImdpdmVuX25hbWUiOiJBYmR1bGF6aXoiLCJmYW1pbHlfbmFtZSI6IkRpbSIsImlhdCI6MTcyNzk1OTA5NywiZXhwIjoxNzI3OTYyNjk3LCJqdGkiOiJhOTcyZmQzOGViYjcyMzgxNmEwZTg1YjFiM2NlMDcyMDE2NWE0ZmJhIn0.oE41vRcL2hPUYh6IklHEasc5LyZjBQlfQYu5A4v1d4zxI4ScbJ8BqhqbCF95I9SisxVfLAfMjWdk93IlJTDwQ-lT5j1QCoeZXQXbp5q-5lmukVAe_UJVYkATtWN5lZ6a2Z7l88UOu7ZhjJvrBpRUwGhjrdUenhpG7O_An_0Yj5B7EBsoTSqy2vOpPjDq1wPVD_WRO771xGpKE_H0mNKqG3ZHjS_-ocMr1HliUEflx4-rJ9Dj1XQbdIno_ZYv5NCBGgwyFF_Ri_nrZ2r5cU6rZ4urfnsEmUl96uWVj_sREkEyt5lL6Ik2GS3W52sepIBrtdzfew4fvH_BnQ5agTiEEA';
const decodedData = parseJwt(token);
console.log(decodedData);
