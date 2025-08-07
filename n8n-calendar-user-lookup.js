// N8N Code Node: Calendar User Lookup and Formatting
// Input: Calendar data from previous node
// Output: Natural language booking options for AI agent

// Wrap everything in an async IIFE (Immediately Invoked Function Expression)
return (async () => {

// Get the calendar data from previous node
const calendarData = $input.all()[0].json;
const calendar = calendarData.calendar || calendarData;
const accessToken = $('getTokens').item.json.accountAccessToken;

// Debug logging
console.log('Calendar data received:', JSON.stringify(calendar, null, 2));
console.log('Access token available:', !!accessToken);
if (accessToken) {
  console.log('Token starts with:', accessToken.substring(0, 10) + '...');
}

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

// Function to get user information from HighLevel API
async function getUserInfo(userId) {
  try {
    const url = `https://services.leadconnectorhq.com/users/${userId}`;
    console.log(`Fetching user data for: ${userId}`);
    console.log(`URL: ${url}`);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'Version': '2021-07-28'
      }
    });
    
    console.log(`Response status for ${userId}: ${response.status}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to fetch user ${userId}: ${response.status} - ${errorText}`);
      return {
        userId: userId,
        firstName: 'Unknown',
        lastName: 'User',
        email: '',
        fullName: `Unknown User (${userId})`,
        error: `API Error: ${response.status}`
      };
    }
    
    const userData = await response.json();
    console.log(`User data received for ${userId}:`, JSON.stringify(userData, null, 2));
    
    const firstName = userData.firstName || userData.name?.split(' ')[0] || '';
    const lastName = userData.lastName || userData.name?.split(' ').slice(1).join(' ') || '';
    const fullName = userData.name || `${firstName} ${lastName}`.trim() || `User ${userId}`;
    
    return {
      userId: userData.id || userId,
      firstName: firstName,
      lastName: lastName,
      email: userData.email || '',
      fullName: fullName
    };
  } catch (error) {
    console.error(`Error fetching user ${userId}:`, error.message);
    return {
      userId: userId,
      firstName: 'Error',
      lastName: 'Loading',
      email: '',
      fullName: `Error Loading User (${userId})`,
      error: error.message
    };
  }
}

// Get team members and filter only selected ones
const teamMembers = calendar.teamMembers?.filter(member => member.selected) || [];

if (teamMembers.length === 0) {
  return [{
    json: {
      bookingOptions: "No available team members found for this calendar.",
      error: "No team members available"
    }
  }];
}

// Fetch all user information
const userPromises = teamMembers.map(member => getUserInfo(member.userId));
const users = await Promise.all(userPromises);

// Combine calendar and user data
const bookingOptions = teamMembers.map((member, index) => {
  const userInfo = users[index];
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
    priority: member.priority,
    userId: member.userId,
    userName: userInfo?.fullName || `User ${member.userId}`,
    firstName: userInfo?.firstName || '',
    lastName: userInfo?.lastName || '',
    email: userInfo?.email || '',
    location: locationDescription,
    duration: calendar.slotDuration || 30,
    durationUnit: calendar.slotDurationUnit || 'mins',
    isPrimary: member.isPrimary || false,
    meetingType: meetingType,
    rawLocation: locationConfig.location || ''
  };
});

// Sort by priority (highest first)
bookingOptions.sort((a, b) => b.priority - a.priority);

// Format for natural language output
let formattedOutput = `Calendar: ${calendar.name || 'Appointment'}\n\nBooking Options:\n\n`;

bookingOptions.forEach((option, index) => {
  formattedOutput += `Priority: ${option.priority}\n`;
  formattedOutput += `Location: ${option.location}\n`;
  formattedOutput += `User: ${option.userName}\n`;
  formattedOutput += `Length: ${option.duration} ${option.durationUnit}\n`;
  if (option.isPrimary) {
    formattedOutput += `Primary: Yes\n`;
  }
  formattedOutput += `\n`;
});

// Return structured data for the AI agent
return [{
  json: {
    calendarId: calendar.id,
    calendarName: calendar.name || 'Appointment',
    bookingOptionsText: formattedOutput,
    bookingOptions: bookingOptions,
    totalOptions: bookingOptions.length,
    summary: `Found ${bookingOptions.length} booking options with priorities ranging from ${Math.min(...bookingOptions.map(o => o.priority))} to ${Math.max(...bookingOptions.map(o => o.priority))}`
  }
}];

})(); // End of async IIFE 