import { useState } from "react"

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [day, setDay] = useState('');
  const [reminder, setReminder] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    onAdd({ text, day, reminder });

    setText('');
    setDay('');
    setReminder(false);
  }

  return (
    <form onSubmit={onSubmit} className='add-form'>
      <div className='form-control'>
        <label>Task</label>
        <input
          type='text'
          placeholder='Do this...'
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>Day &amp; Time</label>
        <input
          type='text'
          placeholder='At this day and time...'
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <div className='form-control form-control-check'>
        <label>Set Reminder?</label>
        <input
          type='checkbox'
          checked={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>
      <input type='submit' value='Save Task' className='btn btn-block' />
    </form>
  )
}

export default AddTask
