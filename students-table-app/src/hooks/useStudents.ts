// import { useEffect, useState } from "react";
// import { Student } from "../types/student";
// import studentsData from "../data/students.json";

// const STORAGE_KEY = "students_data";

// export const useStudents = () => {
//   const [students, setStudents] = useState<Student[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   // Load students
//   useEffect(() => {
//     setLoading(true);

//     setTimeout(() => {
//       const stored = localStorage.getItem(STORAGE_KEY);

//       if (stored) {
//         setStudents(JSON.parse(stored));
//       } else {
//         setStudents(studentsData);
//         localStorage.setItem(STORAGE_KEY, JSON.stringify(studentsData));
//       }

//       setLoading(false);
//     }, 800); // simulated loading
//   }, []);

//   // Persist students
//   const saveStudents = (data: Student[]) => {
//     setStudents(data);
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
//   };

//   // Add Student
//   const addStudent = (student: Omit<Student, "id">) => {
//     const newStudent: Student = {
//       id: Date.now(),
//       ...student,
//     };

//     const updated = [...students, newStudent];
//     saveStudents(updated);
//   };

//   // Update Student
//   const updateStudent = (updatedStudent: Student) => {
//     const updated = students.map((student) =>
//       student.id === updatedStudent.id ? updatedStudent : student
//     );

//     saveStudents(updated);
//   };

//   // Delete Student
//   const deleteStudent = (id: number) => {
//     const updated = students.filter((student) => student.id !== id);
//     saveStudents(updated);
//   };

//   return {
//     students,
//     loading,
//     addStudent,
//     updateStudent,
//     deleteStudent,
//   };
// };
import { useEffect, useState } from "react"
import { Student } from "../types/student"
import API from "../utils/api"

export const useStudents = () => {

  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch students
  const fetchStudents = async () => {
    setLoading(true)

    const res = await API.get("/students")

    setStudents(res.data)

    setLoading(false)
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  // Add student
  const addStudent = async (data: Omit<Student, "id">) => {
    await API.post("/students", data)
    fetchStudents()
  }

  // Update student
  const updateStudent = async (student: Student) => {
    await API.patch(`/students/${student.id}`, student)
    fetchStudents()
  }

  // Delete student
  const deleteStudent = async (id: number) => {
    await API.delete(`/students/${id}`)
    fetchStudents()
  }

  return {
    students,
    loading,
    addStudent,
    updateStudent,
    deleteStudent,
  }
}