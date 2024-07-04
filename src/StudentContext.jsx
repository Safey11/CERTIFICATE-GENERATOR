import React, { createContext, useState } from 'react';

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([
    {
      student_id: '12344',
      name: 'SAIF MUHAMMAD',
      course: 'Computer Science',
      batch: '2023',
      status: 'Active',
    },
    {
      student_id: '21234',
      name: 'Jim Green',
      course: 'Mathematics',
      batch: '2022',
      status: 'Active',
    },
  ]);

  const addStudent = (student) => {
    setStudents(prevStudents => [...prevStudents, student]);
  };

  const updateStudent = (updatedStudent) => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.student_id === updatedStudent.student_id ? updatedStudent : student
      )
    );
  };

  const deleteStudent = (student_id) => {
    setStudents(prevStudents => prevStudents.filter(student => student.student_id !== student_id));
  };

  return (
    <StudentContext.Provider value={{ students, addStudent, updateStudent, deleteStudent }}>
      {children}
    </StudentContext.Provider>
  );
};
