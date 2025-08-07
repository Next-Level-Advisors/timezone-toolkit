// N8N Code Node: Calendar Data Combiner
// Input: Combined user data and meeting options from previous nodes
// Output: Natural language booking options for AI agent

// Get the combined data from previous node
const combinedData = $input.all()[0].json;

console.log('Combined data received:', JSON.stringify(combinedData, null, 2));

const userLookup = {};
const users = combinedData.aggregate || [];
const meetingOptionsData = combinedData.meetingOptions || {};
const meetingOptions = meetingOptionsData.users || [];

// Extract calendar information from the meeting options
const calendarId = meetingOptionsData.calendarId || 'unknown-calendar';
const calendarName = meetingOptionsData.calendarName || 'Appointment Booking';

console.log('Extracted calendar info:');
console.log('Calendar ID:', calendarId);
console.log('Calendar Name:', calendarName);

// Create a lookup map for users by ID
users.forEach(user => {
  userLookup[user.id] = user;
});

console.log('User lookup created for IDs:', Object.keys(userLookup));
console.log('Meeting options count:', meetingOptions.length);

// Combine user data with meeting options
const bookingOptions = meetingOptions.map(option => {
  const user = userLookup[option.userId];
  
  if (!user) {
    console.warn(`User not found for ID: ${option.userId}`);
    return {
      priority: option.priority,
      userId: option.userId,
      userName: `User ${option.userId}`,
      firstName: 'Unknown',
      lastName: 'User',
      email: '',
      location: option.location,
      duration: option.duration,
      durationUnit: option.durationUnit,
      isPrimary: option.isPrimary,
      meetingType: option.meetingType,
      rawLocation: option.rawLocation
    };
  }

  return {
    priority: option.priority,
    userId: user.id,
    userName: user.name,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    location: option.location,
    duration: option.duration,
    durationUnit: option.durationUnit,
    isPrimary: option.isPrimary,
    meetingType: option.meetingType,
    rawLocation: option.rawLocation
  };
});

// Sort by priority (highest first)
bookingOptions.sort((a, b) => b.priority - a.priority);

// Create natural language text for AI agent
let bookingOptionsText = `Calendar: ${calendarName}\n\nBooking Options:\n\n`;

bookingOptions.forEach((option, index) => {
  bookingOptionsText += `Priority: ${option.priority}\n`;
  bookingOptionsText += `Location: ${option.location}\n`;
  bookingOptionsText += `User: ${option.userName}\n`;
  bookingOptionsText += `Length: ${option.duration} ${option.durationUnit}\n`;
  
  if (option.isPrimary) {
    bookingOptionsText += `Primary: Yes\n`;
  }
  
  // Add separator between options
  if (index < bookingOptions.length - 1) {
    bookingOptionsText += `\n`;
  }
});

// Create summary
const priorityRange = bookingOptions.length > 0 ? 
  `${Math.min(...bookingOptions.map(o => o.priority))} to ${Math.max(...bookingOptions.map(o => o.priority))}` : 
  'N/A';

const summary = `Found ${bookingOptions.length} booking options with priorities ranging from ${priorityRange}`;

console.log('Final booking options text:');
console.log(bookingOptionsText);

// Return structured data for the AI agent
return [{
  json: {
    calendarId: calendarId,
    calendarName: calendarName,
    bookingOptionsText: bookingOptionsText,
    bookingOptions: bookingOptions,
    totalOptions: bookingOptions.length,
    summary: summary,
    userCount: users.length,
    availableUsers: users.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email
    }))
  }
}]; 