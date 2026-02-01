// Netlify Function: cal-com-webhook-handler
// This function handles Cal.com webhook requests and forwards them to your localhost or production URL
// Place this file in: netlify/functions/cal-com-webhook-handler.js

exports.handler = async (event, context) => {
  // CORS headers for testing
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // GET request - Show test page
  if (event.httpMethod === 'GET') {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cal.com Webhook Test Handler</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      font-size: 28px;
      margin-bottom: 10px;
    }
    .header p {
      opacity: 0.9;
      font-size: 14px;
    }
    .content {
      padding: 30px;
    }
    .section {
      margin-bottom: 30px;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #667eea;
    }
    .section h2 {
      color: #333;
      margin-bottom: 15px;
      font-size: 20px;
    }
    .section p {
      color: #666;
      line-height: 1.6;
      margin-bottom: 10px;
    }
    .code-block {
      background: #1e1e1e;
      color: #d4d4d4;
      padding: 15px;
      border-radius: 6px;
      overflow-x: auto;
      font-family: 'Monaco', 'Courier New', monospace;
      font-size: 13px;
      margin: 10px 0;
    }
    .code-block code {
      color: #9cdcfe;
    }
    .input-group {
      margin: 15px 0;
    }
    .input-group label {
      display: block;
      margin-bottom: 8px;
      color: #333;
      font-weight: 500;
    }
    .input-group input, .input-group select {
      width: 100%;
      padding: 12px;
      border: 2px solid #e0e0e0;
      border-radius: 6px;
      font-size: 14px;
      transition: border-color 0.3s;
    }
    .input-group input:focus, .input-group select:focus {
      outline: none;
      border-color: #667eea;
    }
    .button {
      background: #667eea;
      color: white;
      padding: 12px 24px;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s;
      margin-right: 10px;
    }
    .button:hover {
      background: #5568d3;
    }
    .button-secondary {
      background: #6c757d;
    }
    .button-secondary:hover {
      background: #5a6268;
    }
    .status {
      padding: 15px;
      border-radius: 6px;
      margin: 15px 0;
      font-size: 14px;
    }
    .status.success {
      background: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }
    .status.error {
      background: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }
    .status.info {
      background: #d1ecf1;
      color: #0c5460;
      border: 1px solid #bee5eb;
    }
    .webhook-log {
      background: #1e1e1e;
      color: #d4d4d4;
      padding: 15px;
      border-radius: 6px;
      max-height: 400px;
      overflow-y: auto;
      font-family: 'Monaco', 'Courier New', monospace;
      font-size: 12px;
      margin-top: 15px;
    }
    .webhook-log .log-entry {
      margin-bottom: 10px;
      padding: 8px;
      border-left: 3px solid #667eea;
      background: #2d2d2d;
    }
    .webhook-log .timestamp {
      color: #858585;
      font-size: 11px;
    }
    .badge {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
      margin-left: 8px;
    }
    .badge.success {
      background: #28a745;
      color: white;
    }
    .badge.error {
      background: #dc3545;
      color: white;
    }
    .badge.info {
      background: #17a2b8;
      color: white;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔔 Cal.com Webhook Test Handler</h1>
      <p>Forward webhook requests to your localhost or production server</p>
    </div>
    <div class="content">
      <div class="section">
        <h2>📋 Configuration</h2>
        <div class="input-group">
          <label for="targetUrl">Target URL (Your localhost or production server)</label>
          <input 
            type="text" 
            id="targetUrl" 
            placeholder="https://your-app.vercel.app/api/webhooks/cal-com or http://localhost:3000/api/webhooks/cal-com"
            value="http://localhost:3000/api/webhooks/cal-com"
          />
          <p style="margin-top: 8px; font-size: 12px; color: #666;">
            💡 For localhost testing, use a service like <a href="https://ngrok.com" target="_blank">ngrok</a> to expose your local server
          </p>
        </div>
        <div class="input-group">
          <label for="webhookUrl">This Webhook URL (Copy this to Cal.com)</label>
          <input 
            type="text" 
            id="webhookUrl" 
            readonly
            value="${event.headers.host ? `https://${event.headers.host}${event.path}` : 'Set in Cal.com dashboard'}"
            onclick="this.select()"
          />
          <p style="margin-top: 8px; font-size: 12px; color: #666;">
            📋 Copy this URL and paste it in Cal.com → Settings → Webhooks
          </p>
        </div>
        <button class="button" onclick="testConnection()">Test Connection</button>
        <button class="button button-secondary" onclick="clearLog()">Clear Log</button>
      </div>

      <div class="section">
        <h2>📝 Webhook Log</h2>
        <div id="webhookLog" class="webhook-log">
          <div class="log-entry">
            <div class="timestamp">Waiting for webhook requests...</div>
          </div>
        </div>
      </div>

      <div class="section">
        <h2>🧪 Test Webhook</h2>
        <p>Send a test webhook request to verify the connection:</p>
        <button class="button" onclick="sendTestWebhook()">Send Test Webhook</button>
        <div id="testStatus"></div>
      </div>

      <div class="section">
        <h2>📚 Instructions</h2>
        <ol style="color: #666; line-height: 2; padding-left: 20px;">
          <li>Set your target URL above (localhost with ngrok or production URL)</li>
          <li>Copy the webhook URL and add it to Cal.com dashboard</li>
          <li>Select events: <code>BOOKING_CREATED</code>, <code>BOOKING_CANCELLED</code>, <code>BOOKING_RESCHEDULED</code></li>
          <li>Test by creating a booking in Cal.com or using the test button above</li>
          <li>Check the webhook log below to see incoming requests</li>
        </ol>
      </div>
    </div>
  </div>

  <script>
    const targetUrl = localStorage.getItem('calComTargetUrl') || 'http://localhost:3000/api/webhooks/cal-com';
    if (targetUrl) {
      document.getElementById('targetUrl').value = targetUrl;
    }

    function saveTargetUrl() {
      const url = document.getElementById('targetUrl').value;
      localStorage.setItem('calComTargetUrl', url);
    }

    document.getElementById('targetUrl').addEventListener('change', saveTargetUrl);
    document.getElementById('targetUrl').addEventListener('blur', saveTargetUrl);

    function addLogEntry(message, type = 'info') {
      const log = document.getElementById('webhookLog');
      const entry = document.createElement('div');
      entry.className = 'log-entry';
      const timestamp = new Date().toLocaleString();
      entry.innerHTML = \`
        <div class="timestamp">\${timestamp}</div>
        <div>\${message}</div>
      \`;
      log.insertBefore(entry, log.firstChild);
      
      // Keep only last 50 entries
      while (log.children.length > 50) {
        log.removeChild(log.lastChild);
      }
    }

    async function testConnection() {
      const url = document.getElementById('targetUrl').value;
      if (!url) {
        alert('Please enter a target URL');
        return;
      }

      addLogEntry(\`Testing connection to: \${url}\`, 'info');
      
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (response.ok) {
          addLogEntry(\`✅ Connection successful! Status: \${response.status}\`, 'success');
        } else {
          addLogEntry(\`⚠️ Connection failed. Status: \${response.status}\`, 'error');
        }
      } catch (error) {
        addLogEntry(\`❌ Connection error: \${error.message}\`, 'error');
      }
    }

    async function sendTestWebhook() {
      const url = document.getElementById('targetUrl').value;
      if (!url) {
        alert('Please enter a target URL');
        return;
      }

      const testPayload = {
        triggerEvent: 'BOOKING_CREATED',
        payload: {
          id: 'test-booking-' + Date.now(),
          title: 'Test Consultation',
          description: 'This is a test webhook',
          startTime: new Date().toISOString(),
          endTime: new Date(Date.now() + 3600000).toISOString(),
          attendees: [
            {
              email: 'test@example.com',
              name: 'Test Student'
            }
          ],
          organizer: {
            email: 'organizer@example.com',
            name: 'Test Organizer'
          }
        }
      };

      addLogEntry('Sending test webhook...', 'info');
      
      try {
        const response = await fetch('/.netlify/functions/cal-com-webhook-handler', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(testPayload)
        });

        const result = await response.json();
        
        if (response.ok) {
          addLogEntry(\`✅ Test webhook sent successfully!\`, 'success');
          addLogEntry(\`Response: \${JSON.stringify(result, null, 2)}\`, 'info');
        } else {
          addLogEntry(\`❌ Test webhook failed: \${result.error || 'Unknown error'}\`, 'error');
        }
      } catch (error) {
        addLogEntry(\`❌ Error sending test webhook: \${error.message}\`, 'error');
      }
    }

    function clearLog() {
      document.getElementById('webhookLog').innerHTML = '<div class="log-entry"><div class="timestamp">Log cleared</div></div>';
    }

    // Listen for webhook events (if using Server-Sent Events or polling)
    // For now, webhooks will be logged server-side
  </script>
</body>
</html>
    `;

    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Content-Type': 'text/html',
      },
      body: html,
    };
  }

  // POST request - Handle webhook from Cal.com
  if (event.httpMethod === 'POST') {
    try {
      const webhookData = JSON.parse(event.body || '{}');
      
      // Get target URL from environment variable or default
      const targetUrl = process.env.CAL_COM_TARGET_URL || 'http://localhost:3000/api/webhooks/cal-com';
      
      // Log the incoming webhook
      console.log('Received Cal.com webhook:', JSON.stringify(webhookData, null, 2));
      console.log('Forwarding to:', targetUrl);

      // Forward to target URL
      const forwardResponse = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Cal.com-Webhook-Forwarder/1.0',
        },
        body: JSON.stringify(webhookData),
      });

      const responseData = await forwardResponse.text();
      let parsedResponse;
      try {
        parsedResponse = JSON.parse(responseData);
      } catch {
        parsedResponse = { message: responseData };
      }

      // Return success to Cal.com (even if forwarding failed, to prevent retries)
      return {
        statusCode: forwardResponse.ok ? 200 : 500,
        headers,
        body: JSON.stringify({
          received: true,
          forwarded: forwardResponse.ok,
          target_url: targetUrl,
          cal_com_event: webhookData.triggerEvent || 'unknown',
          target_response: parsedResponse,
          timestamp: new Date().toISOString(),
        }),
      };
    } catch (error) {
      console.error('Error handling webhook:', error);
      
      return {
        statusCode: 200, // Return 200 to Cal.com to prevent retries
        headers,
        body: JSON.stringify({
          received: true,
          forwarded: false,
          error: error.message,
          timestamp: new Date().toISOString(),
        }),
      };
    }
  }

  // Method not allowed
  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ error: 'Method not allowed' }),
  };
};
