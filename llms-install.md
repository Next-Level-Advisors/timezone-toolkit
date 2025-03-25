# TimezoneToolkit Installation Guide for AI Assistants

This guide provides step-by-step instructions for AI assistants like Cline to install and configure the TimezoneToolkit MCP server.

## Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- Claude Desktop (latest version)

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/Cicatriiz/timezone-toolkit.git
cd timezone-toolkit
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Build the Project

```bash
npm run build
```

### 4. Configure Claude Desktop

Add the TimezoneToolkit to Claude Desktop's configuration file. The configuration file is typically located at:

- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`
- Linux: `~/.config/Claude/claude_desktop_config.json`

If the file doesn't exist, create it with the following content:

```json
{
  "mcpServers": {
    "TimezoneToolkit": {
      "command": "node",
      "args": [
        "/ABSOLUTE/PATH/TO/timezone-toolkit/dist/index.js"
      ]
    }
  }
}
```

Replace `/ABSOLUTE/PATH/TO/` with the actual absolute path to the timezone-toolkit directory.

### 5. Restart Claude Desktop

After configuring the MCP server, restart Claude Desktop to apply the changes.

## Verification

To verify that the TimezoneToolkit is installed correctly, you can ask Claude to:

1. "What time is it now in Tokyo?"
2. "Convert 3:00 PM New York time to London time"
3. "What time is sunrise tomorrow in San Francisco?"

If Claude responds with the correct information, the TimezoneToolkit is working properly.

## Troubleshooting

If you encounter any issues during installation:

1. **Check Node.js Version**: Ensure you have Node.js 18.x or higher installed.
2. **Path Issues**: Make sure the path in the configuration file is absolute and points to the correct location.
3. **Permission Issues**: Ensure the built JavaScript files have execution permissions.
4. **Restart Required**: Sometimes a full restart of Claude Desktop is needed after configuration changes.

## Available Tools

The TimezoneToolkit provides the following tools:

1. `convert_time`: Convert times between timezones
2. `get_current_time`: Get current time in a specified timezone
3. `calculate_sunrise_sunset`: Calculate sunrise and sunset times
4. `calculate_moon_phase`: Calculate moon phase for a date
5. `calculate_timezone_difference`: Calculate time difference between timezones
6. `list_timezones`: List available IANA timezones
7. `calculate_countdown`: Calculate time remaining until a date
8. `calculate_business_days`: Calculate business days between dates
9. `format_date`: Format dates in various styles

## Support

For support or feature requests, please contact:
- Email: thedawg100@gmail.com
- GitHub Issues: https://github.com/Cicatriiz/timezone-toolkit/issues
