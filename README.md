<div align="center">
  <img src="logo.png" alt="TimezoneToolkit Logo" width="200"/>
  <h1>TimezoneToolkit MCP Server</h1>
  <p>An advanced MCP (Model Context Protocol) server providing comprehensive time and timezone tools with enhanced features beyond basic conversion.</p>
</div>

## 🌟 Features

### 🕒 Basic Timezone Conversion
- Convert times between any IANA timezone
- Get current time in any timezone
- Format time in various styles (short, medium, full)
- Calculate time differences in hours/minutes
- List available IANA timezones

### 🌅 Sunrise/Sunset and Astronomical Calculations
- Calculate sunrise and sunset times for any location
- Include twilight times (civil, nautical, astronomical)
- Calculate day length for any location/date
- Calculate moon phases for any date

### 📅 Date and Time Utilities
- Format dates in various styles (short, medium, full, ISO, relative)
- Calculate business days between dates
- Create countdown timers to future events
- Support for multiple locales and timezones

## 💻 Installation

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher
- [Claude Desktop](https://claude.ai/download) (latest version)

### Option 1: One-Click Installation (Recommended)

1. Open Claude Desktop
2. Go to Settings > MCP Servers
3. Click "Add from Marketplace"
4. Search for "TimezoneToolkit"
5. Click "Install"

### Option 2: Manual Installation

```bash
# Clone the repository
git clone https://github.com/Cicatriiz/timezone-toolkit.git
cd timezone-toolkit

# Install dependencies
npm install

# Build the project
npm run build
```

Then configure Claude Desktop to use the TimezoneToolkit server by editing the configuration file at `~/Library/Application Support/Claude/claude_desktop_config.json` (create it if it doesn't exist):

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

Replace `/ABSOLUTE/PATH/TO/` with the actual path to your project directory.

## 💬 Usage with Claude Desktop

After installation, you can use TimezoneToolkit with Claude Desktop:

1. Open Claude Desktop
2. Start a new conversation
3. Click the hammer icon to see available tools
4. Select any of the TimezoneToolkit tools

### Example Queries

- "What time is it now in Tokyo?"
- "Convert 3:00 PM New York time to London time"
- "What time is sunrise tomorrow in San Francisco?"
- "When is sunset today in Paris?"
- "What's the current moon phase?"
- "What's the time difference between New York and Tokyo?"
- "Show me a list of European timezones"
- "How many business days are there between March 1 and April 15?"
- "Format today's date in French locale"
- "How much time is left until New Year's Eve?"

## 🔧 Available Tools

### 1. convert_time

Converts a time from one timezone to another.

**Parameters:**
- `time` (optional): Time to convert (ISO string or natural language). Defaults to current time if not provided.
- `fromTimezone`: Source IANA timezone name (e.g., 'America/New_York')
- `toTimezone`: Target IANA timezone name (e.g., 'Europe/London')
- `format` (optional): Output format ('short', 'medium', 'full'). Defaults to 'medium'

**Example:**
```json
{
  "time": "2023-12-25T14:30:00",
  "fromTimezone": "America/New_York",
  "toTimezone": "Asia/Tokyo",
  "format": "full"
}
```

**Response:**
```json
{
  "originalTime": "2023-12-25T14:30:00.000-05:00",
  "convertedTime": "Tuesday, December 26, 2023, 4:30:00 AM Japan Standard Time",
  "fromTimezone": "America/New_York",
  "toTimezone": "Asia/Tokyo",
  "timeDifference": "+14 hours"
}
```

### 2. get_current_time

Gets the current time in a specified timezone.

**Parameters:**
- `timezone`: IANA timezone name (e.g., 'Asia/Tokyo')
- `format` (optional): Output format ('short', 'medium', 'full'). Defaults to 'medium'

**Example:**
```json
{
  "timezone": "Europe/London",
  "format": "full"
}
```

**Response:**
```json
{
  "currentTime": "Monday, March 25, 2025, 10:15:30 PM British Summer Time",
  "timezone": "Europe/London",
  "utcOffset": "+01:00"
}
```

### 3. calculate_sunrise_sunset

Calculates sunrise, sunset, and twilight times for a specific location and date.

**Parameters:**
- `date` (optional): Date for calculation (ISO string or natural language). Defaults to current date.
- `latitude`: Latitude of the location (-90 to 90)
- `longitude`: Longitude of the location (-180 to 180)
- `timezone` (optional): IANA timezone name (e.g., 'Europe/Paris'). Defaults to UTC.

**Example:**
```json
{
  "date": "2023-06-21",
  "latitude": 37.7749,
  "longitude": -122.4194,
  "timezone": "America/Los_Angeles"
}
```

**Response:**
```json
{
  "date": "2023-06-21",
  "sunrise": "05:48:11 AM",
  "sunset": "08:35:13 PM",
  "civilTwilight": {
    "dawn": "05:17:22 AM",
    "dusk": "09:06:02 PM"
  },
  "nauticalTwilight": {
    "dawn": "04:38:43 AM",
    "dusk": "09:44:41 PM"
  },
  "astronomicalTwilight": {
    "dawn": "03:52:50 AM",
    "dusk": "10:30:34 PM"
  },
  "dayLength": "14 hours 47 minutes",
  "timezone": "America/Los_Angeles"
}
```

### 4. calculate_moon_phase

Calculates moon phase for a specific date.

**Parameters:**
- `date` (optional): Date for calculation (ISO string or natural language). Defaults to current date.
- `timezone` (optional): IANA timezone name (e.g., 'Europe/Paris'). Defaults to UTC.

**Example:**
```json
{
  "date": "2023-01-06",
  "timezone": "UTC"
}
```

**Response:**
```json
{
  "date": "2023-01-06",
  "phase": 0.998,
  "phaseName": "Full Moon",
  "illumination": 0.997,
  "timezone": "UTC"
}
```

### 5. calculate_timezone_difference

Calculates the time difference between two timezones.

**Parameters:**
- `fromTimezone`: Source IANA timezone name (e.g., 'America/New_York')
- `toTimezone`: Target IANA timezone name (e.g., 'Europe/London')

**Example:**
```json
{
  "fromTimezone": "America/New_York",
  "toTimezone": "Asia/Tokyo"
}
```

**Response:**
```json
{
  "fromTimezone": "America/New_York",
  "toTimezone": "Asia/Tokyo",
  "timeDifference": "+14 hours",
  "currentTimeFrom": "3/25/2025, 6:15 PM",
  "currentTimeTo": "3/26/2025, 8:15 AM",
  "hoursDifference": 14,
  "minutesDifference": 0,
  "totalMinutesDifference": 840,
  "direction": "ahead"
}
```

### 6. list_timezones

Lists available IANA timezones, optionally filtered by region.

**Parameters:**
- `region` (optional): Filter timezones by region (e.g., 'America', 'Europe', 'Asia')

**Example:**
```json
{
  "region": "Europe"
}
```

**Response:**
```json
{
  "timezones": [
    {
      "timezone": "Europe/Amsterdam",
      "currentTime": "3/25/2025, 11:15 PM",
      "offset": "+02:00"
    },
    {
      "timezone": "Europe/Berlin",
      "currentTime": "3/25/2025, 11:15 PM",
      "offset": "+02:00"
    },
    // Additional European timezones...
  ],
  "count": 7,
  "region": "Europe"
}
```

### 7. calculate_countdown

Calculates time remaining until a specific date/event.

**Parameters:**
- `targetDate`: Target date/time (ISO string or natural language)
- `timezone` (optional): IANA timezone name (e.g., 'America/New_York'). Defaults to system timezone.
- `title` (optional): Title or name of the event

**Example:**
```json
{
  "targetDate": "2025-12-31T23:59:59",
  "timezone": "UTC",
  "title": "New Year's Eve"
}
```

**Response:**
```json
{
  "title": "New Year's Eve",
  "targetDate": "2025-12-31T23:59:59.000Z",
  "formattedTargetDate": "Wednesday, December 31, 2025, 11:59:59 PM GMT",
  "currentDate": "2025-03-25T18:15:30.000Z",
  "timezone": "UTC",
  "isPast": false,
  "countdown": "9 months, 6 days, 5 hours, 44 minutes, 29 seconds",
  "remaining": {
    "years": 0,
    "months": 9,
    "days": 6,
    "hours": 5,
    "minutes": 44,
    "seconds": 29,
    "totalDays": 281,
    "totalHours": 6749,
    "totalMinutes": 404969,
    "totalSeconds": 24298169
  }
}
```

### 8. calculate_business_days

Calculates business days between two dates (excluding weekends).

**Parameters:**
- `startDate`: Start date (ISO string or natural language)
- `endDate`: End date (ISO string or natural language)
- `timezone` (optional): IANA timezone name (e.g., 'America/New_York'). Defaults to system timezone.
- `excludeHolidays` (optional): Whether to exclude common holidays (US holidays only). Defaults to false.

**Example:**
```json
{
  "startDate": "2023-05-01",
  "endDate": "2023-05-31",
  "timezone": "UTC",
  "excludeHolidays": true
}
```

**Response:**
```json
{
  "startDate": "2023-05-01",
  "endDate": "2023-05-31",
  "businessDays": 22,
  "calendarDays": 31,
  "weekendDays": 8,
  "holidaysExcluded": 1,
  "timezone": "UTC",
  "businessDatesIncluded": ["2023-05-01", "2023-05-02", "2023-05-03", "2023-05-04", "2023-05-05", "2023-05-08", "2023-05-09", "2023-05-10", "2023-05-11", "2023-05-12", "2023-05-15", "2023-05-16", "2023-05-17", "2023-05-18", "2023-05-19", "2023-05-22", "2023-05-23", "2023-05-24", "2023-05-25", "2023-05-26", "2023-05-30", "2023-05-31"]
}
```

### 9. format_date

Formats a date in various styles.

**Parameters:**
- `date`: Date to format (ISO string or natural language). Defaults to current date.
- `timezone` (optional): IANA timezone name (e.g., 'America/New_York'). Defaults to system timezone.
- `format` (optional): Output format ('short', 'medium', 'full', 'iso', 'relative'). Defaults to 'medium'.
- `locale` (optional): Locale for formatting (e.g., 'en-US', 'fr', 'de'). Defaults to 'en-US'.

**Example:**
```json
{
  "date": "2023-12-25",
  "timezone": "Europe/Paris",
  "format": "full",
  "locale": "fr"
}
```

**Response:**
```json
{
  "originalDate": "2023-12-25",
  "parsedDate": "2023-12-25T00:00:00.000+01:00",
  "formattedDate": "lundi 25 décembre 2023",
  "formattedTime": "00:00:00 heure normale d'Europe centrale",
  "formattedDateTime": "lundi 25 décembre 2023 à 00:00:00 heure normale d'Europe centrale",
  "dayOfWeek": "lundi",
  "dayOfMonth": 25,
  "month": "décembre",
  "year": 2023,
  "timezone": "Europe/Paris",
  "locale": "fr",
  "format": "full"
}
```

## 💬 Example Queries in Claude Desktop

- "What time is it now in Tokyo?"
- "Convert 3:00 PM New York time to London time"
- "What time is sunrise tomorrow in San Francisco?"
- "When is sunset today in Paris?"
- "What's the current moon phase?"
- "What's the time difference between New York and Tokyo?"
- "Show me a list of European timezones"
- "How many business days are there between March 1 and April 15?"
- "Format today's date in French locale"
- "How much time is left until New Year's Eve?"

## 💻 Technical Details

### Architecture

TimezoneToolkit is built using the Model Context Protocol (MCP) specification, which allows it to integrate seamlessly with Claude Desktop. The server is implemented in TypeScript and uses the following architecture:

- **Core Services**: Implements timezone conversion, astronomical calculations, and date formatting
- **MCP Server**: Handles JSON-RPC requests from Claude Desktop
- **Utility Functions**: Provides helper functions for date/time operations

### Dependencies

- **Luxon** - For all date/time handling and timezone operations
- **SunCalc** - For sunrise/sunset and astronomical calculations
- **@modelcontextprotocol/sdk** - For MCP server implementation

### Requirements

- Node.js 18.x or higher
- npm 9.x or higher
- Claude Desktop (latest version)

## 📝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Troubleshooting

### Common Issues

1. **Tool not showing up in Claude Desktop**
   - Make sure the server is properly configured in Claude Desktop settings
   - Check that the path to the index.js file is correct
   - Restart Claude Desktop

2. **Incorrect timezone calculations**
   - Verify that you're using valid IANA timezone names (e.g., 'America/New_York', not 'EST')
   - Check for daylight saving time transitions which can affect calculations

3. **Sunrise/sunset calculations not working**
   - Ensure latitude and longitude values are valid (-90 to 90 for latitude, -180 to 180 for longitude)
   - Some extreme northern/southern locations may have periods with no sunrise/sunset

## 🔒 Privacy & Security

TimezoneToolkit processes all data locally and does not send any information to external servers. Your timezone data and queries remain private on your device.

## 📃 License

ISC

## 👨‍💻 Author

Cicatriz (thedawg100@gmail.com)

---

<div align="center">
  <p>Made with ❤️ for the Cline Marketplace</p>
</div>
