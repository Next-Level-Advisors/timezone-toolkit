// N8N Code Node: Calendar Parser Only
// Input: Calendar data from previous node
// Output: Parsed calendar info with user IDs for separate lookup

// Get the calendar data from previous node
const calendarData = $input.all()[0].json;
const calendar = calendarData.calendar || calendarData;

// Debug logging
console.log('Calendar data received:', JSON.stringify(calendar, null, 2));

// Meeting type descriptions for natural language
const meetingTypeDescriptions = {
  'inbound_call': 'Phone call (they will call you)',
  'outbound_call': 'Phone call (you will call them)', 
  'zoom_conference': 'Zoom video call',
  'google_conference': 'Google Meet video call',
  'ms_teams_conference': 'Microsoft Teams video call',
  'physical': 'In-person meeting',
  'booker': 'Location to be determined',
  'custom': 'Custom meeting location'
};

// Get team members and filter only selected ones
const teamMembers = calendar.teamMembers?.filter(member => member.selected) || [];

if (teamMembers.length === 0) {
  return [{
    json: {
      error: "No available team members found for this calendar.",
      calendarId: calendar.id,
      calendarName: calendar.name,
      users: []
    }
  }];
}

// Parse calendar data without making HTTP requests
const users = teamMembers.map((member, index) => {
  const locationConfig = member.locationConfigurations?.[0] || {};
  const meetingType = locationConfig.kind || 'custom';
  
  // Handle special location cases
  let locationDescription = meetingTypeDescriptions[meetingType] || 'Meeting location';
  
  // Add specific location details if available
  if (locationConfig.location && !locationConfig.location.includes('{{')) {
    // If it's not a template variable, include the specific location
    if (meetingType === 'inbound_call' || meetingType === 'outbound_call') {
      locationDescription += ` at ${locationConfig.location}`;
    } else if (meetingType === 'physical' || meetingType === 'custom') {
      locationDescription += ` - ${locationConfig.location}`;
    }
  }
  
  return {
    userId: member.userId,
    priority: member.priority,
    isPrimary: member.isPrimary || false,
    meetingType: meetingType,
    location: locationDescription,
    rawLocation: locationConfig.location || '',
    duration: calendar.slotDuration || 30,
    durationUnit: calendar.slotDurationUnit || 'mins'
  };
});

// Sort by priority (highest first)
users.sort((a, b) => b.priority - a.priority);

console.log(`Parsed ${users.length} users from calendar`);
console.log('Users:', JSON.stringify(users, null, 2));

// Return data in the requested format
return [{
  json: {
    calendarId: calendar.id,
    calendarName: calendar.name || 'Appointment',
    totalUsers: users.length,
    users: users
  }
}]; 