import axios from 'axios';
import ReactDOM from 'react-dom'
import { useExpenseStore } from '../store'

const Delete = ({ isVisible, onCancel, id, name }) => {
const { deleteExpense } = useExpenseStore();
  if (!isVisible) return null;

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/dashboard/expense/${id}`);
      deleteExpense(id);
      console.log('Deleted data:', response.data);

      if(response.status === 200) { 
        onCancel();
      }
    }
    catch (error) {
      console.error('Error:', error);
    }
}

  const DeleteModal =  (
    <div className='fixed inset-0 bg-opacity-60 bg-gray-900 flex justify-center items-center'>
      <div className='flex flex-col bg-gray-500 w-1/3 h-48 justify-center items-center rounded-lg px-4'>
        <h1 className='text-xl text-center'>Are you sure you want to delete {name} Transaction? </h1>
        <div className='flex flex-row gap-10 mt-5'>
          <button className='bg-green-500 px-6 py-2 hover:bg-green-600' onClick={handleDelete}>Yes, I am sure!</button>
          <button className='bg-red-500 px-6 py-2 hover:bg-red-600'onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(DeleteModal, document.getElementById('delete-modal-root'));
}

export default Delete;
