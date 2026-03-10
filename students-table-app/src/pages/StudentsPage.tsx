import { useState } from "react"
import { useStudents } from "../hooks/useStudents"
import StudentTable from "../components/StudentTable"
import StudentForm from "../components/StudentForm"
import { Student } from "../types/student"
import { exportStudentsToExcel } from "../utils/excelExport"
import Loader from "../components/Loader"
import ConfirmDialog from "../components/ConfirmDialog"
const StudentsPage = () => {

  const {
    students,
    loading,
    addStudent,
    updateStudent,
    deleteStudent,
  } = useStudents()

  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [search, setSearch] = useState("")
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [sortField, setSortField] = useState<"name" | "email" | "age" | "">("")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 5
  const indexOfLast = currentPage * rowsPerPage
  const indexOfFirst = indexOfLast - rowsPerPage

  const handleSort = (field: "name" | "email" | "age") => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("asc")
    }
  }

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.email.toLowerCase().includes(search.toLowerCase())
  )

  const sortedStudents = [...filteredStudents].sort((a, b) => {

    if (!sortField) return 0

    const aValue = a[sortField]
    const bValue = b[sortField]

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1

    return 0
  })
  const currentStudents = sortedStudents.slice(indexOfFirst, indexOfLast)

  const totalPages = Math.ceil(sortedStudents.length / rowsPerPage)

  const handleSubmit = (data: Omit<Student, "id">) => {

    if (editingStudent) {
      updateStudent({
        id: editingStudent.id,
        ...data,
      })

      setEditingStudent(null)
    } else {
      addStudent(data)
    }
  }

  const handleEdit = (student: Student) => {
    setEditingStudent(student)
  }

  const handleDelete = (id: number) => {
    setDeleteId(id)
  }

  const confirmDelete = () => {
    if (deleteId !== null) {
      deleteStudent(deleteId)
      setDeleteId(null)
    }
  }
  if (loading) {
    return <Loader />
  }

  return (
    <div className="max-w-4xl mx-auto p-8">

      <h1 className="text-2xl font-bold mb-6">
        Students Management
      </h1>

      <StudentForm
        onSubmit={handleSubmit}
        defaultValues={editingStudent}
      />
      <div className="flex justify-between items-center mb-4">

        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-64"
        />

        <button
          onClick={() => exportStudentsToExcel(filteredStudents)}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Download Excel
        </button>

      </div>
      <div className="flex gap-3 mb-4">

        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value as any)}
          className="border p-2 rounded"
        >
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="age">Age</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          className="border p-2 rounded"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

      </div>
      <StudentTable
        students={currentStudents}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSort={handleSort}
        sortField={sortField}
        sortOrder={sortOrder}
      />
      <div className="flex justify-center gap-3 mt-6">

        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-2">
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>

      </div>
      <ConfirmDialog
        open={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
      />

    </div>
  )
}

export default StudentsPage