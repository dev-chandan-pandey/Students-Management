interface Props {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

const ConfirmDialog = ({ open, onClose, onConfirm }: Props) => {

  if (!open) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">

      <div className="bg-white rounded-lg p-6 w-80 shadow">

        <h2 className="text-lg font-semibold mb-4">
          Confirm Delete
        </h2>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this student?
        </p>

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  )
}

export default ConfirmDialog