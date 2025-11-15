// Mock data for the student dashboard
// In a real application, this would come from a database

// Mock student data
export const mockStudent = {
  id: 1,
  rollNo: "2024001",
  admissionNo: "ADM2024001",
  name: "John Smith",
  email: "john.smith@student.edu",
  class: "10",
  section: "A",
  phone: "+1234567895",
  address: "123 Main St, City",
  dateOfBirth: "2008-05-15",
  attendancePercentage: 85.5,
}

// Mock subjects
export const mockSubjects = [
  { id: 1, name: "Mathematics", code: "MATH101", teacher: "Dr. Sarah Johnson" },
  { id: 2, name: "Physics", code: "PHY101", teacher: "Prof. Michael Chen" },
  { id: 3, name: "English", code: "ENG101", teacher: "Ms. Emily Davis" },
  { id: 4, name: "Chemistry", code: "CHEM101", teacher: "Mr. Robert Wilson" },
  { id: 5, name: "Biology", code: "BIO101", teacher: "Mrs. Lisa Anderson" },
]

// Mock timetable
export const mockTimetable = [
  {
    id: 1,
    day: "Monday",
    period: 1,
    subject: "Mathematics",
    teacher: "Dr. Sarah Johnson",
    startTime: "09:00",
    endTime: "09:45",
  },
  {
    id: 2,
    day: "Monday",
    period: 2,
    subject: "Physics",
    teacher: "Prof. Michael Chen",
    startTime: "09:45",
    endTime: "10:30",
  },
  {
    id: 3,
    day: "Monday",
    period: 3,
    subject: "English",
    teacher: "Ms. Emily Davis",
    startTime: "10:45",
    endTime: "11:30",
  },
  {
    id: 4,
    day: "Monday",
    period: 4,
    subject: "Chemistry",
    teacher: "Mr. Robert Wilson",
    startTime: "11:30",
    endTime: "12:15",
  },
  {
    id: 5,
    day: "Monday",
    period: 5,
    subject: "Biology",
    teacher: "Mrs. Lisa Anderson",
    startTime: "13:00",
    endTime: "13:45",
  },
]

// Mock attendance records (last 5 days)
export const mockAttendance = [
  { id: 1, date: "2024-01-15", status: "present" },
  { id: 2, date: "2024-01-16", status: "present" },
  { id: 3, date: "2024-01-17", status: "absent", remarks: "Sick leave" },
  { id: 4, date: "2024-01-18", status: "present" },
  { id: 5, date: "2024-01-19", status: "present" },
]

// Mock upcoming exams
export const mockUpcomingExams = [
  {
    id: 1,
    name: "Mid-term Mathematics",
    subject: "Mathematics",
    date: "2024-01-25",
    startTime: "09:00",
    endTime: "11:00",
    totalMarks: 100,
  },
  {
    id: 2,
    name: "Physics Quiz",
    subject: "Physics",
    date: "2024-01-22",
    startTime: "10:00",
    endTime: "11:00",
    totalMarks: 50,
  },
]

// Mock exam results
export const mockExamResults = [
  {
    id: 3,
    name: "Previous Math Test",
    subject: "Mathematics",
    date: "2024-01-10",
    startTime: "09:00",
    endTime: "10:00",
    totalMarks: 100,
    marksObtained: 85,
    grade: "A",
  },
  {
    id: 4,
    name: "English Essay",
    subject: "English",
    date: "2024-01-08",
    startTime: "10:00",
    endTime: "11:00",
    totalMarks: 50,
    marksObtained: 42,
    grade: "B+",
  },
]

// Mock assignments
export const mockAssignments = [
  {
    id: 1,
    title: "Algebra Problem Set",
    subject: "Mathematics",
    dueDate: "2024-01-24",
    totalMarks: 25,
    submitted: false,
  },
  {
    id: 2,
    title: "Physics Lab Report",
    subject: "Physics",
    dueDate: "2024-01-29",
    totalMarks: 30,
    submitted: true,
    marksObtained: 28,
    feedback: "Excellent work on the analysis!",
  },
]

// Mock announcements
export const mockAnnouncements = [
  {
    id: 1,
    title: "Parent-Teacher Meeting",
    content: "PTM scheduled for next Friday at 2 PM. Please ensure your parents attend.",
    type: "event",
    priority: "high",
    date: "2024-01-20",
  },
  {
    id: 2,
    title: "Holiday Notice",
    content: "School will be closed on Monday for national holiday.",
    type: "holiday",
    priority: "normal",
    date: "2024-01-19",
  },
  {
    id: 3,
    title: "Math Olympiad Registration",
    content:
      "Registration is now open for the inter-school mathematics competition. Interested students should contact their math teacher.",
    type: "general",
    priority: "normal",
    date: "2024-01-18",
  },
]
