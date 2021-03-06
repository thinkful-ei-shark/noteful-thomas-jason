import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'
import ApiContext from '../ApiContext'

export default class Note extends React.Component {
  static defaultProps = { onDeleteNote: () => { } }
  static contextType = ApiContext;

  handleClickDelete = event => {
    event.preventDefault()
    const noteId = this.props.id
    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(result => {
        if (!result.ok)
          return result.json().then(error => Promise.reject(error))
        return result.json()
      })
      .then(() => {
        this.props.onDeleteNote(noteId)
        this.context.deleteNote(noteId)
      })
      .catch(error => console.error({ error }))
  }
  render() {

    const { name, id, modified } = this.props

    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/note/${id}`}>
            {name}
          </Link>
        </h2>
        <button className='Note__delete' type='button' onClick={this.handleClickDelete}>

          <FontAwesomeIcon icon='trash-alt' />
          {' '}
        remove
      </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
          {' '}
            <span className='Date'>
              {format(modified, 'Do MMM YYYY')}
            </span>
          </div>
        </div>
      </div>
    )
  }
}
