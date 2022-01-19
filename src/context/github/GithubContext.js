import React, {createContext, useReducer} from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL

export const GithubProvider = ({children}) => {
    const initialState = {
        users: [],
        loading: true
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)
    
    const fetchUsers = async() => {
        const response = await fetch(`${GITHUB_URL}/users`
            // , {
            //     headers: {
            //         Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
            //     }
            // }
            // This isn't used because Github removed this token because it was saved publically to the repo.  This isn't needed it just increases the limit of requests.
        )

        const data = await response.json()

        dispatch({
            type: 'GET_USERS',
            payload: data
        })
    }

    return <GithubContext.Provider value = {{
        users: state.users,
        loading: state.loading,
        fetchUsers
    }}>
        {children}
    </GithubContext.Provider>   
}

export default GithubContext