import React, {useState, useContext} from 'react'
import GithubContext from '../../context/github/GithubContext'
import AlertContext from '../../context/alert/AlertContext'

function UserSearch() {
    const [text, setText] = useState('')

    // Github Context for state management of search form
    const {users, searchUsers, clearUsers} = useContext(GithubContext)

    // Alert Context for managing the alerts
    const {setAlert} = useContext(AlertContext)

    const handleChange = (e) => {
        setText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(text === '') {
            setAlert('Please enter a search term...', 'error')
        } else {
            searchUsers(text)
            setText('')
        }
    }

    const handleClear = () => {
        clearUsers()
    }
    // The handleClear function isn't needed because you can just call the clearUsers function directly from context in the onClick down on the button.  This way works too lol

    return (
        <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <div className="relative">
                            <input 
                                type="text" 
                                className="w-full pr-40 bg-gray-200 input input-lg text-black" 
                                placeholder='Search' 
                                value={text} 
                                onChange={handleChange} 
                            />
                            <button 
                                type='submit' 
                                className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
                            >
                                Go
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            {users.length > 0 && (
                <div>
                    <button onClick={handleClear} className="btn btn-ghost btn-lg">
                        Clear
                    </button>
                </div>
            )}
        </div>
    )
}

export default UserSearch;
