import { Student } from "../types/student"

interface Props {
  students: Student[]
  onEdit: (student: Student) => void
  onDelete: (id: number) => void
  onSort: (field: "name" | "email" | "age") => void
  sortField: string
  sortOrder: "asc" | "desc"
}

const StudentTable = ({ students, onEdit, onDelete, sortField, sortOrder }: Props) => {
  const renderArrow = (field: string) => {
    if (sortField !== field) return "↕"

    return sortOrder === "asc" ? "↑" : "↓"
  }
  function onSort(arg0: string): void {
    throw new Error("Function not implemented.")
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="min-w-full">

        <thead className="bg-gray-100">

          <tr>

            <th
              onClick={() => onSort("name")}
              className="px-6 py-3 text-left text-sm font-semibold text-gray-600 cursor-pointer"
            >
              Name {renderArrow("name")}
            </th>

            <th
              onClick={() => onSort("email")}
              className="px-6 py-3 text-left text-sm font-semibold text-gray-600 cursor-pointer"
            >
              Email {renderArrow("email")}
            </th>

            <th
              onClick={() => onSort("age")}
              className="px-6 py-3 text-left text-sm font-semibold text-gray-600 cursor-pointer"
            >
              Age {renderArrow("age")}
            </th>

            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Actions
            </th>

          </tr>

        </thead>
        <tbody>

          {students.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-10 text-gray-500">
                No students found 🔍
              </td>
            </tr>
          ) : (students.map((student) => (
            <tr
              key={student.id}
              className="border-t hover:bg-blue-50 transition duration-200 cursor-pointer"
            >
              <td className="px-6 py-4">{student.name}</td>

              <td className="px-6 py-4">{student.email}</td>

              <td className="px-6 py-4">{student.age}</td>

              <td className="px-6 py-4 flex gap-3">

                <button
                  onClick={() => onEdit(student)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(student.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>

              </td>
            </tr>
          )))}

        </tbody>

      </table>
    </div>
  )
}

export default StudentTable